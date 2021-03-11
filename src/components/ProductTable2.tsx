import { Box, IconButton, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { HighlightOff } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Paging } from "../model/Paging";
import { data, deleteProduct, Product } from "../model/Product";
import { Order, Query } from "../model/Query";
import { convertMoney, getHightLightText } from "../utils/AppUtils";
import ConfirmPopUp from "./common/ConfirmPopUp";
import EnhancedTableHead from "./table/TableHead";
import { EnhancedTableToolbar } from "./table/Toolbar";

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
			rows: [],
			total: 1,
			totalPages: 1,
		};
		const start = query.page * query.pageSize;
		const end = query.page * query.pageSize + query.pageSize;

		for (let index = start; index < end; index++) {
			if (products[index]) {
				paging.rows.push(products[index]);
				continue;
			}
			break;
		}
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
		for (let x = 0; x < array.length; x++) {
			for (let y = x + 1; y < array.length; y++) {
				if (order === "asc") {
					if (array[x][field] > array[y][field]) {
						swap2(array, x, y);
					}
				} else {
					if (array[x][field] < array[y][field]) {
						swap2(array, x, y);
					}
				}
			}
		}

		return array;
	};

	const bubbleSort = (arr: Product[], order: Order, field: keyof Product): Product[] => {
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
					results = bubbleSort(data, query.order, query.orderBy);
					break;
			}
		}
		return getPaging(results, query);
	};

	const getTypo = (text: string, highlight?: boolean, defaultText?: string | number) => {
		return highlight ? (
			<Typography
				dangerouslySetInnerHTML={{
					__html: text,
				}}
			></Typography>
		) : (
			defaultText
		);
	};

	useEffect(() => {
		const pagingFiltered = getPagingWithQuery(data, query);
		setPagingItem(pagingFiltered);
	}, [query]);

	return (
		<div className={classes.root}>
			<Box>
				<EnhancedTableToolbar
					onChangeText={(e) =>
						setQuery({ ...query, page: 0, searchText: e.target.value as string })
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
											{getTypo(
												getHightLightText(
													item.productCode,
													query.searchText || ""
												),
												query.searchField === "productCode",
												item.productCode
											)}
										</TableCell>
										<TableCell
											component="th"
											id={labelId}
											scope="row"
											// padding="none"
										>
											{getTypo(
												getHightLightText(
													item.name,
													query.searchText || ""
												),
												query.searchField === "name",
												item.name
											)}
										</TableCell>
										<TableCell>
											{getTypo(
												getHightLightText(
													item.brand,
													query.searchText || ""
												),
												query.searchField === "brand",
												item.brand
											)}
										</TableCell>
										<TableCell align="right">
											{convertMoney(item.price)}
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
									</TableRow>
								);
							})}
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
					deleteProduct(selectedItem);
					const pagingFiltered = getPagingWithQuery(data, query);
					setPagingItem(pagingFiltered);
					setConfirmPopUp(false);
				}}
			></ConfirmPopUp>
		</div>
	);
}
