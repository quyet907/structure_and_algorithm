import { Box, Button, Grid, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { useEffect } from "react";
import { customerController } from "../controllers";
import ProductTable2 from "./ProductTable2";

export default function Home() {
	useEffect(() => {
		customerController.get({ page: 2, pageSize: 10 }).then((res) => console.log(res));
	}, []);
	return (
		<Grid container>
			<Grid item container direction="row" justify="space-between">
				<Box pl={2}>
					<Typography variant="h6">Product</Typography>
				</Box>
			</Grid>

			<Grid item xs>
				<ProductTable2 />
			</Grid>
		</Grid>
	);
}
