import React from "react";
import { Container, Grid, Typography, Button } from "@mui/material";

import aboutUsImage from "../assets/bg-about-us.webp";

const aboutUsStyle = {
	padding: "20px 0 40px 0",
};

const aboutUsContentStyle = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	textAlign: "start",
};

const imageStyle = {
	maxWidth: "100%",
	height: "auto",
	marginBottom: "20px",
	// boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)", // Add a subtle shadow
};

const paragraphStyle = {
	fontSize: "1rem",
	marginBottom: "20px",
};

const buttonStyle = {
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

const AboutUsPage = () => {
	return (
		<section style={aboutUsStyle}>
			<Container maxWidth="lg">
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<div style={aboutUsContentStyle}>
							<Typography
								variant="h1"
								sx={{
									fontSize: { xs: "1.8rem", sm: "2.5rem" },
									fontWeight: "bold",
									color: "#000",
									textAlign: "center",
									marginBottom: "10px",
								}}
							>
								Hello From <span style={{ color: "#ff5722" }}>Wondermall</span>
							</Typography>
							<img
								src={aboutUsImage}
								style={imageStyle}
								alt="A girl in four different dress"
							/>
							<Typography variant="body1" style={paragraphStyle}>
								Wondermall is your ultimate destination for high-quality
								clothing items. We are passionate about fashion and committed to
								providing our customers with the latest trends, exceptional
								quality, and unbeatable prices.
							</Typography>
							<Typography variant="body1" style={paragraphStyle}>
								Our vast collection includes a wide range of clothing options
								for men, women, and children. From stylish apparel to
								comfortable loungewear, we've got something for everyone. At
								Wondermall, we believe that looking good should be accessible to
								all, which is why we offer a diverse selection that caters to
								various styles and budgets.
							</Typography>
							<Typography variant="body1" style={paragraphStyle}>
								Whether you're shopping for everyday essentials or searching for
								that perfect outfit for a special occasion, Wondermall has you
								covered. Our mission is to make your online shopping experience
								enjoyable and hassle-free, with easy navigation, secure payment
								options, and reliable delivery services.
							</Typography>
							<Button
								variant="contained"
								style={buttonStyle}
								href="/all-products"
							>
								Explore Our Collections
							</Button>
						</div>
					</Grid>
				</Grid>
			</Container>
		</section>
	);
};

export default AboutUsPage;
