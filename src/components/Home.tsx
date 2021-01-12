import React from "react";
import Container from "./Layout/Container";

const arr: any[] = [];
for (let i = 0; i < 100; i++) {
	const element = arr[i];
	arr.push(<div>{i}</div>);
}

export default function Home() {
	return <div>{arr}</div>;
}
