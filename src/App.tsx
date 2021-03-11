import { ThemeProvider } from "@material-ui/core";
import React from "react";
import "./App.css";
import Home from "./components/Home";
import Layout from "./components/Layout/Layout";
import { theme } from "./theme/muiTheme";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Layout>
				{/* {bubbleSort(arr).join(" , ")} */}
				{/* <Box>bubbleSort(arr)</Box> */}
				<Home></Home>
				{/* <New></New> */}
			</Layout>
		</ThemeProvider>
	);
}

export default App;
