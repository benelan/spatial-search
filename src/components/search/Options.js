import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input
} from "reactstrap";

const Options = (props) => {
  const { buttonLabel, options} = props;

  const [modal, setModal] = useState(false);
  const [o, setOptions] = useState(props.options);

  const toggle = () => setModal(!modal);

  const submitChange = () => {
      props.onOptionsChange(o);
      toggle()
    }

  return (
    <div>
      <Button style={{ marginBottom: "10px" }} color="success" onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Refine Search</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="radiusSelect">Radius</Label>
            
            <Input type="select" name="select" id="radiusSelect" 
                defaultValue={props.options.radius}
                onChange={e => {
                    let o = props.options;
                    o.radius = e.target.value;
                    setOptions(o)
                    }
                }>
              <option>1</option>
              <option>5</option>
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="unitsSelect">Units</Label>
            
            <Input type="select" name="select" id="unitsSelect" 
                defaultValue={props.options.units}
                onChange={e => {
                    let o = props.options;
                    o.units = e.target.value;
                    setOptions(o)
                    }
                }>
              <option>miles</option>
              <option>feet</option>
              <option>meters</option>
              <option>kilometers</option>
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={submitChange}>
            Submit
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Options;
