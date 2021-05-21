/**
 * This is the side navigation bar used in
 *  pages like overview, devices, producst etc
 * for navigating between root pages of console
 */

import React, { useState, useEffect } from "react";
import "./Sidenav.css";
import { Link, useLocation, useHistory } from "react-router-dom";
import { Tool, Users, BarChart2, MapPin, GitHub } from "react-feather";
import Logo from "../../img/pipernet-logo.svg";
import { Menu, Dropdown, Divider, Button } from "antd";

function Sidenav() {
  let location = useLocation();
  let history = useHistory();

  const centerStyle = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  };

  //svg icon color state
  const [icon1Color, setIcon1Color] = useState("#93AAC4");
  const [icon2Color, setIcon2Color] = useState("#93AAC4");
  const [icon3Color, setIcon3Color] = useState("#93AAC4");
  const [icon4Color, setIcon4Color] = useState("#93AAC4");
  const [icon5Color, setIcon5Color] = useState("#93AAC4");
  const [icon6Color, setIcon6Color] = useState("#93AAC4");

  // sideanve navlink background color state
  const [icon1BgColor, setIcon1CBgolor] = useState("none");
  const [icon2BgColor, setIcon2CBgolor] = useState("none");
  const [icon3BgColor, setIcon3CBgolor] = useState("none");
  const [icon4BgColor, setIcon4CBgolor] = useState("none");
  const [icon5BgColor, setIcon5CBgolor] = useState("none");
  const [icon6BgColor, setIcon6CBgolor] = useState("none");

  // Executes each time new page loads,
  //finds current route and based on that sets iconColor variable value
  useEffect(() => {
    /*
    var currentRoute = location.pathname;
    console.log(currentRoute);
    */

    switch (location.pathname) {
      case "/":
        history.push("/events");
        break;

      case "/events":
        setIcon1Color("#C9D0D8");
        setIcon1CBgolor("#1b1620");
        break;

      case "/users":
        setIcon2Color("#C9D0D8");
        setIcon2CBgolor("#1b1620");

        break;
      case "/evenhsts":
        setIcon3Color("#C9D0D8");
        setIcon3CBgolor("#1b1620");

        break;
      case "/insights":
        setIcon4Color("#C9D0D8");
        setIcon4CBgolor("#1b1620");

        break;
      case "/testing":
        setIcon5Color("#C9D0D8");
        setIcon5CBgolor("#1b1620");

        break;
      case "/settings":
        setIcon6Color("#C9D0D8");
        setIcon6CBgolor("#5725FF");

        break;
      default:
        setIcon1Color("#5D7290");
        setIcon2Color("#5D7290");
        setIcon3Color("#5D7290");
        setIcon4Color("#5D7290");
        setIcon5Color("#5D7290");
        setIcon6Color("#5D7290");

        setIcon1CBgolor("#none");
        setIcon2CBgolor("#none");
        setIcon3CBgolor("#none");
        setIcon4CBgolor("#none");
        setIcon5CBgolor("#none");
        setIcon6CBgolor("#none");

        break;
    }
  }, [location.pathname]);

  return (
    <div className="sidebar-container">
      <div className="logo-container">
        <img id="fusion-logo" src={Logo} alt="" />
      </div>

      <div className="sidebar-option-container">
        <Link to="/events" className="router-link">
          <div
            className="nav-link"
            style={{ backgroundColor: `${icon1BgColor}` }}
          >
            <BarChart2 size="26px" color={icon1Color} />
            <h1 style={{ color: `${icon1Color}` }}>Events</h1>
          </div>
        </Link>

        <Link to="/maps" className="router-link">
          <div
            className="nav-link"
            style={{ backgroundColor: `${icon2BgColor}` }}
          >
            <MapPin size="26px" color={icon2Color} />
            <h1 style={{ color: `${icon2Color}` }}>Maps</h1>
          </div>
        </Link>

        <Link to="/users" className="router-link">
          <div
            className="nav-link"
            style={{ backgroundColor: `${icon3BgColor}` }}
          >
            <Users size="26px" color={icon3Color} />
            <h1 style={{ color: `${icon3Color}` }}>Users</h1>
          </div>
        </Link>
        <Link to="/tool" className="router-link">
          <div
            className="nav-link"
            style={{ backgroundColor: `${icon4BgColor}` }}
          >
            <Tool size="26px" color={icon4Color} />
            <h1 style={{ color: `${icon4Color}` }}>Tools</h1>
          </div>
        </Link>
      </div>
      <a href="github.com/singh-vikas-m" id="github">
        <GitHub size="26px" color={icon4Color} />
      </a>
    </div>
  );
}

export default Sidenav;
