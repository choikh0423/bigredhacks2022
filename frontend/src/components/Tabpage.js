import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import AptCard from "./Aptcard";
import { aptData } from "../apts";

function TabPage(props) {
  function sort(a, b) {
    if (props.type.sorting) return a - b;
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
