import * as React from "React";
import AccountKit from "react-facebook-account-kit";
import gql from "graphql-tag";
import { fetch } from "../network/graphql";
import { withRouter } from "react-router-dom";
import { AUTH_CODE, AUTH_TOKEN, AUTH_TYPE, USER_ID } from "../session";

class Login extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.accountKitCallback = this.accountKitCallback.bind(this);
  }
  accountKitCallback(resp) {
    var AuthCode = resp.code;
    sessionStorage.setItem(AUTH_CODE, AuthCode);

    if (resp.status === "PARTIALLY_AUTHENTICATED") {
      const authQuery = gql`
        query AuthenticateUser($authCode: String!) {
          authenticateUser(authCode: $authCode) {
            user {
              id
            }
            token
          }
        }
      `;

      return fetch(authQuery, { variables: { authCode: AuthCode } }).then(
        ({ authenticateUser }) => {
          var authToken = authenticateUser.token;
          var authType = authenticateUser.__typename;
          var userId = authenticateUser.user.id;
          sessionStorage.setItem(AUTH_TOKEN, authToken);
          sessionStorage.setItem(AUTH_TYPE, authType);
          sessionStorage.setItem("isAuthenticated", "true");
          sessionStorage.setItem(USER_ID, userId);
          this.props.checkAuthentication();
          this.props.history.push("/community");
        }
      );
    }
  }
  render() {
    return (
      <AccountKit
        appId="842830269247201"
        version="v1.1"
        onResponse={this.accountKitCallback}
        csrf="7c29e4122848bb5a30b451d4bbc93ee3"
      >
        {p => (
          <button
            type="button"
            className="btn btn-raised btn-secondary btn-sm auth-button"
            {...p}
          >
            Log In
          </button>
        )}
      </AccountKit>
    );
  }
}

export default withRouter(Login);
