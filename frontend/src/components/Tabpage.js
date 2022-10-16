import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import AptCard from "./Aptcard";
import Button from "react-bootstrap/Button";
// import { aptData } from "../apts";
import Arrow from "react-arrow";
import axios from "axios";

function TabPage(props) {
  const [sorting, setSorting] = useState(true);
  const [aptData, setAptData] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/apartments/get_apartment_info/`
    );
    setAptData(data.info);
  };
  useEffect(() => {
    getData();
  }, []);

  function sort(a, b) {
    if (sorting) return a - b;
    else return b - a;
  }
  const apts = aptData.filter(
    (obj) =>
      obj.rooms === props.type.rooms ||
      (obj.rooms > 4 && props.type.rooms === 5)
  );
  apts.sort(function (a, b) {
    return sort(a.price, b.price);
  });
  return (
    <Container>
      <Row style={{ marginLeft: 0, marginRight: 0, marginBottom: 5 }}>
        {/* <div style={{ textAlign: "right" }}>Maximum Price</div>
        <div style={{ textAlign: "right" }}>
          <form class="multi-range-field">
            <input id="multi6" class="multi-range" type="range" />
          </form>
        </div> */}
        <div style={{ textAlign: "right" }}>
          Price <t />
          <Arrow
            direction={sorting ? "up" : "down"}
            shaftWidth={10}
            shaftLength={12}
            headWidth={20}
            headLength={13}
            fill="gray"
            strokeWidth={2}
            onClick={() => setSorting(!sorting)}
          />
        </div>
      </Row>
      <Col>
        {Object.values(apts).map((apt, index) => (
          <div>
            <AptCard apt={{ apt }}></AptCard>
            <br></br>
          </div>
        ))}
      </Col>
    </Container>
  );
}

export default TabPage;
