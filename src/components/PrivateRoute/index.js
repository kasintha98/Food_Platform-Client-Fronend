import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllStores } from "../../actions";

//we are using this private route for pages that needed login access. for any page that require login we use this private route instead of firect Rout from react-router-dom
const PrivateRoute = ({ component: Component, ...rest }) => {
  const stores = useSelector((state) => state.store.stores);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStores());
  }, []);

  return (
    //getting props from compenents when routing to that components in App.js
    <Route
      {...rest}
      component={(props) => {
        if (stores && stores.length > 0) {
          //if only signin token is available go to the compenent needed (that means user is signed in)
          return <Component {...props} />;
        } else {
          //if signin token is unavailable rederecr the user to signin page (that means user is not signed in)
          return <Redirect to={"/error"} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
