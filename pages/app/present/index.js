import { TimerRounded } from "@mui/icons-material";
import { Button, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PresentAppBar from "../../../global_components/appbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import { privateApi } from "../../../helpers/client/api_client";

export default function Present() {
	const [time, setTime] = useState();
	const [status, setStatus] = useState({
		duration: "0H - 0M",
		check_in: null,
		check_out: null,
	});
	const getDuration = () => {
		var dur = moment.duration(moment().diff(moment(status.check_in)));
		const hour = parseInt(dur.asMinutes() / 60);
		const minute = parseInt(
			((dur.asMinutes() / 60).toFixed(2) - hour) * 10
		);
		return `${hour}H - ${minute}M`;
	};

	const updateStatus = () => {
		privateApi("/api/auth/present/laststatus")
			.then((res) => {
				if (res.data) {
					setStatus({ ...status, ...res.data });
				}
			})
			.catch((e) => {
				toast.error("Gagal mendapatkan data", {
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

	setInterval(
		() =>
			setTime(
				new Date().toLocaleTimeString("id", {
					hour: "numeric",
					minute: "numeric",
					second: "numeric",
				})
			),
		1000
	);

	const handleClick = () => {
		privateApi(
			!status.check_in
				? "/api/auth/present/checkin"
				: "/api/auth/present/checkout"
		)
			.then((res) => {
				toast.success("Berhasil", {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
				updateStatus();
			})
			.catch((e) => {
				toast.error("Gagal check in", {
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

	useEffect(() => {
		updateStatus();
	}, []);

	useEffect(() => {
		if (status.check_in && !status.check_out) {
			let durs = getDuration();
			setStatus({ ...status, duration: durs });
		}
	}, [time]);

	return (
		<div>
			<PresentAppBar />
			<ToastContainer />
			<Grid
				sx={{ marginTop: "20%" }}
				container
				justifyContent="space-between"
				alignItems="center"
				columnSpacing={4}
			>
				<Grid item xs={12}>
					<Typography
						sx={{ fontSize: "2.5rem", textAlign: "center" }}
					>
						{time}
					</Typography>
				</Grid>
				<Grid
					item
					xs={8}
					sx={{
						marginLeft: "auto",
						marginRight: "auto",
						marginTop: "20%",
					}}
				>
					<Paper
						sx={{
							padding: 2,
						}}
						className="MuiPaper-rounded"
					>
						<TimerRounded
							sx={{
								fontSize: "4rem",
							}}
						/>
						<Typography
							sx={{ fontSize: "2.7rem", textAlign: "center" }}
						>
							{status && status.duration}
						</Typography>
					</Paper>
					<Grid item xs={12} sx={{ marginTop: "20px" }}>
						<Button
							variant="contained"
							fullWidth
							onClick={handleClick}
							disabled={status.check_in && status.check_out}
						>
							<Typography sx={{ fontSize: "1.5rem" }}>
								{status && status.duration == "0H - 0M"
									? "Check-In"
									: "Check-Out"}
							</Typography>
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}
