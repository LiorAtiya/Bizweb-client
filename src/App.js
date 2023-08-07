import React, { useEffect, useContext } from "react";
import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NavbarComp from "./components/NavbarComp";

import {
  Home,
  Login,
  Error,
  Category,
  SingleBusiness,
  NewBusiness,
  MyAppointments,
  QuickAppointment,
  MyBusiness,
  EditBusiness,
  MyShoppingCart,
  ResetPassword,
} from "./pages";

import { I18nextProvider } from "react-i18next";
import i18n from "./translations/i18n.js";
import { BusinessContext } from "./context/BusinessContext";

export default function App() {
  const context = useContext(BusinessContext);
  const { getUserInfo } = context;

  useEffect(() => {
    const language = localStorage.getItem("language");
    if (language) {
      i18n.changeLanguage(language);
    }
  }, []);

  return (
    <div>
      <I18nextProvider i18n={i18n}>
        <Router>
          <NavbarComp />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              {getUserInfo() ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route exact path="/newbusiness">
              {getUserInfo() ? <NewBusiness /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/quickappointment">
              <QuickAppointment />
            </Route>
            <Route exact path="/myappointments">
              {getUserInfo() ? <MyAppointments /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/myshoppingcart">
              {getUserInfo() ? <MyShoppingCart /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/mybusiness">
              {getUserInfo() ? <MyBusiness /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/editbusiness/:name">
              {getUserInfo() ? <EditBusiness /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/:type">
              <Category />
            </Route>
            <Route path="/:category/:name">
              <SingleBusiness />
            </Route>
            <Route path="/resetPassword/:id/:token">
              <ResetPassword />
            </Route>
            <Route path="*">
              <Error />
            </Route>
          </Switch>
        </Router>
      </I18nextProvider>
    </div>
  );
}
