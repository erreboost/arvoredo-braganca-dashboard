import React from "react";
import { VisibleExtentProvider } from "../utils/VisibleExtentContext";
import DashboardCard01 from "../components/DashboardCards/DashboardCard01";
import DashboardCard02 from "../components/DashboardCards/DashboardCard02";
import DashboardCard03 from "../components/DashboardCards/DashboardCard03";
import DashboardCard04 from "../components/DashboardCards/DashboardCard04";
import DashboardCard05 from "../components/DashboardCards/DashboardCard05";

function Dashboard() {
  return (
    <VisibleExtentProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        <div className="flex-1">
          <main className="p-4 space-y-4">
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
              <div className="flex-1 min-w-0 max-h-full">
                <DashboardCard01 />
              </div>
              <div className="flex-1 min-w-0">
                <DashboardCard02 />
              </div>
              <div className="flex-1 min-w-0">
                <DashboardCard03 />
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex-1 min-w-0">
                <DashboardCard04 />
              </div>
              <div className="flex-1 min-w-0">
                <DashboardCard05 />
              </div>
            </div>
          </main>
        </div>
      </div>
    </VisibleExtentProvider>
  );
}

export default Dashboard;
