import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import { theme } from "./theme/muiTheme";
import { Box, ThemeProvider } from "@material-ui/core";
import Layout from "./components/Layout/Layout";
import New from "./components/New";

function App() {
	const arr = [10, 9, 8, 7];
	const bubbleSort = (arr: number[]) => {
		for (let i = 0; i < arr.length - 1; i++) {
			for (let j = 0; j < arr.length - 1 - i; j++) {

				if (arr[j] > arr[j + 1]) {
					const temp = arr[j];
					arr[j] = arr[j + 1];
					arr[j + 1] = temp;
				}
				console.log(j, j+1);
				
				console.log(arr);
			}
		}
		console.log(arr.length);

		return arr;
	};

	return (
		<ThemeProvider theme={theme}>
			<Layout>
				{bubbleSort(arr).join(" , ")}
				{/* <Box>bubbleSort(arr)</Box> */}
				{/* <Home></Home> */}
				{/* <New></New> */}
			</Layout>
		</ThemeProvider>
	);
}

export default App;
