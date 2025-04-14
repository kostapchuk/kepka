import React from "react";
import ScrollablePageWithStickyFooter
  from "../components/ScrollablePageWithStickyFooter";
import TeamSetupFooter from "../components/TeamSetupFooter";
import TeamSetupHeader from "../components/TeamSetupHeader";
import TeamsAndPlayersList from "../components/TeamsAndPlayersList";

const TeamSetupPage = () => (
    <ScrollablePageWithStickyFooter footer={<TeamSetupFooter/>}>
      <TeamSetupHeader/>
      <TeamsAndPlayersList/>
    </ScrollablePageWithStickyFooter>
);

export default TeamSetupPage;
