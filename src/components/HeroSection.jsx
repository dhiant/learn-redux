import React from "react";
import { Container, Grid, Typography, Button } from "@mui/material";

import heroImage from "../assets/image2.png";

const HeroSection = () => {
	return (
		<Container
			maxWidth="xl"
			sx={{ marginTop: "40px", paddingLeft: "30px", paddingRight: "30px" }}
		>
			<Grid container spacing={3} alignItems="center">
				{/* Left side */}
				<Grid
					item
					xs={12}
					sm={6}
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "flex-start",
						padding: "16px",
					}}
				>
					<Typography
						variant="h2"
						component="h1"
						gutterBottom
						sx={{ fontSize: { xs: "30px", md: "40px", lg: "60px" } }}
					>
						Welcome to Our E-commerce Store
					</Typography>
					<Typography variant="body1" paragraph>
						Discover the latest trends and shop for your favorite products in
						our online store.
					</Typography>
					<Button
						variant="contained"
						sx={{
							py: { xs: 1, sm: 1.5 },
							px: 5,
							backgroundColor: "#1565c0",
							"&:hover": { backgroundColor: "#2962ff" },
						}}
					>
						Shop Now
					</Button>
				</Grid>

				{/* Right side */}
				<Grid
					item
					xs={12}
					sm={6}
					sx={{
						display: { xs: "none", sm: "flex" },
						justifyContent: "flex-end",
						padding: "0",
					}}
				>
					<img
						src={heroImage}
						alt="Hero"
						style={{
							maxWidth: "100%",
							height: "auto",
							maxHeight: "350px",
						}}
					/>
				</Grid>
			</Grid>
		</Container>
	);
};

export default HeroSection;
