import React from "react";
import DeleteBtn from "../common/DeleteBtn";
import store from "../../state";
import { useState } from "@hookstate/core";
import FormField from "./FormField";

const ProductPhoto = ({
    className,
    url,
    size,
    label = "Product Photo",
    name = "product_photo",
}) => {
    const {
        uploads: { productPhoto },
    } = useState(store);

    if (productPhoto.value) {
        url = { value: productPhoto.get().name };
        size = { value: productPhoto.get().size };
    }

    return (
        <div className={className}>
            <label htmlFor="0" className="mb-2 font-medium capitalize block">
                {label}
            </label>
            <div className="flex" style={{ height: "calc(100% - 27px)" }}>
                <div
                    className="flex-shrink-0 border bg-white shadow p-2 bg-center bg-origin-content bg-no-repeat rounded-sm bg-contain w-1/3"
                    style={{
                        backgroundImage: `url('${url.value}')`,
                    }}
                >
                    {url.value === "" || productPhoto.value ? (
                        <i className="far fa-image text-5xl block text-center mt-6 text-gray-300"></i>
                    ) : (
                        ""
                    )}
                </div>
                <div className="flex-grow ml-4">
                    <p className="rounded break-all bg-white border-dashed border-2 leading-5 p-2 text-xs">
                        <dl>
                            <dt className="inline-block font-semibold mr-1.5">
                                Name:
                            </dt>
                            <dd className="inline-block">
                                {url.value.split("/").pop()}
                            </dd>
                            <br />
                            <dt className="inline-block font-semibold mr-2">
                                Size:
                            </dt>
                            <dd className="inline-block">
                                {(size.value / 1000).toFixed(1)} KB
                            </dd>
                        </dl>
                    </p>
                    <div className="mt-3 leading-4">
                        {url.value !== "" && (
                            <DeleteBtn
                                onDelete={() => {
                                    if (productPhoto.value === "") {
                                        url.set("");
                                        size.set("");
                                    } else {
                                        productPhoto.set("");
                                    }
                                }}
                            />
                        )}
                        <FormField
                            id="0"
                            name={name}
                            value={productPhoto}
                            type="file"
                            inputOnly
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPhoto;
