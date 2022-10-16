import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Container } from "react-bootstrap";

function AddNew() {
  return (
    <Container>
      <Col>
        <Form>
          <Form.Group className="mb-3" controlId="apartment">
            <Form.Label>Your Apartment</Form.Label>
            <br></br>
            <Form.Select>
              <option value="center">Collegetown Center</option>
              <option value="plaza">Collegetown Plaza</option>
              <option value="terrace">Collegetown Terrace</option>
              <option value="lux">The Lux Apartments</option>
              <option value="crossing">Collegetown Crossing</option>
              <option value="na">Doesn't see your apartment?</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="bedrooms">
            <Form.Label>Number of Bedrooms</Form.Label>
            <br></br>
            <Form.Select>
              <option value="studio">Studio</option>
              <option value="one">1 Bedroom</option>
              <option value="two">2 Bedrooms</option>
              <option value="three">3 Bedrooms</option>
              <option value="four">4 Bedrooms</option>
              <option value="five">Input manually</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="contract date">
            <Form.Label>Contract Date</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="lease type">
            <Form.Label>Lease Type</Form.Label>
            <br></br>
            <Form.Select>
              <option value="one-year">One Year Lease</option>
              <option value="sublet">Sublet</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="lease term">
            <Form.Label>Lease Term</Form.Label>
            <br></br>
            <Form.Select>
              <option value="2023-24">2023-2024</option>
              <option value="2022-23">2022-2023</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Container>
  );
}

export default AddNew;
