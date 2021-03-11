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
				<Home></Home>
			</Layout>
		</ThemeProvider>
	);
}

export default App;
