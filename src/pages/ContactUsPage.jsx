import React from "react";
import { Container, Grid, Typography, TextField, Button } from "@mui/material";

const contactUsStyle = {
	padding: "40px 0",
};

const contactUsContentStyle = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	textAlign: "center",
};

const headingStyle = {
	fontSize: "2.5rem",
	fontWeight: "bold",
	marginBottom: "20px",
};

const paragraphStyle = {
	fontSize: "1.2rem",
	marginBottom: "20px",
};

const formStyle = {
	width: "100%",
	maxWidth: "500px",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
};

const inputStyle = {
	marginBottom: "20px",
};

const submitButtonStyle = {
	padding: "10px 20px",
	fontSize: "1.01rem",
	fontWeight: "400",
	backgroundColor: "#ff5722",
	color: "white",
	border: "none",
	borderRadius: "5px",
	cursor: "pointer",
	transition: "background-color 0.3s ease",
};

const contactInfoStyle = {
	marginTop: "40px",
	textAlign: "center",
};

const ContactUsPage = () => {
	return (
		<section style={contactUsStyle}>
			<Container maxWidth="lg">
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<div style={contactUsContentStyle}>
							<Typography variant="h1" style={headingStyle}>
								Contact Us
							</Typography>
							<Typography variant="body1" style={paragraphStyle}>
								Have questions or feedback? We'd love to hear from you!
							</Typography>
							<div style={formStyle}>
								<TextField
									label="Your Name"
									variant="outlined"
									fullWidth
									style={inputStyle}
								/>
								<TextField
									label="Email Address"
									variant="outlined"
									fullWidth
									style={inputStyle}
								/>
								<TextField
									label="Message"
									variant="outlined"
									fullWidth
									multiline
									rows={4}
									style={inputStyle}
								/>
								<Button variant="contained" style={submitButtonStyle}>
									Send Message
								</Button>
							</div>
						</div>
						<div style={contactInfoStyle}>
							<Typography
								variant="h2"
								style={{ marginBottom: "20px", fontSize: "2rem" }}
							>
								Contact Information
							</Typography>
							<Typography variant="body1">
								Email: info@wondermall.com
							</Typography>
							<Typography variant="body1">Phone: +1 (123) 456-7890</Typography>
							<Typography variant="body1">
								Address: Chabahhil, Kathmandu, Nepal
							</Typography>
						</div>
					</Grid>
				</Grid>
			</Container>
		</section>
	);
};

export default ContactUsPage;
