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
    ...props
}) {
    const currentValue = value.get();
    const onInputChange = ({ target }) => {
        value.set(target.value);
    };

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
                                : "border border-gray-300 rounded-sm py-1 px-2 shadow"
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
                                    id={`${label}_${i}`}
                                    className="mr-1 align-middle"
                                    type="radio"
                                    value={value}
                                    onChange={onInputChange}
                                    checked={
                                        currentValue.toString() ===
                                        value.toString()
                                    }
                                    {...props}
                                />
                                <label htmlFor={`${label}_${i}`}>{label}</label>
                            </div>
                        ))}
                    </div>
                );

            default:
                if (taggable) {
                    return (
                        <CreatableSelect
                            styles={styleObject}
                            className="border border-gray-300 rounded-sm py-1 px-2 shadow"
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
                        className="border border-gray-300 rounded-sm py-1 px-2 shadow"
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
            <label htmlFor={props.id} className="mb-2 font-medium capitalize">
                {label}
                {props.required ? (
                    <span className="text-red ml-0.5">*</span>
                ) : undefined}
            </label>
            {renderInput()}
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
