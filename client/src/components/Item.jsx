import React from "react"

/* ---------- MATERIAL UI ---------- */
import Grid from "@material-ui/core/Grid"

export default function Item(props) {
	return (
		<Grid item xs={12} {...props}>
			{props.children}
		</Grid>
	)
}
