import React, { useEffect, useState } from "react";
import "./MessageList.css";
import Message from "../Message/Message.js";
import db, { showPayload } from "../db.js";
import { List, AutoSizer } from "react-virtualized";
import { Button, Input } from "antd";
import { ThunderboltOutlined } from "@ant-design/icons";

// BLE control functions
import {
  sendToBleDevice,
  connectToBleDevice,
  startReadingBleDevice,
  stopReadingBleDevice,
} from "../BLE";

export default function MessageList() {
  const [dataList, setDataList] = useState([]);
  const [inputData, setInputData] = useState("");
  const [count, setCount] = useState(0);
  const [newDataAvailable, , setNewDataAvailable] = useState(false);

  let dataAvailable = false;

  // clears all message renders
  const clearMessages = () => {
    setDataList([]);
    setCount(0);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form sending
    sendToBleDevice(inputData);
    event.target.value = "";
  };

  const handleInputChnage = (event) => {
    event.preventDefault(); // Prevent form sending
    setInputData(event.target.value);
  };

  /** 
  useEffect(() => {
    setDataList([]);
    db.allDocs({
      include_docs: true,
      descending: true,
    })
      .then(function (result) {
        let datas = result.rows;
        const dataList = [];
        for (let id in datas) {
          dataList.push(datas[id].docj);
        }
        console.log(dataList);
        setDataList(dataList);
        setCount(dataList.length);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  */

  function dataStatus() {
    // setDataList([]);
    db.allDocs({
      include_docs: true,
      descending: true,
    })
      .then(function (result) {
        let datas = result.rows;
        const dataList = [];
        for (let id in datas) {
          dataList.push(datas[id].doc);
        }
        console.log(dataList);
        setDataList(dataList);
        setCount(dataList.length);
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
    <div
      className="MessageList"
      style={{
        boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.8)",
      }}
    >
      <div className="label-section">
        <div className="label-row-1">
          <div className="controls">
            <Button
              type="primary"
              icon={<ThunderboltOutlined />}
              style={{ margin: "15px 0px 15px 0px" }}
              onClick={connectToBleDevice}
            >
              Connect
            </Button>
            <Button
              style={{ margin: "15px 0px 15px 15px" }}
              onClick={startReadingBleDevice}
            >
              Start
            </Button>
            <Button
              style={{ margin: "15px 0px 15px 15px" }}
              onClick={stopReadingBleDevice}
            >
              Stop
            </Button>
            <form
              id="send-data-form"
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                margin: "15px 0px 15px 15px",
              }}
              onSubmit={handleSubmit}
            >
              <Input
                placeholder="Send to network"
                onChange={handleInputChnage}
              />
              <Button
                type="submit"
                style={{ margin: "15px 0px 15px 15px" }}
                onClick={stopReadingBleDevice}
              >
                Send
              </Button>
            </form>
          </div>
        </div>
        <div className="label-row-2">
          <div id="label-row-2-item-1">Data {count}</div>
        </div>
      </div>

      <div
        className="scrollable-section"
        style={{ width: "100%", height: "78%" }}
      >
        {/**React Virtualisation is used to render all messages */}
        <AutoSizer>
          {({ width, height }) => (
            <List
              width={width}
              height={height}
              rowHeight={50}
              rowCount={dataList.length}
              rowRenderer={({ key, index, style, parent }) => {
                const data = dataList[index];
                return (
                  <div key={key} style={style}>
                    <Message data={data} />
                  </div>
                );
              }}
            />
          )}
        </AutoSizer>

        {/**Messages Lists Mapping goes here, Note Use this method if not using React Virtualised */}
        {/**
          {dataList
          ? dataList.map((data, index) => <Message data={data} key={index} />)
          : ""}
         */}
      </div>
    </div>
  );
}
