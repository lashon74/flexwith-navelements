import React, { useEffect } from "react";
import "./App.css";
import Login from "./Login";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import { auth } from "./firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);
      if (authUser) {
        // User just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // The user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    //BEM
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />

            <Checkout />
          </Route>
          <Route path="/">
            <Header />

            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
