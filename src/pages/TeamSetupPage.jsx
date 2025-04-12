import React from "react";
import {useSelector, useDispatch} from "react-redux";
import ScrollablePageWithStickyFooter from "../components/ScrollablePageWithStickyFooter";
import TeamSetupContent from "../components/TeamSetupContent";
import TeamSetupFooter from "../components/TeamSetupFooter";
import {addPlayers} from "../redux/playersSlice";
import {setCurrentPage} from "../redux/pageSlice";
import {Pages} from "../routes";
import {randomIndex} from "../util/arrayUtils";
import useTeamValidation from "../hooks/useTeamValidation";
import useTranslationAndDispatch from "../hooks/useTranslationAndDispatch";

const TeamSetupPage = () => {
    const dispatch = useDispatch();
    const {currentGameId, teams} = useSelector(state => state.game);
    const {t} = useTranslationAndDispatch();
    const {teamError, playerError, commonErrors, validateAll} = useTeamValidation(teams);

    const goToNextPage = () => {
        if (!validateAll()) return;

        teams.forEach(team => {
            const askerIndex = randomIndex(team.players);
            const players = team.players.map((name, index) => ({
                name,
                asker: index === askerIndex,
                teamId: team.name,
                gameId: currentGameId,
            }));
            dispatch(addPlayers(players));
        });

        dispatch(setCurrentPage(Pages.WORDS_SETUP_PAGE));
    };

    return (
        <ScrollablePageWithStickyFooter
            footer={<TeamSetupFooter onContinue={goToNextPage} />}
        >
            <TeamSetupContent
                teamError={teamError}
                playerError={playerError}
                commonErrors={commonErrors}
            />
        </ScrollablePageWithStickyFooter>
    );
};

export default TeamSetupPage;
