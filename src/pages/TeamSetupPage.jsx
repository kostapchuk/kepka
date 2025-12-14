import React from "react";
import ScrollablePageWithStickyFooter
  from "../components/shared/ScrollablePageWithStickyFooter";
import TeamSetupFooter from "@/components/teamplayerssetup/TeamSetupFooter";
import TeamsAndPlayersList
  from "@/components/teamplayerssetup/TeamsAndPlayersList";
import TeamSetupHeader from "@/components/teamplayerssetup/TeamSetupHeader";

const TeamSetupPage = () => {
  return (
      <ScrollablePageWithStickyFooter footer={<TeamSetupFooter/>}>
        <TeamSetupHeader/>
        <TeamsAndPlayersList/>
      </ScrollablePageWithStickyFooter>
  );
};

export default TeamSetupPage;
