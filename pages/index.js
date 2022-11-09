import { CircularProgress, colors, Stack, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
	const [time, setTime] = useState(5);
	const router = useRouter();

	const handleTimer = () => {
		if (time > 0) {
			setTime(time - 1);
		}
	};
	setInterval(handleTimer, 1000);

	useEffect(() => {
		router.replace("/app/login");
	}, [time]);

	return (
		<div>
			<Head>
				<title>Present System</title>
				<meta name="description" content="Present System" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Stack spacing={2} sx={{ marginTop: "20%" }}>
				<CircularProgress
					sx={{
						width: "50px",
						marginLeft: "auto",
						marginRight: "auto",
						color: colors.grey[50],
					}}
				/>
				<Typography
					sx={{
						fontSize: "1.5rem",
						fontWeight: "bold",
						textAlign: "center",
					}}
				>
					Welcome To Present System
				</Typography>
				<Typography
					sx={{
						fontSize: ".8rem",
						color: colors.grey[400],
						textAlign: "center",
					}}
				>
					Created by{" "}
					<Link href="https://github.com/galihanggara68">
						Galih Anggara
					</Link>
				</Typography>
				<Typography
					sx={{
						fontSize: ".8rem",
						color: colors.grey[400],
						textAlign: "center",
					}}
				>
					You will be directed in . . . {time}
				</Typography>
			</Stack>
		</div>
	);
}
