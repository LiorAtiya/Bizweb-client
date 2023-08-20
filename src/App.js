import React, { useEffect, useContext, Suspense,lazy } from "react";
import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import {
  Home,
  // Category,
  // Login,
  // Error,
  // SingleBusiness,
  // NewBusiness,
  // MyAppointments,
  // QuickAppointment,
  // MyBusiness,
  // EditBusiness,
  // MyShoppingCart,
  // ResetPassword,
} from "./pages";

const QuickAppointment = lazy(() => import("./pages/QuickAppointment"));
const Login = lazy(() => import("./pages/Login"));
const Error = lazy(() => import("./pages/Error"));
const Category = lazy(() => import("./pages/Category"));
const NewBusiness = lazy(() => import("./pages/NewBusiness"));
const SingleBusiness = lazy(() => import("./pages/SingleBusiness"));
const MyAppointments = lazy(() => import("./pages/MyAppointments"));
const MyBusiness = lazy(() => import("./pages/MyBusiness"));
const EditBusiness = lazy(() => import("./pages/EditBusiness"));
const MyShoppingCart = lazy(() => import("./pages/MyShoppingCart"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

import AboutUs from "./components/home/AboutUs";

import { I18nextProvider } from "react-i18next";
import i18n from "./translations/i18n.js";
import { BusinessContext } from "./context/BusinessContext";
import ComplexNavbar from "./components/ComplexNavbar";

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
          <Suspense fallback={<h1>Loading...</h1>}>
            <ComplexNavbar />
            {/* <NavbarComp /> */}
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
              <Route exact path="/about">
                <AboutUs />
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
          </Suspense>
        </Router>
      </I18nextProvider>
    </div>
  );
}
