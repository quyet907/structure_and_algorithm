import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@material-ui/core";
import React from "react";

type Props = {
	open: boolean;
	onClose?(): void;
    onConfirm?(): void;
};

export default function ConfirmPopUp(props: Props) {
	return (
		<Dialog
			open={props.open}
			onClose={props.onClose}
            maxWidth="xs"
            fullWidth
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">Confirm</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Are you sure to remove?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.onClose} color="primary">
					NO
				</Button>
				<Button onClick={props.onConfirm} color="primary" autoFocus>
					YES
				</Button>
			</DialogActions>
		</Dialog>
	);
}
