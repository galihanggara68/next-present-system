import {
	Button,
	Card,
	CardContent,
	Container,
	Link,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import PresentAppBar from "../../../global_components/appbar";
import { privateApi, publicApi } from "../../../helpers/client/api_client";

export default function Register() {
	const [username, setUsername] = useState("");
	const [name, setName] = useState("");

	useEffect(() => {
		privateApi("/api/auth/whoami")
			.then((res) => {
				setUsername(res.user.username);
				setName(res.user.name);
			})
			.catch((e) => {
				toast.error("Gagal mengambil profile", {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
			});
	}, []);

	return (
		<Container>
			<PresentAppBar />
			<Card sx={{ marginTop: "50%" }}>
				<ToastContainer />
				<CardContent>
					<Stack spacing={3}>
						<Typography
							sx={{
								textAlign: "center",
								marginBottom: 1,
								fontSize: "1.5rem",
								fontWeight: "bold",
							}}
						>
							Profile
						</Typography>
						<TextField
							fullWidth
							id="name"
							label="Name"
							type="text"
							value={name}
							inputProps={{
								readOnly: true,
							}}
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<TextField
							fullWidth
							id="username"
							label="Username"
							type="text"
							value={username}
							inputProps={{
								readOnly: true,
							}}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</Stack>
				</CardContent>
			</Card>
		</Container>
	);
}
