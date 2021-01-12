import React from "react";
import styled from "styled-components";
import { colors } from "../../constraints/colors";

const style: React.CSSProperties = {
	padding: "18px 24px",
	display: "block",
	color: colors.textSecondary,
	textDecoration: "none",
	fontWeight: 500,
};

export default function Container({ ...props }) {
	return (
		<div style={{ width: "100%", height: "100%" }}>
			<div style={{ width: "100%", boxShadow: "1px 1px 10px 1px #0000003b", position: "sticky", top: 0, background: "#fff" }}>
				<ul
					style={{
						display: "flex",
						listStyle: "none",
						boxSizing: "border-box",
						justifyContent: "center",
					}}
				>
					<li>
						<a
							style={{
								...style,
								color: colors.primary,
								borderBottom: `3px solid ${colors.primary}`,
							}}
							href="#"
						>
							Home
						</a>
					</li>
					<li>
						<a style={style} href="#">
							Customers
						</a>
					</li>
					<li>
						<a style={style} href="#">
							Contact
						</a>
					</li>
					<li>
						<a style={style} href="#">
							Setting
						</a>
					</li>
				</ul>
			</div>
			<div style={{width: 1200, margin: "0 auto", marginTop: 24 }}>{props.children}</div>
		</div>
	);
}
