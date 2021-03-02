import { Box, IconButton, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Delete, HighlightOff } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Paging } from "../model/Paging";
import { data, detele, Product } from "../model/Product";
import ConfirmPopUp from "./common/ConfirmPopUp";
import EnhancedTableHead, { Order } from "./table/TableHead";
import { EnhancedTableToolbar } from "./table/Toolbar";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number): T[] {
	const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
	console.log("stabilizedThis: ", stabilizedThis);

	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: "100%",
		},
		paper: {
			width: "100%",
			marginBottom: theme.spacing(2),
		},
		table: {
			minWidth: 750,
		},
		visuallyHidden: {
			border: 0,
			clip: "rect(0 0 0 0)",
			height: 1,
			margin: -1,
			overflow: "hidden",
			padding: 0,
			position: "absolute",
			top: 20,
			width: 1,
		},
	})
);

const ROWSPERPAGEOPTIONS = [7, 15, 25];

export type SearchingAlgorithm = "linear" | "binary";
export type SortingAlgorithm = "selection" | "bubble";

interface Query<T> {
	page: number;
	pageSize: number;
	order: Order;
	orderBy: keyof T;
	searchText?: string;
	searchField: keyof T;
	searchingAlgorithm: SearchingAlgorithm;
	sortingAlgorithm: SortingAlgorithm;
}

export default function ProductTable2() {
	const classes = useStyles();
	const [confirmPopUp, setConfirmPopUp] = useState<boolean>(false);
	const [selectedItem, setSelectedItem] = useState<string>("");
	const [query, setQuery] = React.useState<Query<Product>>({
		page: 0,
		pageSize: ROWSPERPAGEOPTIONS[0],
		order: "asc",
		orderBy: "productCode",
		searchingAlgorithm: "linear",
		sortingAlgorithm: "selection",
		searchField: "name",
	});
	const [pagingItem, setPagingItem] = useState<Paging<Product>>({
		page: 1,
		pageSize: 7,
		rows: [],
		total: 1,
		totalPages: 1,
	});

	const [selected, setSelected] = React.useState<string[]>([]);

	const handleRequestSort = (property: keyof Product) => {
		const isAsc = query.orderBy === property && query.order === "asc";
		setQuery({ ...query, order: isAsc ? "desc" : "asc", orderBy: property });
	};

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelecteds = data.map((n) => n.name);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setQuery({ ...query, page: newPage });
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuery({ ...query, pageSize: parseInt(event.target.value, 10), page: 0 });
	};

	const getPaging = (products: Product[], query: Query<Product>): Paging<Product> => {
		let paging: Paging<Product> = {
			page: query.page,
			pageSize: query.pageSize,
			rows: products,
			total: 1,
			totalPages: 1,
		};
		paging.rows = products.slice(
			query.page * query.pageSize,
			query.page * query.pageSize + query.pageSize
		);
		paging.total = products.length;
		paging.totalPages = Math.ceil(paging.total / paging.pageSize);
		return paging;
	};

	const swap2 = (array: Product[], index1: number, index2: number) => {
		let temp = array[index1];
		array[index1] = array[index2];
		array[index2] = temp;
	};

	const selectionSort = (array: Product[], order: Order, field: keyof Product): Product[] => {
		console.time();
		for (let x = 0; x < array.length; x++) {
			for (let y = x + 1; y < array.length; y++) {
				if (order === "asc") {
					if (array[x][field] > array[y][field]) {
						swap2(array, x, y);
						// let tempt = array[x];
						// array[x] = array[y];
						// array[y] = tempt;
					}
				} else {
					if (array[x][field] < array[y][field]) {
						swap2(array, x, y);
						// let tempt = array[x];
						// array[x] = array[y];
						// array[y] = tempt;
					}
				}
			}
		}
		console.timeEnd();

		return array;
	};

	const bubbleSort = (arr: Product[], order: Order, field: keyof Product): Product[] => {
		console.time();
		for (let i = 0; i < arr.length - 1; i++) {
			for (let j = 0; j < arr.length - 1 - i; j++) {
				if (order === "asc") {
					if (arr[j][field] > arr[j + 1][field]) {
						const temp = arr[j];
						arr[j] = arr[j + 1];
						arr[j + 1] = temp;
					}
				} else {
					if (arr[j][field] < arr[j + 1][field]) {
						const temp = arr[j];
						arr[j] = arr[j + 1];
						arr[j + 1] = temp;
					}
				}
			}
		}
		console.timeEnd();

		return arr;
	};

	const linearSearch = (arr: Product[], searchText: string, field: keyof Product): Product[] => {
		let results = [];
		for (let i = 0; i < arr.length; i++) {
			if (
				arr[i][query.searchField]
					.toString()
					.toLocaleLowerCase()
					.includes(searchText.toLocaleLowerCase())
			) {
				results.push(arr[i]);
			}
		}
		return results;
	};

	const binarySearch = (
		sortedArr: Product[],
		searchText: string,
		field: keyof Product
	): Product[] => {
		console.log("searchText: ", searchText);
		console.log("field: ", field);

		let left = 0;
		let right = sortedArr.length - 1;
		while (left <= right) {
			let mid = Math.floor((left + right) / 2);

			if (sortedArr[mid][field] === searchText) {
				return [sortedArr[mid]];
			}

			if (searchText > sortedArr[mid][field]) {
				left = mid + 1;
			} else {
				right = mid - 1;
			}
		}
		return [];
	};

	const getPagingWithQuery = (data: Product[], query: Query<Product>): Paging<Product> => {
		const sorted = selectionSort(data, query.order, query.orderBy);
		let results: Product[] = [];

		if (query.searchText) {
			switch (query.searchingAlgorithm) {
				case "binary":
					results = binarySearch(sorted, query.searchText, query.searchField);
					break;
				default:
					results = linearSearch(data, query.searchText, query.searchField);
					break;
			}
		} else {
			switch (query.sortingAlgorithm) {
				case "selection":
					results = selectionSort(data, query.order, query.orderBy);
					break;

				default:
					console.log("bubble");

					results = bubbleSort(data, query.order, query.orderBy);
					break;
			}
		}
		return getPaging(results, query);
	};

	// const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
	useEffect(() => {
		console.log(query);
		const pagingFiltered = getPagingWithQuery(data, query);
		setPagingItem(pagingFiltered);
	}, [query]);

	return (
		<div className={classes.root}>
			<Box>
				<EnhancedTableToolbar
					onChangeText={(e) =>
						setQuery({ ...query, searchText: e.target.value as string })
					}
					onChangeField={(value) => {
						setQuery({ ...query, searchField: value as keyof Product });
					}}
					onChangeAlgorithm={(value) => {
						setQuery({ ...query, searchingAlgorithm: value });
					}}
					onChangeSortAlg={(value) => {
						setQuery({ ...query, sortingAlgorithm: value });
					}}
					numSelected={selected.length}
				/>
				<TableContainer>
					<Table
						className={classes.table}
						aria-labelledby="tableTitle"
						size="medium"
						aria-label="enhanced table"
					>
						<EnhancedTableHead
							classes={classes}
							numSelected={selected.length}
							order={query.order}
							orderBy={query.orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={data.length}
						/>
						<TableBody color="primary">
							{pagingItem.rows.map((item, index) => {
								const labelId = `enhanced-table-checkbox-${index}`;

								return (
									<TableRow
										hover
										// onClick={(event) => handleClick(event, row.name)}
										// role="checkbox"
										tabIndex={-1}
										key={item.name}
									>
										<TableCell>
											#{" "}
											{getHightLightText(
												item.productCode,
												query.searchText || ""
											)}
										</TableCell>
										<TableCell
											component="th"
											id={labelId}
											scope="row"
											// padding="none"
										>
											{getHightLightText(item.name, query.searchText || "")}
										</TableCell>
										<TableCell>{item.brand}</TableCell>
										<TableCell align="right">
											{convertMonney(item.price)}
										</TableCell>
										<TableCell align="right">{item.quantity}</TableCell>
										<TableCell align="right">
											<IconButton
												style={{ padding: 12 }}
												onClick={() => {
													setConfirmPopUp(true);
													setSelectedItem(item.productCode);
												}}
											>
												<HighlightOff color="error" />
											</IconButton>
										</TableCell>
										{/* <TableCell align="right">{row.createdAt}</TableCell> */}
									</TableRow>
								);
							})}
							{/* {emptyRows > 0 && (
								<TableRow style={{ height: 53 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)} */}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={ROWSPERPAGEOPTIONS}
					component="div"
					count={pagingItem.total}
					rowsPerPage={pagingItem.pageSize}
					page={pagingItem.page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Box>
			<ConfirmPopUp
				open={confirmPopUp}
				onClose={() => setConfirmPopUp(false)}
				onConfirm={() => {
					detele(selectedItem);
					const pagingFiltered = getPagingWithQuery(data, query);
					setPagingItem(pagingFiltered);
					setConfirmPopUp(false);
					console.log(data);
				}}
			></ConfirmPopUp>
		</div>
	);
}

const convertMonney = (price: number): string => {
	const stringPrice = new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
	}).format(price);
	return stringPrice;
};

const getHightLightText = (value: string | number, searchText: string): React.ReactNode => {
	if (searchText) {
		const regEx = new RegExp(searchText, "i");
		const newValue = value
			.toString()
			.replace(regEx, '<span style="background-color:yellow;">$&</span>');
		return (
			<Typography
				display="inline"
				dangerouslySetInnerHTML={{ __html: newValue }}
			></Typography>
		);
	}
	return value;
};
