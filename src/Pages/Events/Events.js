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
// BLE control functions
import {
  sendToBleDevice,
  connectToBleDevice,
  startReadingBleDevice,
  stopReadingBleDevice,
} from "../../Components/BLE";

function Events() {
  const [dataList, setDataList] = useState();
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

  const dumyData = [
    {
      papaId: "VIKAS_DUCK",
      duckId: "MAMA0001",
      path: "MAMA0001PAPADUCK",
      payload: "food supplies need at 221B baker street",
      messageId: 0,
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

  function dataStatus() {
    // setDataList([]);
    db.allDocs({
      include_docs: true,
      descending: true,
    })
      .then(function (result) {
        let datas = result.rows;
        var dataListTemp = [];
        for (let id in datas) {
          dataListTemp.push(datas[id].doc.title);
          // console.log(datas[id].doc.title);
        }
        console.log(dataListTemp);
        setDataList(dataListTemp);
        console.log(dataList);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  db.changes({
    since: "now",
    live: true,
  }).on("change", dataStatus);

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

            <Tabs defaultActiveKey="1" size="large">
              <TabPane tab="Offline-BLE" key="1">
                <p>Connect to local pipernet gateway over Wired USB</p>
                <Button
                  type="primary"
                  icon={<ThunderboltOutlined />}
                  style={{ margin: "0px 0px 15px 0px" }}
                  onClick={connectToBleDevice}
                >
                  Connect
                </Button>
                <Button
                  style={{ margin: "0px 0px 15px 15px" }}
                  onClick={handleBLEStartStop}
                >
                  {bleButtonLabel}
                </Button>

                <Table
                  className="event-table"
                  columns={columns}
                  dataSource={dataList}
                  onChange={onChange}
                  size="default"
                  style={{
                    boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.8)",
                  }}
                  bordered={true}
                />
              </TabPane>

              <TabPane tab="Online-DB" key="2">
                <p>Fetch realtime data from hosted DB over internet</p>
                <Table
                  className="event-table"
                  columns={columns}
                  dataSource={dataList}
                  onChange={onChange}
                  size="default"
                  style={{
                    boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.8)",
                  }}
                  bordered={true}
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
