import React from "react"

/* ---------- MATERIAL UI ---------- */
import Grid from "@material-ui/core/Grid"

export default function Container(props) {
	return (
		<Grid container justify="center" spacing={4} {...props}>
			{props.children}
		</Grid>
	)
}
