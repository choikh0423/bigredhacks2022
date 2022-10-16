import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import TabPage from "./Tabpage";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Container from "react-bootstrap/esm/Container";

function MainTabs() {
  const [key, setKey] = useState("studio");

  return (
    <div style={{ display: "block", padding: 10 }}>
      <h3>2023-2024 Leases</h3>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="studio" title="Studio">
          <TabPage type={{ rooms: 0 }}></TabPage>
        </Tab>
        <Tab eventKey="one" title="1 Bed">
          <TabPage type={{ rooms: 1 }}></TabPage>
        </Tab>

        <Tab eventKey="two" title="2 Beds">
          <TabPage type={{ rooms: 2 }}></TabPage>
        </Tab>
        <Tab eventKey="three" title="3 Beds">
          <TabPage type={{ rooms: 3 }}></TabPage>
        </Tab>
        <Tab eventKey="four" title="4 Beds">
          <TabPage type={{ rooms: 4 }}></TabPage>
        </Tab>
        <Tab eventKey="five" title="5 or more Beds">
          <TabPage type={{ rooms: 5 }}></TabPage>
        </Tab>
      </Tabs>
    </div>
  );
}

export default MainTabs;
