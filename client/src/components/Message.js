import React from "react";
import { Grid, Typography } from "@material-ui/core";

function ChefSearch({ senderMsg, message }) {
    const specificStyle = senderMsg
        ? {
              float: "left",
              backgroundColor: "lightgrey",
          }
        : {
              float: "right",
              backgroundColor: "lightblue",
          };
    const style = {
        borderRadius: "10px",
        margin: "10px",
        padding: "10px",
        ...specificStyle,
    };

    return (
        <Grid item xs={12}>
            <Typography variant="h6" style={style}>
                {message}
            </Typography>
        </Grid>
    );
}

export default ChefSearch;
