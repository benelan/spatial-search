import React from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";

const About = (props) => {
  return (
    <Form>
      <Row>
        <Col md={{ size: 5, offset: 1 }}>
          <p>
            <b>This is an example contact form.</b>
          </p>
        </Col>
      </Row>
      <Row form>
        <Col md={{ size: 5, offset: 1 }}>
          <FormGroup>
            <Label for="exampleName">Name</Label>
            <Input type="text" name="name" id="exampleName" />
          </FormGroup>
        </Col>
        <Col md={{ size: 5, offset: 0 }}>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" id="exampleEmail" />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={{ size: 10, offset: 1 }}>
          <FormGroup>
            <Label for="exampleText">Message</Label>
            <Input type="textarea" name="text" id="exampleText" />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={{ size: 10, offset: 1 }}>
          <Button>Submit</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default About;
