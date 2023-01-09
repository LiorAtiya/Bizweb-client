import React from 'react';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavbarComp from './components/NavbarComp';

import Home from './pages/Home'
import Login from './pages/Login'
import Error from './pages/Error';
import Category from './pages/Category';
import SingleBusiness from './pages/SingleBusiness'
import NewBusiness from './pages/NewBusiness';
import MyAppointments from './pages/MyAppointments';
import QuickAppointment from './pages/QuickAppointment';
// import { AuthContext } from './context/AuthContext';

export default function App() {
    // const { user } = useContext(AuthContext);

    return (
        <div>
            <Router>
                <NavbarComp />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/login">
                        {/* {user ? <Redirect to='/' /> : <Login />} */}
                        <Login />
                    </Route>
                    <Route exact path="/newbusiness">
                        <NewBusiness />
                    </Route>
                    <Route exact path="/quickappointment">
                        <QuickAppointment />
                    </Route>
                    <Route exact path="/myappointments/:userID">
                        <MyAppointments />
                    </Route>
                    <Route exact path="/category/:type">
                        <Category />
                    </Route>
                    <Route path="/business/:name">
                        <SingleBusiness />
                    </Route>
                    <Route path="*">
                        <Error />
                    </Route>
                </Switch>
            </Router>
        </div >
    )
}