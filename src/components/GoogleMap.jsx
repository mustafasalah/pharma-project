import React, { useRef, useEffect, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { useDeepCompareEffectForMaps } from "../utility";

const GoogleMap = ({
    label = "Location",
    className,
    required = true,
    coordinates,
    immutable = false,
    initZoom = 10,
}) => {
    const position = {
        lat: coordinates.lat.get(),
        lng: coordinates.lng.get(),
    };

    const [zoom, setZoom] = useState(initZoom);

    const markHandler = ({ latLng }) => {
        coordinates.lat.set(latLng.lat);
        coordinates.lng.set(latLng.lng);
    };

    const idleHandler = (m) => {
        setZoom(m.getZoom());
    };

    return (
        <div className={className}>
            <label className="mb-2 block font-medium capitalize">
                {label}
                {required ? (
                    <span className="text-red ml-0.5">*</span>
                ) : undefined}
            </label>

            <Wrapper
                apiKey="AIzaSyBAnn3NbbCpXNdOS313q5Ic2oOfP-69pus"
                render={(status) => (
                    <h1>
                        {status === "FAILURE"
                            ? "No Internet Connection!"
                            : status}
                    </h1>
                )}
            >
                <Map
                    center={position}
                    zoom={zoom}
                    onClick={immutable || markHandler}
                    onIdle={idleHandler}
                >
                    <Marker position={position} />
                </Map>
            </Wrapper>
        </div>
    );
};

const Map = ({ children, style, onClick, onIdle, onDrag, ...options }) => {
    const ref = useRef(null);
    const [map, setMap] = useState();

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, options));
        }
    }, [ref, map]);

    // because React does not do deep comparisons, a custom hook is used
    // see discussion in https://github.com/googlemaps/js-samples/issues/946
    useDeepCompareEffectForMaps(() => {
        if (map) {
            map.setOptions(options);
        }
    }, [map, options]);

    useEffect(() => {
        if (map) {
            ["click", "idle"].forEach((eventName) =>
                window.google.maps.event.clearListeners(map, eventName)
            );

            onClick && map.addListener("click", onClick);
            onIdle && map.addListener("idle", () => onIdle(map));
        }
    }, [map, onClick, onIdle, onDrag]);

    return (
        <>
            <div ref={ref} className="w-full h-80 shadow-md rounded" />
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // set the map prop on the child component
                    return React.cloneElement(child, { map });
                }
            })}
        </>
    );
};

const Marker = (options) => {
    const [marker, setMarker] = useState();

    useEffect(() => {
        if (!marker) {
            setMarker(new window.google.maps.Marker());
        }

        // remove marker from map on unmount
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    useEffect(() => {
        if (marker) {
            marker.setOptions(options);
        }
    }, [marker, options]);

    return null;
};

export default GoogleMap;
