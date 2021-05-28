/**
 * This the root Overview page of console.
 * Show basic welcome message and some UI
 */

import React, { useState, useContext, useEffect } from "react";
import "./Events.css";
import Sidenav from "../../Components/Sidenav/Sidenav.js";
import { Table, Tabs, Button } from "antd";
import { ThunderboltOutlined } from "@ant-design/icons";
import db, { showPayload } from "../../Components/db";
import MessageList from "../../Components/MessageList/MessageList.js";
// BLE control functions
import {
  sendToBleDevice,
  connectToBleDevice,
  startReadingBleDevice,
  stopReadingBleDevice,
} from "../../Components/BLE";

function Events() {
  const [bleButtonLabel, setBleButtonLabel] = useState("Start");

  const { TabPane } = Tabs;

  const columns = [
    {
      title: "Gateway",
      dataIndex: "papaId",
      key: "papaId",
    },
    {
      title: "Hotsopt",
      dataIndex: "duckId",
      key: "duckId",
    },
    {
      title: "Path",
      dataIndex: "path",
      key: "path",
    },

    {
      title: "Payload",
      dataIndex: "payload",
      key: "payload",
    },
    {
      title: "Message ID",
      dataIndex: "messageId",
      key: "messageId",
    },
  ];

  const dumyData = [];

  const dumyData2 = [
    {
      papaId: "VIKAS_DUCK",
      duckId: "MAMA0001",
      path: "MAMA0001PAPADUCK",
      payload: "food supplies need at 221B baker street",
      messageId: 0,
    },
    {
      papaId: "VIKAS_DUCK",
      duckId: "MAMA0001",
      path: "MAMA0001PAPADUCK",
      payload: "food supplies need at 221B baker street",
      messageId: 1,
    },
    {
      papaId: "VIKAS_DUCK",
      duckId: "MAMA0001",
      path: "MAMA0001PAPADUCK",
      payload: "food supplies need at 221B baker street",
      messageId: 2,
    },
    {
      papaId: "VIKAS_DUCK",
      duckId: "MAMA0001",
      path: "MAMA0001PAPADUCK",
      payload: "food supplies need at 221B baker street",
      messageId: 3,
    },
  ];

  const handleBLEStartStop = () => {
    if (bleButtonLabel === "Start") {
      setBleButtonLabel("Stop");
      startReadingBleDevice();
    } else {
      setBleButtonLabel("Start");
      stopReadingBleDevice();
    }
  };

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  useEffect(() => {}, []);

  return (
    <div className="Events">
      <div className="main-container">
        <Sidenav />
        <div className="content-container">
          <div className="content">
            <h1 className="header-h1">Events</h1>
            <p className="header-p">
              See events being sent to this project in near real time.
            </p>
            <MessageList />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Events;
