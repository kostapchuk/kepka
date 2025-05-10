import React from "react";
import ScrollablePageWithStickyFooter
  from "../components/shared/ScrollablePageWithStickyFooter";
import useTeamValidation from "../hooks/useTeamValidation";
import TeamSetupFooter from "@/components/teamplayerssetup/TeamSetupFooter";
import TeamsAndPlayersList
  from "@/components/teamplayerssetup/TeamsAndPlayersList";
import TeamSetupHeader from "@/components/teamplayerssetup/TeamSetupHeader";

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
