import React from "react";

const StepsProgress = ({ steps, currentStep }) => {
    return (
        <div className="my-10 animate__animated animate__faster animate__backInDown">
            <div className="flex items-center mb-3 px-8">
                {steps.map((title, i) => {
                    const no = i + 1;
                    if (steps.length - 1 !== i) {
                        return (
                            <>
                                <span
                                    className={`${
                                        currentStep.value === 2 && no === 1
                                            ? "cursor-pointer"
                                            : ""
                                    } select-none shadow w-10 h-10 inline-block rounded-full text-white text-xl text-center font-semibold leading-10 ${
                                        no <= currentStep.value
                                            ? "bg-primary"
                                            : "bg-bright"
                                    }`}
                                    onClick={() => {
                                        if (
                                            currentStep.value === 2 &&
                                            no === 1
                                        ) {
                                            currentStep.set(1);
                                        }
                                    }}
                                >
                                    {no}
                                </span>
                                <span
                                    className={`select-none h-2 flex-grow shadow ${
                                        no < currentStep.value
                                            ? "bg-primary"
                                            : "bg-gray-200"
                                    }`}
                                ></span>
                            </>
                        );
                    }
                    return (
                        <span
                            className={`text-shadow select-none shadow w-10 h-10 inline-block rounded-full text-white text-xl text-center font-semibold leading-10 ${
                                no <= currentStep.value
                                    ? "bg-primary"
                                    : "bg-bright"
                            }`}
                        >
                            {no}
                        </span>
                    );
                })}
            </div>
            <div className="flex items-center justify-around">
                {steps.map((title, i) => {
                    const no = i + 1;
                    return (
                        <span
                            className={`capitalize font-semibold w-1/${
                                steps.length
                            } text-smd ${
                                no <= currentStep.value ? "" : "text-gray-500"
                            } ${
                                no > 1 && no < steps.length
                                    ? "text-center"
                                    : no === steps.length
                                    ? "text-right"
                                    : ""
                            }`}
                        >
                            {title}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default StepsProgress;
