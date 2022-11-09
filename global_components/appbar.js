import { AccountCircleRounded } from "@mui/icons-material";
import {
	AppBar,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { privateApi } from "../helpers/client/api_client";

export default function PresentAppBar() {
	const [anchorEl, setAnchorEl] = useState(null);
	const router = useRouter();
	const handleMenu = (e) => {
		setAnchorEl(e.target);
	};
	const handleClose = (e) => {
		setAnchorEl(null);
	};

	const handleClick = (e) => {
		console.log(e);
		router.push(e.target.id == "profile" ? "/app/profile" : "/app/login");
	};

	useEffect(() => {
		privateApi("/api/auth/whoami")
			.then((res) => {})
			.catch((e) => {
				router.replace("/app/login");
			});
	}, []);

	return (
		<AppBar>
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					Present App
				</Typography>
				<div>
					<IconButton
						size="large"
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={handleMenu}
						color="inherit"
					>
						<AccountCircleRounded />
					</IconButton>
					<Menu
						id="menu-appbar"
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem id="profile" onClick={handleClick}>
							Profile
						</MenuItem>
						<MenuItem id="logout" onClick={handleClick}>
							Logout
						</MenuItem>
					</Menu>
				</div>
			</Toolbar>
		</AppBar>
	);
}
