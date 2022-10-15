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
  const [ascending, setAscending] = useState(true);

  return (
    <div style={{ display: "block", padding: 10 }}>
      <label for="customRange2" class="form-label">
        Price Range
      </label>
      <form class="multi-range-field">
        <input id="multi6" class="multi-range" type="range" />
      </form>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="studio" title="Studio">
          <Container>
            <Row>
              <Col style={{ textAlign: "right" }}>
                <Button onClick={() => setAscending(!ascending)}>Sort</Button>
              </Col>
            </Row>
          </Container>{" "}
          <TabPage type={{ sorting: ascending, rooms: 0 }}></TabPage>
        </Tab>
        <Tab eventKey="one" title="1 Bed">
          <Container>
            <Row>
              <Col style={{ textAlign: "right" }}>
                <Button onClick={() => setAscending(!ascending)}>Sort</Button>
              </Col>
            </Row>
          </Container>{" "}
          <TabPage type={{ sorting: ascending, rooms: 1 }}></TabPage>
        </Tab>

        <Tab eventKey="two" title="2 Bed">
          <Container>
            <Row>
              <Col style={{ textAlign: "right" }}>
                <Button onClick={() => setAscending(!ascending)}>Sort</Button>
              </Col>
            </Row>
          </Container>{" "}
          <TabPage type={{ sorting: ascending, rooms: 2 }}></TabPage>
        </Tab>
        <Tab eventKey="three" title="3 Beds">
          <Container>
            <Row>
              <Col style={{ textAlign: "right" }}>
                <Button onClick={() => setAscending(!ascending)}>Sort</Button>
              </Col>
            </Row>
          </Container>{" "}
          <TabPage type={{ sorting: ascending, rooms: 3 }}></TabPage>
        </Tab>
        <Tab eventKey="four" title="4 Beds">
          <Container>
            <Row>
              <Col style={{ textAlign: "right" }}>
                <Button onClick={() => setAscending(!ascending)}>Sort</Button>
              </Col>
            </Row>
          </Container>{" "}
          <TabPage type={{ sorting: ascending, rooms: 4 }}></TabPage>
        </Tab>
        <Tab eventKey="five" title="5 or more Beds">
          <Container>
            <Row>
              <Col style={{ textAlign: "right" }}>
                <Button onClick={() => setAscending(!ascending)}>Sort</Button>
              </Col>
            </Row>
          </Container>{" "}
          <TabPage type={{ sorting: ascending, rooms: 5 }}></TabPage>
        </Tab>
      </Tabs>
    </div>
  );
}

export default MainTabs;