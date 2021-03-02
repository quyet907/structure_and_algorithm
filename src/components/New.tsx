import React from "react";

let arr: number[] = [];
for (let i = 1; i <= 10; i++) {
	if (i !== 4) arr.push(i);
}

console.log(arr);

export default function New() {
	const binarySearch = (element: number, arr: number[], left: number, right: number): number => {
		const mid = Math.ceil((left + right) / 2);
		console.log(left, mid, right);

		if (element === arr[mid]) return mid;
		if (left === right) return -1;
		if (element < arr[mid]) return binarySearch(element, arr, left, mid - 1);
		if (element > arr[mid]) return binarySearch(element, arr, mid + 1, right);

		return -1;
	};

	const binarySearch2 = (element: number, arr: number[], left: number, right: number): number => {
		const mid = Math.ceil((left + right) / 2);
		console.log(left, mid, right);

		if (element < arr[0] || element > arr[arr.length - 1]) return -1;
		if (element === arr[mid]) return mid;
		else if (element < arr[mid]) return binarySearch(element, arr, left, mid - 1);
		else return binarySearch(element, arr, mid + 1, right);
	};

	return <div>{binarySearch(4, arr, 0, arr.length - 1)}</div>;
}
