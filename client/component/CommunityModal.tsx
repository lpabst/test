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

// type State = Readonly<typeof initialState>;

const CommunityModal = ({
  modalCommunity,
  numMembers,
  editedCommunityName,
  closeCommunityModal,
  updateCommunityInfo,
  archiveCommunity,
  updateParentState,
  editedOwnership,
  newUser,
  permissions,
}) => {
  return (
    <div className="communityModal">
      <div className="closeX" onClick={() => closeCommunityModal()}>
        <i className="material-icons">close</i>
      </div>
      <ModalHeader>
        Community: {modalCommunity.name}
        <br />
        {numMembers > 1 ? `${numMembers} members` : `1 member`}
      </ModalHeader>
      <div>
        <ModalBody>
          <FormGroup>
            <Label for="editName">Edit Name:</Label>
            <Input
              value={editedCommunityName}
              name="editedCommunityName"
              onChange={e => updateParentState(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="addUser">Add User:</Label>
            <Input
              value={newUser}
              name="newUser"
              placeholder="User Id"
              onChange={e => updateParentState(e)}
            />
            <Label for="selectPermissions">Select Permissions</Label>
            <Input
              type="select"
              name="permissions"
              id="permissions"
              onChange={e => updateParentState(e)}
            >
              <option value="FULL_CONTROL">Full Control</option>
              <option value="READ">Read</option>
              <option value="WRITE">Write</option>
              <option value="ADD_USERS">Add Users</option>
              <option value="REMOVE_USERS">Remove Users</option>
              <option value="ADD_VIDEO">Add Video</option>
              <option value="REMOVE_VIDEO">Remove Video</option>
              <option value="WRITE_PERMISSION">Write Permission</option>
            </Input>
          </FormGroup>
          {/* <FormGroup>
            <Label for="editOwnership">Edit Ownership:</Label>
            <Input
              value={editedOwnership}
              name="editedOwnership"
              onChange={e => updateParentState(e)}
            />
          </FormGroup> */}
        </ModalBody>
      </div>
      <ModalFooter>
        <Button
          color="primary"
          onClick={() => updateCommunityInfo(modalCommunity)}
        >
          Update
        </Button>
        <Button color="primary" onClick={() => archiveCommunity()}>
          Archive Community
        </Button>
      </ModalFooter>
    </div>
  );
};

export default CommunityModal;
