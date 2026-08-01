import React, {act} from "react";
import {createRoot} from "react-dom/client";

import useScrollToTop from "../hooks/useScrollToTop";

global.IS_REACT_ACT_ENVIRONMENT = true;

const Host = ({page}) => {
  useScrollToTop(page);
  return <div>{page}</div>;
};

describe('useScrollToTop', () => {

  let scrollTo;
  let root;

  beforeEach(() => {
    scrollTo = jest.fn();
    window.scrollTo = scrollTo;
    root = createRoot(document.createElement('div'));
  });

  afterEach(() => {
    act(() => root.unmount());
  });

  const render = (page) => act(() => root.render(<Host page={page}/>));

  it('should scroll to the top on mount', () => {
    render('TEAM_SETUP_PAGE');
    expect(scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('should scroll to the top every time the page changes', () => {
    render('TEAM_SETUP_PAGE');
    scrollTo.mockClear();

    render('WORDS_SETUP_PAGE');
    expect(scrollTo).toHaveBeenCalledTimes(1);

    render('ROUND_SCORE_PAGE');
    expect(scrollTo).toHaveBeenCalledTimes(2);
    expect(scrollTo).toHaveBeenLastCalledWith(0, 0);
  });

  it('should not scroll when re-rendering the same page', () => {
    render('GAME_PAGE');
    scrollTo.mockClear();

    render('GAME_PAGE');
    render('GAME_PAGE');

    expect(scrollTo).not.toHaveBeenCalled();
  });
});
