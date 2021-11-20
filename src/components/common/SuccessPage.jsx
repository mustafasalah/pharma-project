import React, { useEffect, useMemo } from "react";
import { useHistory } from "react-router";

const SuccessPage = ({ title, children, redirect }) => {
    const history = useHistory();

    useEffect(() => {
        window.setTimeout(() => {
            history.push(redirect.link);
        }, 5000);
    }, []);

    return (
        <section className="animate__animated animate__fadeIn">
            <h2 className="text-2xl text-center font-bold mt-20 mb-5 capitalize">
                <i className="text-shadow fas fa-check-circle text-green mr-1"></i>{" "}
                {title}
            </h2>
            <p className="text-gray-500 text-center text-xl">{children}</p>
            {redirect && (
                <p className="bg-white rounded shadow-md p-5 mt-10 text-center">
                    You will be redirected within 5 seconds to{" "}
                    <a href={redirect.link}>{redirect.pageName}</a>.
                </p>
            )}
        </section>
    );
};

export default SuccessPage;
