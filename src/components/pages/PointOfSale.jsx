import { useHookstate } from "@hookstate/core";
import React, { useEffect } from "react";
import store from "../../state";
import DataTable from "../common/DataTable";
import DeleteBtn from "../common/DeleteBtn";
import Note from "../common/Note";
import SectionHeader from "../common/SectionHeader";
import FormField from "../forms/FormField";
import ProductsSearch from "../forms/ProductsSearch";
import OrderSummary from "../OrderSummary";
import ProductCell from "../table/ProductCell";

const PointOfSale = () => {
    const searchValue = useHookstate("");
    const { discount, products } = useHookstate(store.pos);
    const inventoryItems = useHookstate(store.tables.inventory.data);
    const { vat } = useHookstate(store.pharmacyBranch);

    useEffect(() => {
        let scanneredBarcode = "";
        window.onkeypress = ({ keyCode, key }) => {
            if (keyCode === 13) {
                const product = inventoryItems.find(
                    ({ barcode }) => barcode === scanneredBarcode
                );
                if (product) {
                    products.set((oldList) => {
                        let alreadyExist = false;
                        oldList.forEach((item) => {
                            if (+item.id === +product.id.value) {
                                if (item.stock > item.qty) item.qty++;
                                alreadyExist = true;
                            }
                        });
                        return alreadyExist
                            ? oldList
                            : [{ ...product.get(), qty: 1 }, ...oldList];
                    });
                }
                scanneredBarcode = "";
            } else {
                scanneredBarcode += key;
            }
        };
    }, []);

    return (
        <>
            <SectionHeader
                name="Point of Sale"
                faClass="fas fa-cash-register"
            />
            <div className="grid grid-cols-4 gap-5">
                <div className="col-span-3">
                    <div className="flex justify-between items-center text-xs">
                        <ProductsSearch
                            className="flex-shrink-0"
                            label="Products Search"
                            placeholder="Search Product By Name Here..."
                            products={products}
                            value={searchValue}
                        />
                        <Note>
                            <strong>Note:</strong> You can use{" "}
                            <i className="fas fa-barcode"></i> barcode reader to
                            add the product to basket below.
                        </Note>
                    </div>
                    <div className="mt-5">
                        <DataTable data={products} columns={columns} />
                    </div>
                </div>

                <section className="col-span-1">
                    <OrderSummary
                        products={products}
                        discount={discount}
                        vat={vat}
                    />
                </section>
            </div>
        </>
    );
};

const columns = [
    {
        title: "Order's Products List",
        sortProp: "id",
        wrapper: ({ name, photo, unit, id, edited, handleEdit }) => (
            <ProductCell
                name={name.value}
                photo={photo.value}
                unit={unit.value}
                id={id}
            />
        ),
    },
    { title: "price", prop: "price" },
    { title: "stock", prop: "stock" },
    { title: "reserved", prop: "reserved" },
    { title: "expair date", prop: "expair_date" },
    {
        title: "QTY",
        width: 80,
        wrapper: ({ id, qty, reserved, stock }) => {
            console.log("-id: ", id.get());
            return (
                <FormField
                    id={id.get()}
                    name={`qty_${id.get()}`}
                    type="number"
                    value={qty}
                    max={stock.get()}
                    min="1"
                />
            );
        },
    },
    {
        title: "Subtotal",
        wrapper: ({ price, qty }) => {
            return <strong>{price.get() * qty.get()} SDG</strong>;
        },
    },
    {
        title: "",
        wrapper: ({ id }) => (
            <DeleteBtn
                onDelete={() =>
                    store.pos.products.set((p) => {
                        return p.filter((item) => item.id !== id.value);
                    })
                }
            />
        ),
    },
];

export default PointOfSale;
