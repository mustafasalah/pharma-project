import React from "react";
import FormButtons from "./FormButtons";
import FormField from "./FormField";

const InventoryForm = ({ state, colsLength }) => {
    return (
        <td colSpan={colsLength}>
            <form action="#" method="post">
                <div className="grid gap-5 grid-cols-6">
                    <FormField
                        className="flex flex-col col-span-3"
                        label="product name"
                        name="product_name"
                        id="1"
                        value={state.name}
                        placeholder="enter product name here..."
                        disabled
                    />

                    <FormField
                        className="flex flex-col"
                        label="barcode"
                        name="barcode"
                        id="2"
                        value={state.barcode}
                        placeholder="barcode here..."
                        disabled
                    />

                    <FormField
                        className="flex flex-col"
                        label="unit size"
                        name="unit_size"
                        id="3"
                        value={state.unit}
                        placeholder="e.g. 6 Capsules"
                        disabled
                    />

                    <FormField
                        className="flex flex-col"
                        label="category"
                        name="category"
                        id="4"
                        value={state.category}
                        type="select"
                        options={[
                            { label: "select the category", value: "" },
                            {
                                label: "Analgesics",
                                value: "analgesics",
                            },
                            { label: "Antacids", value: "antacids" },
                            {
                                label: "Antibiotics",
                                value: "antibiotics",
                            },
                            {
                                label: "Antianxiety Drugs",
                                value: "antianxiety drugs",
                            },
                        ]}
                        placeholder="Select Category"
                        disabled
                    />

                    <FormField
                        className="flex flex-col col-span-2"
                        label="company"
                        name="company"
                        id="5"
                        value={state.company}
                        type="text"
                        options={["test", "test1", "test2", "test3"]}
                        placeholder="Enter the company..."
                        taggable
                        disabled
                    />

                    <FormField
                        className="flex flex-col"
                        label="supplier"
                        name="supplier"
                        id="6"
                        value={state.supplier}
                        type="text"
                        options={["drugs up", "ahmed drugs", "salay medicines"]}
                        taggable
                    />

                    <FormField
                        className="flex flex-col"
                        label="cost"
                        name="cost"
                        id="7"
                        value={state.cost}
                        type="number"
                        min="1"
                    />

                    <FormField
                        className="flex flex-col"
                        label="price"
                        name="price"
                        id="8"
                        value={state.price}
                        type="number"
                        min="1"
                    />

                    <FormField
                        className="flex flex-col"
                        label="Online Order?"
                        name="gender"
                        type="radio"
                        value={state.online_order}
                        options={[
                            {
                                label: "Enable",
                                value: true,
                            },
                            {
                                label: "Disable",
                                value: false,
                            },
                        ]}
                    />

                    <FormField
                        className="flex flex-col"
                        label="in stock"
                        name="in_stock"
                        id="9"
                        value={state.stock}
                        type="number"
                        min="0"
                    />

                    <FormField
                        className="flex flex-col"
                        label="Reserved"
                        name="reserved"
                        id="10"
                        value={state.reserved}
                        type="number"
                        min="0"
                    />

                    <FormField
                        className="flex flex-col col-span-2"
                        label="arrival date"
                        name="arrival_date"
                        id="11"
                        value={state.arrival_date}
                        max={state.expair_date.value}
                        type="date"
                        placeholder="e.g. 11-11-2021"
                    />

                    <FormField
                        className="flex flex-col col-span-2"
                        label="expire date"
                        name="expire_date"
                        id="12"
                        value={state.expair_date}
                        min={state.arrival_date.value}
                        type="date"
                        placeholder="e.g. 11-11-2021"
                    />
                </div>
                <FormButtons />
            </form>
        </td>
    );
};

export default InventoryForm;
