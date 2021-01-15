import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import { theme } from "./theme/muiTheme";
import { ThemeProvider } from "@material-ui/core";
import Layout from "./components/Layout/Layout";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Layout>
				<Home></Home>
			</Layout>
		</ThemeProvider>
	);
}

export default App;
