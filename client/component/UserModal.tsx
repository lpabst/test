import * as React from "react";
import "../styles/App.css";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup,
} from "reactstrap";

const UserModal = ({
  modalUser,
  closeUserModal,
  updateUserInfo,
  archiveUser,
  updateParentState,
  handleSubmit,
  disabled,
}) => {
  return (
    <div className="communityModal">
      <div className="closeX" onClick={() => closeUserModal()}>
        <i className="material-icons">close</i>
      </div>
      <ModalHeader>
        User: {modalUser.firstName} {modalUser.lastName}
        <br />
        Disabled: {modalUser.disabled ? "Yes" : "No"}
      </ModalHeader>
      <div>
        <ModalBody>
          <Form onSubmit={e => handleSubmit(e)}>
            <FormGroup>
              <Label check>
                <Input
                  type="checkbox"
                  name="disabled"
                  id="disabled"
                  checked={disabled}
                  onChange={e => updateParentState(e)}
                />
                Disable User
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
      </div>
      <ModalFooter>
        <Button color="primary" onClick={() => updateUserInfo(modalUser)}>
          Update
        </Button>
        <Button color="primary" onClick={() => archiveUser()}>
          Archive Community
        </Button>
      </ModalFooter>
    </div>
  );
};

export default UserModal;
