import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";

const Topbar = () => {
    return (
        <AppBar position="static" className="tableApp AppBar">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Refael
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;