import * as React from "React";
import gql from "graphql-tag";
import { fetch, mutate } from "../network/graphql";
import { USER_ID } from "../session";
import UserModal from "./UserModal";

const userId = sessionStorage.getItem(USER_ID);
const initialState = {
  users: [],
  firstName: "",
  lastName: "",
  disabled: false,
  selectedUser: null,
  createdAt: "",
  id: "",
  showUserModal: false,
};

type State = Readonly<typeof initialState>;

export default class User extends React.Component<object, any> {
  readonly state: State = initialState;
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.closeUserModal = this.closeUserModal.bind(this);
    this.archiveUser = this.archiveUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
  }

  componentDidMount() {
    this.fetchUsers();
  }

  update(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  fetchUsers() {
    const userQuery = gql`
      query {
        allUsers {
          users {
            id
            firstName
            lastName
            createdAt
            disabled
          }
        }
      }
    `;

    fetch(userQuery, { variables: { id: userId } }).then(({ allUsers }) =>
      this.setState({
        users: allUsers.users || [],
      })
    );
  }

  viewUser(index) {
    this.setState({
      showUserModal: true,
      selectedUser: index,
      disabled: this.state.users[index].disabled,
    });
  }

  closeUserModal() {
    this.setState({
      showUserModal: false,
      selectedUser: null,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let { users, selectedUser } = this.state;
    let user = users[selectedUser];
    const input = {
      id: user.id,
      disabled: this.state.disabled,
    };
    mutate(
      gql`
        mutation UpdateUser($input: UserUpdateInput!) {
          updateUser(input: $input) {
            id
          }
        }
      `,
      {
        variables: {
          input,
        },
      }
    )
      .then(response => {
        this.fetchUsers();
      })
      .catch(err => console.log(err));
  }

  updateUserInfo(user) {
    let isDisabled = this.state.disabled;
    mutate(
      gql`
        mutation UpdateUser($input: UserUpdateInput!) {
          updateUser(input: $input) {
            id
          }
        }
      `,
      {
        variables: {
          input: {
            id: user.id,
            disabled: isDisabled,
          },
        },
      }
    )
      .then(res => this.fetchUsers())
      .catch(err => console.log(err.stack));
  }

  archiveUser() {}

  render() {
    let { users, selectedUser } = this.state;
    let modalUser = users[selectedUser];
    return (
      <div className="container">
        <h3>Users</h3>
        <div>
          <ul className="demo-list-icon mdl-list">
            {this.state.users.map((user, i) => (
              <li
                className="mdl-list__item"
                key={i}
                onClick={() => this.viewUser(i)}
              >
                <i className="material-icons mdl-list__item-icon" />
                <p>
                  Users: {user.firstName} {user.lastName}
                  <br />
                  Disabled: {user.disabled ? "Yes" : "No"}
                </p>
              </li>
            ))}
          </ul>
        </div>
        {this.state.showUserModal && (
          <UserModal
            modalUser={modalUser}
            closeUserModal={this.closeUserModal}
            disabled={this.state.disabled}
            archiveUser={this.archiveUser}
            updateUserInfo={this.updateUserInfo}
            updateParentState={this.update}
            handleSubmit={this.handleSubmit}
          />
        )}
      </div>
    );
  }
}
