import * as React from "react";
import { fetch, mutate } from "../network/graphql";
import gql from "graphql-tag";
import "../styles/App.css";
import CommunityModal from "./CommunityModal";

const initialState = {
  communities: [],
  owner: [],
  name: "",
  showCommunityModal: false,
  selectedCommunity: null,
  editedCommunityName: "",
  editCommunityId: "",
  editedOwnership: "",
  newUser: null,
  permissions: "",
};

type State = Readonly<typeof initialState>;

export default class Community extends React.Component<object, any> {
  readonly state: State = initialState;

  constructor(props) {
    super(props);

    this.update = this.update.bind(this);
    this.addCommunity = this.addCommunity.bind(this);
    this.closeCommunityModal = this.closeCommunityModal.bind(this);
    this.archiveCommunity = this.archiveCommunity.bind(this);
    this.updateCommunityInfo = this.updateCommunityInfo.bind(this);
  }

  componentDidMount() {
    this.fetchCommunities();
  }
  update(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  addCommunity() {
    mutate(
      gql`
        mutation CreateNewCommunity($input: CommunityCreateInput!) {
          createCommunity(input: $input) {
            id
            name
          }
        }
      `,
      {
        variables: {
          input: {
            name: this.state.name,
          },
        },
      }
    ).then(res => {
      this.fetchCommunities();
    });
  }

  fetchCommunities() {
    const query = gql`
      query {
        allCommunities {
          communities {
            name
            id
            usersCount
            visibility
          }
        }
      }
    `;
    fetch(query, { fetchPolicy: "network-only" }).then(({ allCommunities }) =>
      this.setState({
        communities: allCommunities.communities || [],
        owner: allCommunities.communities.owner || [],
      })
    );
  }

  viewCommunity(index) {
    this.setState({
      showCommunityModal: true,
      selectedCommunity: index,
      editedCommunityName: this.state.communities[index].name,
      editCommunityId: this.state.communities[index].id,
      editedOwnership: this.state.communities[index].ownerId,
      newUser: this.state.communities[index].newUser,
      permissions: this.state.communities[index].permissions,
    });
  }

  closeCommunityModal() {
    this.setState({
      showCommunityModal: false,
      selectedCommunity: null,
      editedCommunityName: "",
      editCommunityId: "",
      editedOwnership: "",
      newUser: "",
    });
  }

  updateCommunityInfo(community) {
    let newName = this.state.editedCommunityName;
    let newUser = this.state.newUser;
    let newPermissions = this.state.permissions;
    let newOwnership = this.state.editedOwnership;
    if (community.name !== newName) {
      mutate(
        gql`
          mutation UpdateCommunity($input: CommunityUpdateInput!) {
            updateCommunity(input: $input) {
              id
              name
            }
          }
        `,
        {
          variables: {
            input: {
              id: community.id,
              name: newName,
            },
          },
        }
      )
        .then(res => {
          this.fetchCommunities();
        })
        .catch(err => console.log(err));
    }
    if (community.newUser !== newUser) {
      mutate(
        gql`
          mutation AddCommunityUser(
            $userId: ID!
            $communityId: ID!
            $permissions: [PERMISSION]
          ) {
            addCommunityUser(
              userId: $userId
              communityId: $communityId
              permissions: $permissions
            )
          }
        `,
        {
          variables: {
            userId: newUser,
            communityId: community.id,
            permissions: newPermissions,
          },
        }
      );
    }
  }

  archiveCommunity() {}

  render() {
    let {
      communities,
      selectedCommunity,
      editedCommunityName,
      editedOwnership,
      newUser,
      permissions,
    } = this.state;
    let modalCommunity = communities[selectedCommunity];
    let numMembers = selectedCommunity
      ? communities[selectedCommunity].usersCount
      : 0;

    return (
      <div className="container">
        <h3>Communities</h3>
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                placeholder="Name"
                value={this.state.name}
                onChange={this.update}
              />
              <div className="input-group-append">
                <button type="button" className="btn btn-primary bmd-btn-fab">
                  <i className="material-icons">add</i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ul className="demo-list-icon mdl-list">
            {this.state.communities.map((community, i) => (
              <li
                className="mdl-list__item"
                key={i}
                onClick={() => this.viewCommunity(i)}
              >
                <i className="material-icons mdl-list__item-icon" />
                <p>Community: {community.name}</p>
                <p>Visibility: {community.visibility}</p>
              </li>
            ))}
          </ul>
        </div>

        {this.state.showCommunityModal && (
          <CommunityModal
            modalCommunity={modalCommunity}
            numMembers={numMembers}
            editedOwnership={editedOwnership}
            newUser={newUser}
            permissions={permissions}
            editedCommunityName={editedCommunityName}
            closeCommunityModal={this.closeCommunityModal}
            archiveCommunity={this.archiveCommunity}
            updateCommunityInfo={this.updateCommunityInfo}
            updateParentState={this.update}
          />
        )}
      </div>
    );
  }
}
