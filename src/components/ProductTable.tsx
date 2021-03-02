import { Box } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { data, Product } from "../model/Product";
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
		console.log("a: ", a);
		console.log("b: ", b);

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

export default function ProductTable() {
	const classes = useStyles();
	const [order, setOrder] = React.useState<Order>("asc");
	const [orderBy, setOrderBy] = React.useState<keyof Product>("name");
	const [selected, setSelected] = React.useState<string[]>([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(ROWSPERPAGEOPTIONS[0]);

	const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Product) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
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
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

	return (
		<div className={classes.root}>
			<Box>
				<EnhancedTableToolbar numSelected={selected.length} />
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
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={data.length}
						/>
						<TableBody color="primary">
							{stableSort(data, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<TableRow
											hover
											// onClick={(event) => handleClick(event, row.name)}
											// role="checkbox"
											tabIndex={-1}
											key={row.name}
										>
											<TableCell
												component="th"
												id={labelId}
												scope="row"
												// padding="none"
											>
												{row.name}
											</TableCell>
											<TableCell>{row.brand}</TableCell>
											<TableCell align="right">
												{convertMonney(row.price)}
											</TableCell>
											<TableCell align="right">{row.quantity}</TableCell>
											<TableCell align="right">{row.discount}</TableCell>
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
					count={data.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Box>
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
