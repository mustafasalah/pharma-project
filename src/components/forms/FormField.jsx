import React, { useCallback } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

function FormField({
    className,
    label,
    type = "text",
    value,
    options = [],
    taggable = false,
    inputOnly = false,
    inputClassName = "",
    booleanValue = false,
    inputWrapper = false,
    contentAfter,
    escapePattern,
    ...props
}) {
    const currentValue = value !== undefined ? value.get() : "";

    const onInputChange = ({ target }) => {
        if (booleanValue) {
            switch (target.value.toLowerCase()) {
                case "no":
                case "false":
                case "0":
                    value.set(false);
                    break;
                default:
                    value.set(true);
            }
        } else {
            value.set(target.value);
        }
    };

    if (escapePattern && props.pattern) {
        props.pattern = props.pattern.replace(/[$^.]/, "\\$&");
    }

    const onSelectChange = (selectedValue) => {
        value.set(selectedValue.value);
    };

    const renderInput = useCallback(() => {
        switch (type) {
            case "select":
                return (
                    <Select
                        styles={styleObject}
                        className={
                            inputClassName
                                ? inputClassName
                                : "border border-gray-300 bg-white rounded-sm py-1 px-2 shadow"
                        }
                        classNamePrefix="react-select"
                        value={{
                            label: currentValue,
                            value: currentValue,
                        }}
                        options={options}
                        onChange={onSelectChange}
                        isSearchable={true}
                        isDisabled={props.disabled}
                        {...props}
                    />
                );

            case "radio":
                return (
                    <div className="my-auto">
                        {options.map(({ label, value }, i) => (
                            <div
                                key={i}
                                className="inline-block mr-4 last:mr-0"
                            >
                                <input
                                    className="mr-1 align-middle"
                                    type="radio"
                                    value={value}
                                    onChange={onInputChange}
                                    checked={
                                        currentValue.toString() ===
                                        value.toString()
                                    }
                                    {...props}
                                    id={`${label}_${i}`}
                                />
                                <label htmlFor={`${label}_${i}`}>{label}</label>
                            </div>
                        ))}
                    </div>
                );

            case "textarea":
                return (
                    <textarea
                        className="border w-full h-25 border-gray-300 rounded-sm py-1 px-2 shadow"
                        value={currentValue}
                        onChange={onInputChange}
                    />
                );

            case "file":
                return (
                    <>
                        <label
                            htmlFor={props.id}
                            className="inline-block cursor-pointer bg-primary text-white text-xxs rounded-sm shadow-md font-semibold px-2 py-1.5 hover:bg-secondary"
                        >
                            <i className="fas fa-upload text-bright mr-1"></i>{" "}
                            {props.btnLabel || "Upload"}
                        </label>
                        <input
                            className="hidden"
                            type={type}
                            value=""
                            onChange={({ target }) => {
                                value.set(target.files[0]);
                            }}
                            {...props}
                        />
                    </>
                );

            default:
                if (taggable) {
                    return (
                        <CreatableSelect
                            styles={styleObject}
                            className="border w-full border-gray-300 bg-white rounded-sm py-1 px-2 shadow"
                            classNamePrefix="react-select"
                            value={{
                                label: currentValue,
                                value: currentValue,
                            }}
                            options={options}
                            onChange={onSelectChange}
                            onInputChange={(newValue, actionMeta) => {
                                if (actionMeta === "input-change") {
                                    value.set(newValue);
                                }
                            }}
                            isSearchable={true}
                            isDisabled={props.disabled}
                            {...props}
                        />
                    );
                }

                return (
                    <input
                        className={
                            inputClassName ||
                            `border w-full border-gray-300 rounded-sm py-1 px-2 shadow`
                        }
                        type={type}
                        value={currentValue}
                        onChange={onInputChange}
                        {...props}
                    />
                );
        }
    }, [props, options, taggable, type]);

    if (inputOnly) return renderInput();
    return (
        <div className={className}>
            <label
                htmlFor={props.id}
                className="mb-2 block font-medium capitalize"
            >
                {label}
                {props.required ? (
                    <span className="text-red ml-0.5">*</span>
                ) : undefined}
            </label>
            {inputWrapper ? (
                <div className="relative">
                    {renderInput()} {contentAfter}
                </div>
            ) : (
                <>
                    {renderInput()} {contentAfter}
                </>
            )}
        </div>
    );
}

export default FormField;

const styleObject = {
    control: (provided) => ({
        display: "flex",
        justifyContent: "space-between",
    }),
    valueContainer: (provided) => ({
        ...provided,
        padding: "0",
    }),
    indicatorsContainer: () => ({}),
    input: (provided) => ({
        ...provided,
        padding: "0",
        margin: "0",
    }),
    singleValue: (provided) => ({
        ...provided,
        margin: "0",
    }),
    menu: (provided) => ({
        ...provided,
        left: 0,
    }),
};
