import React from "react";
import { SyncLoader, HashLoader } from 'react-spinners'


export const Loading = () => {
    return (

        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute"
            }}>

            <SyncLoader
                size={50}
                color="#36D7B7"
                margin={2}
            />
        </div>
    );
}

export const LazyLoading = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                minHeight: 545,
                alignItems: "center",
            }}>
            <HashLoader
                size={50}
                color="#36D7B7"
                margin={2}
            />
        </div>
    )
}
