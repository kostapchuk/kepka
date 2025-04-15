import React from "react";
import ScrollablePageWithStickyFooter
  from "../components/ui/ScrollablePageWithStickyFooter";
import TeamSetupFooter from "../components/TeamSetupFooter";
import TeamSetupHeader from "../components/TeamSetupHeader";
import TeamsAndPlayersList from "../components/TeamsAndPlayersList";
import useTeamValidation from "../hooks/useTeamValidation";

const TeamSetupPage = () => {

  const {teamError, playerError, commonErrors, validateAll} = useTeamValidation();

  return (
      <ScrollablePageWithStickyFooter footer={<TeamSetupFooter validateAll={validateAll}/>}>
        <TeamSetupHeader/>
        <TeamsAndPlayersList
            teamError={teamError} playerError={playerError} commonErrors={commonErrors}
        />
      </ScrollablePageWithStickyFooter>
  );
};

export default TeamSetupPage;
