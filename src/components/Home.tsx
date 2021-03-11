import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import ProductTable2 from "./ProductTable2";

export default function Home() {
	return (
		<Grid container>
			<Grid item container direction="row" justify="space-between">
				<Box pl={2}>
					<Typography variant="h6">Product</Typography>
				</Box>
			</Grid>

			<Grid item xs>
				<Box mb={20}>
					<ProductTable2 />
				</Box>
			</Grid>
		</Grid>
	);
}
