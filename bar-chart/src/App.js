import React, { useState } from "react";
import ChartWrapper from "./ChartWrapper";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import GenderDropdown from "./GenderDropdown";

function App() {
  const [gender, setGender] = useState("men");

  const genderSelected = (gender) => {
    setGender(gender);
  };

  return (
    <div className="App">
      <Navbar bg="light">
        <Navbar.Brand>Barchartly</Navbar.Brand>
      </Navbar>
      <Container>
        <Row>
          <Col xs={12}>
            <Dropdown>
              <GenderDropdown genderSelected={genderSelected} />
            </Dropdown>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <ChartWrapper gender={gender} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
