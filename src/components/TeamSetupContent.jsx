import React from "react";
import TeamSetupHeader from "./TeamSetupHeader";
import TeamsAndPlayersList from "./TeamsAndPlayersList";

const TeamSetupContent = ({teamError, playerError, commonErrors}) => (
    <>
      <TeamSetupHeader />
      <TeamsAndPlayersList
          teamError={teamError}
          playerError={playerError}
          commonErrors={commonErrors}
      />
    </>
);

export default TeamSetupContent;
