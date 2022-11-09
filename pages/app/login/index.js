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
import { publicApi } from "../../../helpers/client/api_client";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const router = useRouter();

	useEffect(() => {
		localStorage.removeItem("token");
	}, []);

	const handleChange = (e) => {
		switch (e.target.id) {
			case "username":
				setUsername(e.target.value);
				break;
			case "password":
				setPassword(e.target.value);
				break;
		}
	};

	const handleSubmit = (e) => {
		publicApi("/api/login", { username: username, password: password })
			.then((res) => {
				localStorage.setItem("token", res.token);
				router.replace("/app/present");
			})
			.catch((e) => {
				console.log(e);
				toast.error("Username atau Password Salah", {
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
			<ToastContainer />
			<Card sx={{ marginTop: "50%" }}>
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
							Form Login
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
							id="password"
							label="Password"
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
							Login
						</Button>
						<Typography sx={{ textAlign: "center" }}>
							Don't have any account ?{" "}
							<Link href="/app/register">Register</Link>
						</Typography>
					</Stack>
				</CardContent>
			</Card>
		</Container>
	);
}
