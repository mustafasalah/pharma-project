import React, { useCallback } from "react";

function FormField({
    className,
    label,
    type = "text",
    value,
    options = [],
    taggable = false,
    ...props
}) {
    const currentValue = value.get();
    const onChange = ({ target }) => value.set(target.value);
    const printInput = useCallback(() => {
        switch (type) {
            case "select":
                return (
                    <select
                        className="border border-gray-300 rounded-sm py-1 px-2 shadow"
                        value={currentValue}
                        onChange={onChange}
                        {...props}
                    >
                        {options &&
                            options.map(({ label, value }) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                    </select>
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
                                    onChange={onChange}
                                    checked={currentValue === value.toString()}
                                    {...props}
                                />
                                <label htmlFor={`${label}_${i}`}>{label}</label>
                            </div>
                        ))}
                    </div>
                );

            default:
                return (
                    <>
                        <input
                            className="border border-gray-300 rounded-sm py-1 px-2 shadow"
                            type={type}
                            value={currentValue}
                            onChange={onChange}
                            list={
                                taggable
                                    ? `${props.name}_${props.id}_list`
                                    : undefined
                            }
                            {...props}
                        />
                        {taggable && (
                            <datalist id={`${props.name}_${props.id}_list`}>
                                {options.map((option) => (
                                    <option key={option} value={option} />
                                ))}
                            </datalist>
                        )}
                    </>
                );
        }
    }, [props, options, taggable, type]);

    return (
        <div className={className}>
            <label htmlFor={props.id} className="mb-2 font-medium capitalize">
                {label}
            </label>
            {printInput()}
        </div>
    );
}
export default FormField;
