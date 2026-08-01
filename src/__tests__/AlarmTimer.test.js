import React, {act} from "react";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";

import gameReducer, {
  setCurrentTeam,
  setLeftSeconds,
  setRoundDeadline,
  setTimerRunning
} from "../redux/gameSlice";
import pageReducer from "../redux/pageSlice";
import playersReducer, {addPlayers} from "../redux/playersSlice";
import statisticsReducer, {setLastClick} from "../redux/statisticsSlice";
import {Pages} from "../routes";
import AlarmTimer from "../components/game/AlarmTimer";

global.IS_REACT_ACT_ENVIRONMENT = true;

const ROUND_SECONDS = 30;
const TEAM = 'Red';

const play = jest.fn(() => Promise.resolve());
const pause = jest.fn();

beforeAll(() => {
  global.Audio = jest.fn(function () {
    this.load = jest.fn();
    this.pause = pause;
    this.play = play;
    this.currentTime = 0;
  });
});

const makeStore = () => {
  const store = configureStore({
    reducer: {
      game: gameReducer,
      page: pageReducer,
      players: playersReducer,
      statistics: statisticsReducer
    }
  });
  store.dispatch(setCurrentTeam(TEAM));
  // leftSeconds is seeded from a raw text input, so it is a string in practice.
  store.dispatch(setLeftSeconds({[TEAM]: String(ROUND_SECONDS)}));
  store.dispatch(addPlayers([{
    name: 'Alice',
    teamId: TEAM,
    gameId: store.getState().game.currentGameId,
    asker: 1
  }]));
  return store;
};

const renderAt = (deadlineOffsetMs) => {
  const store = makeStore();
  store.dispatch(setLastClick(0));
  store.dispatch(setRoundDeadline(Date.now() + deadlineOffsetMs));
  store.dispatch(setTimerRunning(true));

  const container = document.createElement('div');
  const root = createRoot(container);
  act(() => {
    root.render(
        <Provider store={store}>
          <AlarmTimer/>
        </Provider>
    );
  });
  return {store, unmount: () => act(() => root.unmount())};
};

describe('AlarmTimer', () => {

  let logged;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-08-01T12:00:00Z'));
    // One test rejects play() on purpose; the component logs that by design.
    logged = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.useRealTimers();
    logged.mockRestore();
  });

  it('should derive elapsedTime from the deadline as time passes', () => {
    const {store, unmount} = renderAt(ROUND_SECONDS * 1000);
    expect(store.getState().game.elapsedTime).toBe(0);

    act(() => {
      jest.advanceTimersByTime(5_000);
    });
    expect(store.getState().game.elapsedTime).toBe(5);

    act(() => {
      jest.advanceTimersByTime(10_000);
    });
    expect(store.getState().game.elapsedTime).toBe(15);

    expect(play).not.toHaveBeenCalled();
    unmount();
  });

  it('should not play the alarm before the deadline is reached', () => {
    const {unmount} = renderAt(ROUND_SECONDS * 1000);
    act(() => {
      jest.advanceTimersByTime(ROUND_SECONDS * 1000 - 500);
    });
    expect(play).not.toHaveBeenCalled();
    unmount();
  });

  it('should play the alarm exactly once when the deadline is reached', () => {
    const {store, unmount} = renderAt(ROUND_SECONDS * 1000);

    act(() => {
      jest.advanceTimersByTime(ROUND_SECONDS * 1000);
    });
    expect(play).toHaveBeenCalledTimes(1);
    expect(store.getState().game.elapsedTime).toBe(ROUND_SECONDS); // display at 00:00

    // Further ticks must not retrigger it.
    act(() => {
      jest.advanceTimersByTime(1_000);
    });
    expect(play).toHaveBeenCalledTimes(1);
    unmount();
  });

  it('should end the round after the alarm window and clear the deadline', () => {
    const {store, unmount} = renderAt(ROUND_SECONDS * 1000);

    act(() => {
      jest.advanceTimersByTime(ROUND_SECONDS * 1000);
    });
    expect(store.getState().page.currentPage).not.toBe(Pages.ROUND_SCORE_PAGE);

    act(() => {
      jest.advanceTimersByTime(1_500);
    });
    const state = store.getState();
    expect(pause).toHaveBeenCalled();
    expect(state.page.currentPage).toBe(Pages.ROUND_SCORE_PAGE);
    expect(state.game.timerRunning).toBe(false);
    expect(state.game.roundDeadline).toBeNull();
    expect(state.game.roundInProgress).toBe(false);
    unmount();
  });

  it('should still end the round when the alarm is blocked from playing', () => {
    play.mockImplementationOnce(() => Promise.reject(new Error('NotAllowedError')));
    const {store, unmount} = renderAt(ROUND_SECONDS * 1000);

    act(() => {
      jest.advanceTimersByTime(ROUND_SECONDS * 1000 + 1_500);
    });
    expect(store.getState().page.currentPage).toBe(Pages.ROUND_SCORE_PAGE);
    unmount();
  });

  // The reason the deadline exists: a mid-round reload restores timerRunning
  // from redux-persist, and the old code restarted a full fresh duration.
  it('should catch up immediately when mounted with a deadline already passed', () => {
    const {store, unmount} = renderAt(-5_000);

    act(() => {
      jest.advanceTimersByTime(0);
    });
    expect(play).toHaveBeenCalledTimes(1);
    expect(store.getState().game.elapsedTime).toBe(ROUND_SECONDS);
    unmount();
  });

  it('should resume mid-round rather than restarting the duration', () => {
    const {store, unmount} = renderAt(8_000); // 22s already elapsed

    act(() => {
      jest.advanceTimersByTime(0);
    });
    expect(store.getState().game.elapsedTime).toBe(ROUND_SECONDS - 8);

    act(() => {
      jest.advanceTimersByTime(8_000);
    });
    expect(play).toHaveBeenCalledTimes(1);
    unmount();
  });

  it('should stop the alarm if the round ends elsewhere mid-ring', () => {
    const {store, unmount} = renderAt(ROUND_SECONDS * 1000);

    act(() => {
      jest.advanceTimersByTime(ROUND_SECONDS * 1000);
    });
    expect(play).toHaveBeenCalledTimes(1);

    // e.g. words ran out and another component stopped the timer.
    act(() => {
      store.dispatch(setTimerRunning(false));
    });
    expect(pause).toHaveBeenCalled();
    unmount();
  });

  it('should do nothing while the timer is not running', () => {
    const store = makeStore();

    const container = document.createElement('div');
    const root = createRoot(container);
    act(() => {
      root.render(
          <Provider store={store}>
            <AlarmTimer/>
          </Provider>
      );
    });

    act(() => {
      jest.advanceTimersByTime(60_000);
    });
    expect(play).not.toHaveBeenCalled();
    expect(store.getState().game.elapsedTime).toBe(0);
    act(() => root.unmount());
  });
});
