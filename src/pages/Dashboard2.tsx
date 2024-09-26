// import { useState } from "react";
import React from "react";
import DashboardCard01 from "../components/DashboardCards/DashboardCard01";
import DashboardCard02 from "../components/DashboardCards/DashboardCard02";
import DashboardCard03 from "../components/DashboardCards/DashboardCard03";
import DashboardCard04 from "../components/DashboardCards/DashboardCard04";
import DashboardCard05 from "../components/DashboardCards/DashboardCard05";

function Dashboard() {

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar and Header code can be added here */}

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Content area header can be added here */}

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard actions can be added here */}

            {/* First Row */}
            <div className="grid grid-cols-12 gap-1">
              <div className="col-span-4">
                {/* DashboardCard01 */}
                <DashboardCard01 />
              </div>
              <div className="col-span-4">
                {/* DashboardCard02 */}
                <DashboardCard02 />
              </div>
              <div className="col-span-4">
                {/* DashboardCard03 */}
                <DashboardCard03 />
              </div>
            </div>

            {/* Second Row */}
            <div className="flex space-x-4">
              <div className="w-full md:w-1/2 h-1/2">
                {/* DashboardCard04 */}
                <DashboardCard04 />
              </div>
              <div className="w-full md:w-1/2 h-1/2">
                {/* DashboardCard05 */}
                <DashboardCard05 />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
