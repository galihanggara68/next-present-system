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
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { publicApi } from "../../../helpers/client/api_client";

export default function Register() {
	const [username, setUsername] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");

	const router = useRouter();

	const handleChange = (e) => {
		switch (e.target.id) {
			case "username":
				setUsername(e.target.value);
				break;
			case "name":
				setName(e.target.value);
				break;
			case "password":
				setPassword(e.target.value);
				break;
			case "confirm_password":
				setPasswordConfirmation(e.target.value);
				break;
		}
	};

	const handleSubmit = (e) => {
		publicApi("/api/register", { username, name, password })
			.then((res) => {
				router.push("/app/login");
			})
			.catch((e) => {
				toast.error("Gagal daftar", {
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
	};

	return (
		<Container>
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
							Form Register
						</Typography>
						<TextField
							fullWidth
							id="username"
							label="Username"
							onChange={handleChange}
							type="text"
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<TextField
							fullWidth
							id="name"
							label="Name"
							onChange={handleChange}
							type="text"
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<TextField
							fullWidth
							id="password"
							label="Password"
							onChange={handleChange}
							type="password"
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<TextField
							fullWidth
							id="confirm_password"
							label="Password Confirmation"
							onChange={handleChange}
							type="password"
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<Button
							variant="contained"
							fullWidth
							onClick={handleSubmit}
						>
							Register
						</Button>
						<Typography sx={{ textAlign: "center" }}>
							Or <Link href="/app/login">Login</Link>
						</Typography>
					</Stack>
				</CardContent>
			</Card>
		</Container>
	);
}
