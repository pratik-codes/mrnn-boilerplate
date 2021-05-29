import { Redirect, Route } from "react-router";

const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }: any) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return loggedIn ? (
          <Comp {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                prevLocation: path,
                error: "You need to login first!",
              },
            }}
          />
        );
      }}
    />
  );
};
export default ProtectedRoute;
