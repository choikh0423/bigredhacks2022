import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

function AptCard(props) {
  console.log(props);
  const aptName = props.apt.apt.aptName;
  const address = props.apt.apt.address;
  const price = props.apt.apt.price;
  const roomType =
    props.apt.apt.rooms === 0
      ? "Studio"
      : props.apt.apt.rooms === 1
      ? "1 Bed"
      : props.apt.apt.rooms + " Beds";
  return (
    <Card style={{ textAlign: "left" }}>
      <Card.Header as="h5">{address}</Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <Card.Title as="h4">{aptName}</Card.Title>
          </Col>
          <Col style={{ textAlign: "right" }}>
            <Col>{roomType}</Col>
            <Col>
              <Card.Title as="h4">{"$" + price + "/month"}</Card.Title>
            </Col>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default AptCard;
