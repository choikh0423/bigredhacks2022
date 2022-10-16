import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Container } from "react-bootstrap";
import Arrow from "react-arrow";
import axios from "axios";

function AddNew() {
  const [state, setState] = useState({
    user: 0,
    apartment: 0,
    flat_type: 0,
    contract_date: "2022-10-10",
    price: 0,
    lease_type: "",
    lease_term: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.controlId]: value,
    });
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    const leaseData = {
      user_id: 9,
      apartment_id: 1,
      flat_type: 0,
      contract_date: "2022-10-10",
      price: 10000,
      lease_type: "One Year Lease",
      lease_term: "2023-2024",
    };

    console.log(leaseData);
    axios
      .post("http://127.0.0.1:8000/apartments/create_lease_data/", leaseData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log(response.status);
        console.log(response.data);
      });
  };

  return (
    <Container>
      <Col>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="apartment">
            <Form.Label>Your Apartment</Form.Label>
            <br></br>
            <Form.Select onChange={handleChange}>
              <option value="center">Collegetown Center</option>
              <option value="plaza">Collegetown Plaza</option>
              <option value="terrace">Collegetown Terrace</option>
              <option value="lux">The Lux Apartments</option>
              <option value="crossing">Collegetown Crossing</option>
              <option value="na">Doesn't see your apartment?</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="flat_type">
            <Form.Label>Number of Bedrooms</Form.Label>
            <br></br>
            <Form.Select onChange={handleChange}>
              <option value="studio">Studio</option>
              <option value="one">1 Bedroom</option>
              <option value="two">2 Bedrooms</option>
              <option value="three">3 Bedrooms</option>
              <option value="four">4 Bedrooms</option>
              <option value="five">Input manually</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="contract_date">
            <Form.Label>Contract Date</Form.Label>
            <Form.Control type="date" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="lease_type">
            <Form.Label>Lease Type</Form.Label>
            <br></br>
            <Form.Select onChange={handleChange}>
              <option value="one-year">One Year Lease</option>
              <option value="sublet">Sublet</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="lease_term">
            <Form.Label>Lease Term</Form.Label>
            <br></br>
            <Form.Select onChange={handleChange}>
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
