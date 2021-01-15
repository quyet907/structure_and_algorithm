import { AppBar, Box, Button, Grid, makeStyles, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import React from "react";
import { colors } from "../constraints/colors";
import { theme } from "../theme/muiTheme";
import Container from "./Layout/Layout";
import SwipeableViews from 'react-swipeable-views';
import CustomerTab from "./CustomerTab";
import { Add } from "@material-ui/icons";

export default function Home() {
	const [value, setValue] = React.useState(2);

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index: number) => {
		setValue(index);
	};
	return (
		<Grid container>
			<Grid item container direction="row" justify="space-between">
				<Typography variant="h5">Customers</Typography>
				<Button variant="contained" color="primary" startIcon={<Add />}>
					Add new
				</Button>
			</Grid>

			<Grid item xs>
				<Box mt={3} style={{ borderBottom: "1px solid", borderColor: colors.grey }}>
					<Tabs
						value={value}
						indicatorColor="primary"
						textColor="primary"
						onChange={handleChange}
						aria-label="disabled tabs example"
					>
						<Tab label="Customers"  {...a11yProps(0)} />
						<Tab label="Products"  {...a11yProps(1)} />
						<Tab label="Settings"  {...a11yProps(2)} />
					</Tabs>
				</Box>

				<SwipeableViews
					axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
					index={value}
					onChangeIndex={handleChangeIndex}
				>
					<TabPanel value={value} index={0} dir={theme.direction}>
						<CustomerTab />
					</TabPanel>
					<TabPanel value={value} index={1} dir={theme.direction}>
						Item Two
       				</TabPanel>
					<TabPanel value={value} index={2} dir={theme.direction}>
						Item Three
       				</TabPanel>
				</SwipeableViews>
			</Grid>

		</Grid>
	)
};


interface TabPanelProps {
	children?: React.ReactNode;
	dir?: string;
	index: any;
	value: any;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box pt={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: any) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: 500,
	},
}));
