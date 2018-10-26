import * as React from "react";
import "../styles/App.css";

import {
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  FormGroup,
} from "reactstrap";

const ContentModal = ({
  modalContent,
  closeContentModal,
  updateContentInfo,
  archiveContent,
  updateParentState,
}) => {
  return (
    <div className="communityModal">
      <div className="closeX" onClick={() => closeContentModal()}>
        <i className="material-icons">close</i>
      </div>
      <ModalHeader>Content:</ModalHeader>
      <div>
        <ModalBody>
          <p>
            Author: {modalContent.author.firstName}
            {modalContent.author.lastName}
            {modalContent.author.id}
          </p>
        </ModalBody>
      </div>
      <ModalFooter>
        <Button color="primary" onClick={() => updateContentInfo(modalContent)}>
          Update
        </Button>
        <Button color="primary" onClick={() => archiveContent()}>
          Archive
        </Button>
      </ModalFooter>
    </div>
  );
};

export default ContentModal;
