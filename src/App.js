import "./App.css";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import credit_card_image from "./assets/images/credit_card_image.jpeg";

function App() {
  const [cardNumber, setCardNumber] = useState("");
  const [showError, setShowError] = useState(false);
  const [showValidated, setShowValidated] = useState(false);

  function validateCreditCard(value) {
    let nDigits = value.length;

    let nSum = 0;
    let isSecond = false;
    for (let i = nDigits - 1; i >= 0; i--) {
      let d = value[i].charCodeAt() - "0".charCodeAt();

      if (isSecond === true) d = d * 2;

      // We add two digits to handle
      // cases that make two digits
      // after doubling
      nSum += parseInt(d / 10, 10);
      nSum += d % 10;

      isSecond = !isSecond;
    }
    return nSum % 10 === 0;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (validateCreditCard(form.elements.credit_card_number.value)) {
      setShowError(false);
      setShowValidated(true);
    } else {
      setShowError(true);
      setShowValidated(false);
    }
  };

  return (
    <Container className="pt-5">
      <Row>
        <Col></Col>
        <Col>
          <div className="CardWrapper">
            <Image src={credit_card_image} fluid />
            <span>{cardNumber}</span>
          </div>
          <Form className="mt-5" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Credit Card Number</Form.Label>
              <Form.Control
                value={cardNumber}
                type="number"
                placeholder="Enter Credit Card Number"
                name="credit_card_number"
                onChange={(e) => {
                  setCardNumber(e.target.value);
                  setShowError(false);
                }}
              />
              {showError && (
                <span className="text-danger d-block mt-2">
                  Invalid card number
                </span>
              ) || showValidated && (
                <span className="text-success d-block mt-2">
                  Great Job! Card is Validated
                </span>
              ) || (
              <Form.Text className="text-muted">
                Enter your Credit Card number to validate.
              </Form.Text>
              )}
            </Form.Group>
            <Button type="submit">Submit form</Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default App;
