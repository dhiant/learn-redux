import React from "react";
import {
	Container,
	Grid,
	Typography,
	Link,
	IconButton,
	useMediaQuery,
} from "@mui/material";
import {
	Facebook,
	Twitter,
	Instagram,
	Email,
	Phone,
} from "@mui/icons-material";

const footerStyle = {
	backgroundColor: "#263238",
	color: "white",
	padding: "40px 0",
};

const footerContentStyle = {
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
};

const footerLogoStyle = {
	fontSize: "2rem",
	fontWeight: "bold",
	marginBottom: "8px",
};

const footerLinksStyle = {
	marginTop: "16px",
	display: "flex",
	justifyContent: "center",
};

const iconStyle = {
	fontSize: "28px",
	margin: "0 12px",
};

const contactInfoStyle = {
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
};

const Footer = () => {
	// determine if the screen width is above md.
	const isAboveMd = useMediaQuery((theme) => theme.breakpoints.up("md"));
	return (
		<footer style={footerStyle}>
			<Container maxWidth="xl">
				<Grid container spacing={3}>
					<Grid item xs={12} md={6}>
						<div style={footerContentStyle}>
							<Typography variant="h2" style={footerLogoStyle}>
								Wondermall
							</Typography>
							<Typography variant="body1" paragraph>
								Your one-stop shop for all your shopping needs.
							</Typography>
							<div style={footerLinksStyle}>
								<Link
									href="/"
									color="inherit"
									underline="hover"
									style={{ marginRight: "16px" }}
								>
									Home
								</Link>
								<Link
									component="a"
									href="/products"
									color="inherit"
									underline="hover"
									style={{ marginRight: "16px" }}
								>
									Products
								</Link>
								<Link
									href="/about-us"
									color="inherit"
									underline="hover"
									style={{ marginRight: "16px" }}
								>
									About Us
								</Link>
								<Link href="/contact-us" color="inherit" underline="hover">
									Contact Us
								</Link>
							</div>
						</div>
					</Grid>
					<Grid item xs={12} md={6}>
						<div
							style={{
								...contactInfoStyle,
								alignItems: isAboveMd ? "flex-end" : "flex-start",
							}}
						>
							<Typography variant="body1" sx={{ fontSize: "20px" }}>
								Contact us:
							</Typography>
							<div>
								<IconButton
									color="inherit"
									href="https://www.facebook.com/webdevsushant"
								>
									<Facebook style={iconStyle} />
								</IconButton>
								<IconButton color="inherit" href="https://www.twitter.com/">
									<Twitter style={iconStyle} />
								</IconButton>
								<IconButton
									color="inherit"
									href="https://www.instagram.com/webdevsushant/"
								>
									<Instagram style={iconStyle} />
								</IconButton>
								<IconButton color="inherit" href="mailto:info@wondermall.com">
									<Email style={iconStyle} />
								</IconButton>
								<IconButton color="inherit" href="tel:+1234567890">
									<Phone style={iconStyle} />
								</IconButton>
							</div>
							<Typography variant="body2" paragraph>
								Email:{" "}
								<Link href="mailto:info@wondermall.com" color="inherit">
									info@wondermall.com
								</Link>
							</Typography>
							<Typography variant="body2">
								Phone:{" "}
								<Link href="tel:+1234567890" color="inherit">
									+1 (234) 567-890
								</Link>
							</Typography>
						</div>
					</Grid>
				</Grid>
			</Container>
		</footer>
	);
};

export default Footer;
