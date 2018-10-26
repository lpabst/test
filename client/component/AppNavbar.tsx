import * as React from "React";
import {
  BrowserRouter as Router,
  Link,
  Route,
  withRouter,
} from "react-router-dom";
import { checkSessionAuthentication, endSession } from "../session";
import { AuthRoute, CommunityRoute, ReportedRoute, UserRoute } from "./Helpers";
import { Nav, NavItem, NavLink } from "reactstrap";

// Components
import Community from "./Community";
import Login from "./Login";
import ReportedContent from "./ReportedContent";
import User from "./User";

const authentication = sessionStorage["isAuthenticated"] === "true";

class AppNavbar extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };

    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.signOut = this.signOut.bind(this);
  }
  componentDidMount() {
    this.checkAuthentication();
  }
  checkAuthentication() {
    let isAuthenticated = checkSessionAuthentication();
    this.setState({ isAuthenticated });
  }
  signOut() {
    endSession();
    this.setState({ isAuthenticated: false });
  }
  render() {
    const authButton = this.state.isAuthenticated ? (
      <Logout
        isAuthenticated={this.state.isAuthenticated}
        signout={this.signOut}
      />
    ) : (
      <Route
        exact
        path="/login"
        render={props => (
          <Login {...props} checkAuthentication={this.checkAuthentication} />
        )}
      />
    );

    const adminNav = this.state.isAuthenticated ? (
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" to="/community">
            Community
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/reported_content">
            Reported Content
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/user">
            User
          </Link>
        </li>
        <li className="nav-item">{authButton}</li>
      </ul>
    ) : (
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <a className="nav-link">{authButton}</a>
        </li>
      </ul>
    );

    return (
      <Router>
        <div>
          {adminNav}
          <CommunityRoute
            exact
            path="/community"
            component={Community}
            authentication={sessionStorage["isAuthenticated"] === "true"}
          />
          <ReportedRoute
            exact
            path="/reported_content"
            component={ReportedContent}
            authentication={sessionStorage["isAuthenticated"] === "true"}
          />
          <UserRoute
            exact
            path="/user"
            component={User}
            authentication={sessionStorage["isAuthenticated"] === "true"}
          />
          <AuthRoute
            exact
            path="/"
            component={Community}
            authentication={this.state.isAuthenticated}
          />
        </div>
      </Router>
    );
  }
}

const Logout = withRouter(({ history, signout }) => {
  return (
    <button
      type="button"
      className="btn btn-raised btn-secondary btn-sm"
      onClick={() => signout(() => history.push("/login"))}
    >
      Log out
    </button>
  );
});

export default AppNavbar;
