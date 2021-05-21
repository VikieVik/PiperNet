/**
 * This the root Overview page of console.
 * Show basic welcome message and some UI
 */

import React, { useState, useContext, useEffect } from "react";
import "./Events.css";
import Sidenav from "../../Components/Sidenav/Sidenav.js";
import { Table, Tabs } from "antd";

function Events() {
  const [eventCount, setEventCount] = useState(0);
  const [eventList, setEventList] = useState();

  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

  const columns = [
    {
      title: "Event",
      dataIndex: "event",
    },
    {
      title: "User",
      dataIndex: "userid",
    },
    {
      title: "Data",
      dataIndex: "properties",
    },
    {
      title: "Time",
      dataIndex: "timestamp",
    },
  ];

  useEffect(() => {}, []);

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <div className="Events">
      <div className="main-container">
        <Sidenav />
        <div className="content-container">
          <div className="content">
            <div className="header">
              <h1>Events</h1>
              <p>See events being sent to this project in near real time.</p>
            </div>

            <Tabs defaultActiveKey="1" onChange={callback} size="large">
              <TabPane tab="Online-DB" key="1">
                <p>Fetch realtime data from hosted DB over internet</p>
                <Table
                  className="event-table"
                  columns={columns}
                  dataSource={eventList}
                  onChange={onChange}
                  size="default"
                />
              </TabPane>
              <TabPane tab="Offline-BLE" key="2">
                <p>Connect to local pipernet gateway over BLE</p>
                <Table
                  className="event-table"
                  columns={columns}
                  dataSource={eventList}
                  onChange={onChange}
                  size="default"
                />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Events;
