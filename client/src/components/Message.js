import React from "react";
import { Grid, Typography } from "@material-ui/core";

function ChefSearch({ senderMsg, message }) {
    return (
        <Grid item xs={12}>
            <Typography variant="h6" style={{ float: senderMsg ? "left" : "right" }}>
                {message}
            </Typography>
        </Grid>
    );
}

export default ChefSearch;
