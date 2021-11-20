import React from "react";

const Footer = () => {
    return (
        <footer className=" mt-10">
            <p className="text-smd text-center bg-white border-t py-2 text-gray-600">
                &copy; {new Date().getFullYear()} Pharma. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
