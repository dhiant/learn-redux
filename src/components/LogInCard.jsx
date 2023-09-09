import {
	Box,
	Button,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
	Modal,
	Checkbox,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
// import { login, register } from "../reducer/userDataSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
	signInWithGogglePop,
	signInWithGoogleRedirect,
	signInWithFacebookPop,
	signInWithFacebookRedirect,
	auth,
} from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

const LogInCard = ({ showLogInCard, handleCloseLogIn }) => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [logInCard, setLogInCard] = useState(true);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const registeredUser = useSelector((state) => state.userData.users);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const onRegister = (data) => {
		let registerData = {
			fName: data.fName,
			lName: data.lName,
			registerPhoneNumber: data.registerPhoneNumber,
			password: data.password,
		};
		console.log(registerData);
		dispatch(register(registerData));
		console.log(registeredUser);
		// navigate("/checkout");
	};
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: { xs: 1, md: 700 },
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 5,
		scrollable: true,
	};
	const onLogin = (data) => {
		// dispatch()
		console.log(data);
	};
	const logGoggleUser = async () => {
		if (window.screen.width > 600) {
			const response = await signInWithGogglePop();
			console.log(response);
		} else {
			const response = await signInWithGoogleRedirect();
			console.log(response);
		}
	};
	const logFacebookUser = async () => {
		if (window.screen.width > 600) {
			const response = await signInWithFacebookPop();
			console.log(response);
		} else {
			const response = await signInWithFacebookRedirect();
			console.log(response);
		}
	};

	useEffect(() => {
		const user = () => {
			onAuthStateChanged(auth, (user) => {
				if (user) {
					navigate("/checkout");
				}
			});
		};
		return user();
	}, [navigate]);
	return (
		<>
			<div>
				<Modal
					open={showLogInCard}
					onClose={handleCloseLogIn}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						{/* login card */}
						{logInCard && (
							<Box sx={{ p: { xs: 3, md: 0 } }}>
								<Typography id="modal-modal-title" variant="h6" component="h2">
									Welcome! Please Login to continue.
								</Typography>
								<Typography color="primary">
									New Member?{" "}
									<Box
										component="span"
										sx={{
											cursor: "pointer",
											textDecoration: "underline",
										}}
										onClick={() => {
											setLogInCard(false);
										}}
									>
										Register{" "}
									</Box>
									here.
								</Typography>
								<form>
									<Stack
										direction={{ xs: "column", sm: "row" }}
										justifyContent="space-between"
									>
										<Stack
											spacing={4}
											sx={{ pt: 2, width: { xs: 1, sm: 1 / 2 } }}
										>
											<TextField
												label="Phone Number or Email"
												required
												size="small"
												fullWidth
												{...register("loginPhoneNumber", {
													required: true,
												})}
												error={!!errors.loginPhoneNumber}
												// helperText={errors.loginPhoneNumber?.message}
											/>
											<TextField
												label="Password"
												required
												size="small"
												autoComplete="password"
												type={showPassword ? "text" : "password"}
												{...register("loginPassword", {
													required: true,
												})}
												error={!!errors.logInpassword}
												// helperText={errors.logInpassword?.message}
												fullWidth
												InputProps={{
													endAdornment: (
														<InputAdornment position="end">
															<IconButton
																onClick={(e) => setShowPassword(!showPassword)}
															>
																{showPassword ? (
																	<VisibilityIcon />
																) : (
																	<VisibilityOffIcon />
																)}
															</IconButton>
														</InputAdornment>
													),
												}}
											/>
											<Typography color="primary" sx={{ cursor: "pointer" }}>
												Forgot Password?
											</Typography>
										</Stack>
										<Stack sx={{ pt: 2 }}>
											<Button
												size="small"
												variant="contained"
												sx={{
													mb: 1,
													py: 1,
													px: 10,

													backgroundColor: "#f57c00",
													"&:hover": {
														backgroundColor: "#ff9800",
													},
												}}
												type="submit"
												onClick={handleSubmit(onLogin)}
											>
												LOGIN
											</Button>
											<Typography variant="body2">Or, login with</Typography>
											<Button
												size="small"
												variant="contained"
												sx={{
													mt: 2,
													py: 1,
													px: 10,
													backgroundColor: "#1565c0",
													"&:hover": { backgroundColor: "#2962ff" },
												}}
												startIcon={<FacebookIcon />}
												onClick={logFacebookUser}
											>
												Facebook
											</Button>
											<Button
												size="small"
												variant="contained"
												sx={{
													mt: 2,
													py: 1,
													px: 10,

													backgroundColor: "#e53935",
													"&:hover": {
														backgroundColor: "#f44336",
													},
												}}
												startIcon={<GoogleIcon />}
												onClick={logGoggleUser}
											>
												Google
											</Button>
										</Stack>
									</Stack>
								</form>
							</Box>
						)}
						{/* signup card */}
						{!logInCard && (
							<Box sx={{ p: { xs: 3, md: 0 } }}>
								<Typography id="modal-modal-title" variant="h6" component="h2">
									Create your Wonder Mall Card
								</Typography>
								<Typography color="primary">
									Already Member?{" "}
									<Box
										component="span"
										sx={{
											cursor: "pointer",
											textDecoration: "underline",
										}}
										onClick={() => {
											setLogInCard(true);
										}}
									>
										Login{" "}
									</Box>
									here.
								</Typography>
								<form>
									<Stack
										direction={{ xs: "column", sm: "row" }}
										justifyContent="space-between"
										spacing={4}
									>
										<Stack
											spacing={3}
											sx={{ pt: 4, width: { xs: 1, sm: 1 / 2 } }}
										>
											<TextField
												label="First Name"
												required
												size="small"
												{...register("fName", {
													required: "first name is required",
												})}
												error={!!errors.fName}
												// helperText={errors.fName?.message}
											/>
											<TextField
												label="Last Name"
												required
												size="small"
												{...register("lName", {
													required: "last name is required",
												})}
												error={!!errors.lName}
												// helperText={errors.lName?.message}
											/>
											<TextField
												label="Phone Number"
												required
												size="small"
												{...register("registerPhoneNumber", {
													required: "phone number is required",
												})}
												error={!!errors.registerPhoneNumber}
												// helperText={errors.registerPhoneNumber?.message}
											/>
											<TextField
												label="Password"
												required
												size="small"
												autoComplete="password"
												type={showPassword ? "text" : "password"}
												{...register("password", {
													required:
														"Password must be 8-20 characters and include at least 1 letter, 1 number and 1 special characters",
													pattern:
														/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
												})}
												error={!!errors.password}
												helperText={
													"Password must be 8-20 characters and include at least 1 letter, 1 number and 1 special characters"
												}
												fullWidth
												InputProps={{
													endAdornment: (
														<InputAdornment position="end">
															<IconButton
																onClick={(e) => setShowPassword(!showPassword)}
															>
																{showPassword ? (
																	<VisibilityIcon />
																) : (
																	<VisibilityOffIcon />
																)}
															</IconButton>
														</InputAdornment>
													),
												}}
											/>
											<TextField
												label="Confirm Password"
												size="small"
												autoComplete="password"
												type={showConfirmPassword ? "text" : "password"}
												{...register("confirmPassword", {
													required: true,
													validate: (value) => {
														if (watch("password") !== value) {
															return "Your passwords do no match";
														}
													},
												})}
												error={!!errors.confirmPassword}
												helperText={errors.confirmPassword?.message}
												fullWidth
												InputProps={{
													endAdornment: (
														<InputAdornment position="end">
															<IconButton
																onClick={(e) =>
																	setShowConfirmPassword(!showConfirmPassword)
																}
															>
																{showConfirmPassword ? (
																	<VisibilityIcon />
																) : (
																	<VisibilityOffIcon />
																)}
															</IconButton>
														</InputAdornment>
													),
												}}
											/>
										</Stack>
										<Stack sx={{ pt: 3, width: { xs: 1, sm: 1 / 2 } }}>
											<Stack direction="row">
												<Checkbox size="small" sx={{ m: 0, p: 0 }} checked />
												<Typography variant="body2" sx={{ pl: 1 }}>
													I want to receive exclusive offers and promotions from
													Wonder Mall.
												</Typography>
											</Stack>
											<Button
												size="small"
												variant="contained"
												sx={{
													my: 2,
													py: 1,
													px: 10,
													backgroundColor: "#f57c00",
													"&:hover": { backgroundColor: "#ff9800" },
												}}
												onClick={handleSubmit(onRegister)}
												type="submit"
											>
												sign up
											</Button>

											<Typography variant="body2">
												By clicking “SIGN UP”, I agree to Daraz's{" "}
												<Box
													component="span"
													sx={{
														cursor: "pointer",
														color: "#1565c0",
													}}
												>
													Terms of Use{" "}
												</Box>
												and{" "}
												<Box
													component="span"
													sx={{
														cursor: "pointer",
														color: "#1565c0",
													}}
												>
													Privacy Policy{" "}
												</Box>
											</Typography>
											<Typography variant="body2" sx={{ my: 1 }}>
												Or, signup with
											</Typography>
											<Button
												size="small"
												variant="outlined"
												sx={{
													mt: 2,
													py: 1,
													px: 10,
													color: "#f57c00",
													borderColor: "#f57c00",
													"&:hover": {
														backgroundColor: "#fff3e0",
														borderColor: "#ffe0b2",
													},
												}}
											>
												Sign up with Email
											</Button>
											<Stack direction="row" justifyContent="space-between">
												<Button
													size="small"
													variant="contained"
													sx={{
														mt: 2,
														py: 1,
														px: { xs: 2, md: 4 },
														backgroundColor: "#1565c0",
														"&:hover": { backgroundColor: "#2962ff" },
													}}
													startIcon={<FacebookIcon />}
													onClick={logFacebookUser}
												>
													Facebook
												</Button>
												<Button
													size="small"
													variant="contained"
													sx={{
														mt: 2,
														py: 1,
														px: { xs: 2, md: 4 },
														backgroundColor: "#e53935",
														"&:hover": {
															backgroundColor: "#f44336",
														},
													}}
													startIcon={<GoogleIcon />}
													onClick={logGoggleUser}
												>
													Google
												</Button>
											</Stack>
										</Stack>
									</Stack>
								</form>
							</Box>
						)}
					</Box>
				</Modal>
			</div>
		</>
	);
};

export default LogInCard;
