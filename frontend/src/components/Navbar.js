import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../IAlogo.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Navigation() {
  let navigate = useNavigate();

  const logoContainer = styled.div`
    display: flex;
    flex-direction: row;
  `;
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <logoContainer
          onClick={() => {
            navigate("/");
          }}
          style={{ cursor: "pointer" }}
        >
          <img src={logo} width="50" height="50" alt="logo" />
          <Navbar.Brand style={{ fontWeight: "bold", fontFamily: "Calibri" }}>
            IthacaAPTS.fyi
          </Navbar.Brand>
        </logoContainer>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavDropdown title="Room Type" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#studio">Studio</NavDropdown.Item>
              <NavDropdown.Item href="#onebed">1 Bedroom</NavDropdown.Item>
              <NavDropdown.Item href="#twobeds">2 Bedrooms</NavDropdown.Item>
              <NavDropdown.Item href="#threebeds">3 Bedrooms</NavDropdown.Item>
              <NavDropdown.Item href="#fourbeds">4 Bedrooms</NavDropdown.Item>
              <NavDropdown.Item href="#fivebeds">
                5 or more Bedrooms
              </NavDropdown.Item>
            </NavDropdown>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Collegetown"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Nav>
          <Nav.Link href="#signin">Sign In</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
