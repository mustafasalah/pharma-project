import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import ForgetPassword from "./pages/ForgetPassword";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/Signup";

const Authentication = () => {
    return (
        <>
            {/* <TopBar withLogo /> */}
            <main
                className="border border-trans overflow-y-hidden"
                style={{ minHeight: "calc(100vh - 77px)" }}
            >
                <div className="w-56 mx-auto mt-10">
                    <Link to="/">
                        <img
                            src="/assets/images/logo-2.svg"
                            alt="Pharma Logo"
                        />
                    </Link>
                </div>

                <Switch>
                    <Route path="/forget-password" component={ForgetPassword} />
                    <Route
                        path="/reset-password/:token"
                        component={ResetPassword}
                    />
                    <Route path="/login" component={Login} />
                    <Route path="/sign-up" component={Signup} />
                    <Redirect to="/login" />
                </Switch>
            </main>
            <Footer />
        </>
    );
};

export default Authentication;
