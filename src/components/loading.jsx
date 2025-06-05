import { Backdrop, CircularProgress } from "@mui/material"

export default function Loading({ open }) {

    return (
        <Backdrop
            open={open}
            sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.modal + 1, // sobre otros elementos
            }}
        >
            <CircularProgress color="primary" />
        </Backdrop>
    );
}