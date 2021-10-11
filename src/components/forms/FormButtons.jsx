import React from "react";

function FormButtons({ withDiscard = false }) {
    return (
        <div className="flex justify-end mt-6">
            {withDiscard && (
                <button
                    type="reset"
                    className="mr-5 shadow-md rounded-sm bg-white hover:text-red py-2 px-3 text-black text-smd font-semibold"
                >
                    <i className="fas fa-times text-red mr-1"></i> Discard
                </button>
            )}
            <button
                type="submit"
                className="shadow-md rounded-sm bg-primary hover:bg-secondary py-2 px-3 text-white text-smd font-semibold"
            >
                <i className="fas fa-save text-bright mr-1"></i> Save Changes
            </button>
        </div>
    );
}

export default FormButtons;
