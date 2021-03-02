import {
	createStyles,
	makeStyles,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
	Theme,
	Typography,
} from "@material-ui/core";
import React from "react";
import { Product } from "../../model/Product";

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

export interface HeadCell {
	id: keyof Product | "actions";
	label: string;
	numeric: boolean;
}

const headCells: HeadCell[] = [
	{ id: "productCode", numeric: false, label: "Product code" },
	{ id: "name", numeric: false, label: "Name" },
	{ id: "brand", numeric: false, label: "Brand" },
	{ id: "price", numeric: true, label: "Price" },
	{ id: "quantity", numeric: true, label: "Quantity" },
	{ id: "actions", numeric: false, label: "" },
];

export type Order = "asc" | "desc";

interface EnhancedTableProps {
	classes: ReturnType<typeof useStyles>;
	numSelected: number;
	onRequestSort: ( property: keyof Product) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

export default function EnhancedTableHead(props: EnhancedTableProps) {
	const { classes, order, orderBy, onRequestSort } = props;
	const createSortHandler = (property: keyof Product) => {
		console.log("res");
		onRequestSort( property);
	};

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? "right" : "left"}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={() => {
								if (headCell.id !== "actions") {
									console.log(true);
									createSortHandler(headCell.id);
								}
							}}
						>
							<Typography style={{ fontWeight: "bolder", fontSize: "0.9rem" }}>
								{headCell.label}
							</Typography>
							{orderBy === headCell.id ? (
								<span className={classes.visuallyHidden}>
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}
