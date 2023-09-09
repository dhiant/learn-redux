import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, NavLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";

const pages = ["Products", "About Us", "Contact Us"];

const ResponsiveAppBar = () => {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const productInCart = useSelector((state) => state.productList.productInCart);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = (page) => {
		if (page === "all products") {
			<Link to={page === "all products" ? "allproducts" : ""} />;
		}
		setAnchorElNav(null);
	};

	// const handleCloseUserMenu = (logout) => {
	// 	if (logout === "logout") {
	// 		signOut(auth);
	// 		setAnchorElUser(null);
	// 	} else {
	// 		setAnchorElUser(null);
	// 	}
	// };

	return (
		<AppBar
			position="static"
			enableColorOnDark
			sx={{ backgroundColor: "#263238" }}
		>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						variant="h1"
						component={Link}
						to="/"
						noWrap
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 600,
							fontSize: "35px",
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
							py: 1,
						}}
					>
						WONDERMALL
					</Typography>

					{/* logo in small device */}
					<Typography
						variant="h5"
						noWrap
						component={Link}
						to="/"
						sx={{
							mr: 2,
							display: { xs: "block", md: "none" },
							// flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						WONDERMALL
					</Typography>

					{/* menu icon in small device*/}
					<Box
						sx={{
							flexGrow: 1,
							display: {
								xs: "flex",
								md: "none",
								justifyContent: "flex-end",
								textAlign: "right",
							},
						}}
					>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{pages.map((page) => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<Button
										component={Link}
										to={
											page === "Products"
												? "/products"
												: page === "About Us"
												? "/about-us"
												: page === "Contact Us"
												? "/contact-us"
												: ""
										}
										key={page}
										onClick={() => handleCloseNavMenu(page)}
										sx={{ color: "#000" }}
									>
										{page}
									</Button>
								</MenuItem>
							))}
						</Menu>
					</Box>

					{/* other pages */}
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map((page) => (
							<Button
								component={NavLink}
								to={
									page === "Products"
										? "/products"
										: page === "About Us"
										? "/about-us"
										: page === "Contact Us"
										? "/contact-us"
										: ""
								}
								key={page}
								onClick={() => handleCloseNavMenu(page)}
								sx={{
									my: 2,
									color: "white",
									display: "block",
									fontSize: "15px",
								}}
							>
								{page}
							</Button>
						))}
					</Box>

					{/* right side icons */}
					<Box sx={{ flexGrow: 0, display: { xs: "none", md: "block" } }}>
						<IconButton
							sx={{ px: 5, py: 0, color: "#fff" }}
							component={Link}
							to="/cart"
						>
							<Badge badgeContent={productInCart.length} color="primary">
								<ShoppingCartIcon fontSize="large" />
							</Badge>
						</IconButton>
						<Tooltip title="Open profile">
							<IconButton sx={{ p: 0 }}>
								<Avatar alt="Suhant" src="/static/images/avatar/2.jpg" />
							</IconButton>
						</Tooltip>

						{/* <Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map((setting) => (
								<MenuItem
									key={setting}
									onClick={() => handleCloseUserMenu("logout")}
								>
									<Typography textAlign="center">{setting}</Typography>
								</MenuItem>
							))}
						</Menu> */}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default ResponsiveAppBar;
