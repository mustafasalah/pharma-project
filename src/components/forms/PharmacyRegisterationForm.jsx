import React from "react";
import { getCityOptions } from "../../utility";
import GoogleMap from "../GoogleMap";
import AuthForm from "./AuthForm";
import AuthFormField from "./AuthFormField";
import PhoneNumberAuthField from "./PhoneNumberAuthField";

const PharmacyRegisterationForm = ({ formState, onSubmit }) => {
    return (
        <AuthForm
            submitBtn={{
                label: "Submit Pharmacy Information",
                faClass: "fas fa-paper-plane",
                className: "w-72 mx-auto-important block",
            }}
            footerLink={{
                link: "/login",
                content: "Do you have an account? Login now",
            }}
            className="grid grid-cols-2 gap-6"
            onSubmit={onSubmit}
        >
            <AuthFormField
                name="pharmacy_name"
                label="pharmacy name"
                id="pharmacy_name"
                value={formState.name}
                placeholder="e.g. CVS Pharmacy"
                minLength="2"
                required
            />
            <AuthFormField
                name="branch_name"
                label="branch name"
                id="branch_name"
                value={formState.branch}
                placeholder="e.g. Khartoum Branch"
            />
            <PhoneNumberAuthField
                name="phone_number_1"
                label="phone number 1"
                id="phone_number_1"
                value={formState.phone_numbers[0]}
                required
            />
            <PhoneNumberAuthField
                name="phone_number_2"
                label="phone number 2"
                id="phone_number_2"
                value={formState.phone_numbers[1]}
            />
            <AuthFormField
                name="pharmacy_email"
                label="pharmacy email"
                id="pharmacy_email"
                type="email"
                value={formState.email}
                placeholder="e.g. examle@example.com"
                icon="fas fa-envelope"
            />
            <AuthFormField
                name="pharmacy_website"
                label="pharmacy website"
                id="pharmacy_website"
                value={formState.website}
                type="url"
                placeholder="e.g. www.example.com"
                icon="fas fa-globe"
            />
            <AuthFormField
                label="state"
                name="state"
                type="select"
                id="state"
                value={formState.state}
                options={[{ label: "Khartoum", value: "khartoum" }]}
                required
            />
            <AuthFormField
                name="city"
                label="city"
                id="city"
                value={formState.city}
                type="select"
                options={getCityOptions()}
                placeholder="city name here..."
                required
            />
            <AuthFormField
                className="col-span-2"
                label="address"
                name="address"
                id="address"
                value={formState.address}
                placeholder="address line here..."
                required
            />
            <GoogleMap
                className="col-span-2"
                coordinates={{ lat: formState.lat, lng: formState.lng }}
                initZoom={9}
            />
        </AuthForm>
    );
};

export default PharmacyRegisterationForm;
