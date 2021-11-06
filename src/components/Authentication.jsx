import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import ForgetPassword from "./pages/ForgetPassword";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";

const Authentication = () => {
    return (
        <>
            {/* <TopBar withLogo /> */}
            <main>
                <div className="w-60 mx-auto mt-10">
                    <Link to="/">
                        <img
                            src="/assets/images/logo-2.png"
                            alt="Pharma Logo"
                        />
                    </Link>
                </div>

                <div className="mt-10 w-96 mx-auto">
                    <Switch>
                        <Route
                            path="/forget-password"
                            component={ForgetPassword}
                        />
                        <Route
                            path="/reset-password/:token"
                            component={ResetPassword}
                        />
                        <Route path="/login" component={Login} />
                        <Redirect to="/login" />
                    </Switch>
                </div>
            </main>
        </>
    );
};

export default Authentication;
