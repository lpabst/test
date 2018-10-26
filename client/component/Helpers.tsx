import * as React from "React";
import { Redirect, Route, Link, withRouter } from "react-router-dom";
import Login from "./Login";

export const AuthRoute = ({
  component: Component,
  authentication,
  ...rest
}) => (
  <Route
    {...rest}
    render={
      authentication
        ? props => <Component />
        : props => (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          )
    }
  />
);

export const CommunityRoute = ({
  component: Component,
  authentication,
  ...rest
}) => (
  <Route
    {...rest}
    render={
      authentication
        ? props => <Component />
        : props => (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          )
    }
  />
);

export const ReportedRoute = ({
  component: Component,
  authentication,
  ...rest
}) => (
  <Route
    {...rest}
    render={
      authentication
        ? props => <Component />
        : props => (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          )
    }
  />
);

export const UserRoute = ({
  component: Component,
  authentication,
  ...rest
}) => (
  <Route
    {...rest}
    render={
      authentication
        ? props => <Component />
        : props => (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          )
    }
  />
);

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

export const AuthButton = () =>
  this.state.isAuthenticated ? (
    <Logout
      isAuthenticated={this.state.isAuthenticated}
      signout={this.signout}
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

export const AdminNav = ({ authentication }) =>
  authentication ? (
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
    </ul>
  ) : (
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <a className="nav-link">{AuthButton}</a>
      </li>
    </ul>
  );
