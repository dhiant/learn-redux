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
import React, { useState } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const LogInCard = ({ showLogInCard, handleCloseLogIn }) => {
  const [logInemail, setLogInEmail] = useState("");
  const [logInpassword, setLogINPassword] = useState("");
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    pNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [logInCard, setLogInCard] = useState(true);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 5,
  };
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
              <div>
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
                <Stack direction="row" justifyContent="space-between">
                  <Stack spacing={4} sx={{ pt: 4, width: "400px" }}>
                    <TextField
                      label="Phone Number or Email"
                      required
                      size="small"
                      fullWidth
                      value={logInemail}
                      onChange={(e) => setLogInEmail(e.target.value)}
                    />
                    <TextField
                      label="Password"
                      required
                      size="small"
                      type={showPassword ? "text" : "password"}
                      value={logInpassword}
                      onChange={(e) => setLogINPassword(e.target.value)}
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
                  <Stack>
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
                    >
                      Google
                    </Button>
                  </Stack>
                </Stack>
              </div>
            )}
            {/* signup card */}
            {!logInCard && (
              <div>
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
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={4}
                >
                  <Stack spacing={3} sx={{ pt: 4, width: "50%" }}>
                    <TextField
                      label="First Name"
                      name="fName"
                      size="small"
                      required
                      value={formData.fName}
                      onChange={(e) => {
                        setFormData({ ...formData, fName: e.target.value });
                      }}
                    />
                    <TextField
                      label="Last Name"
                      name="lName"
                      size="small"
                      required
                      onChange={(e) => {
                        setFormData({ ...formData, lName: e.target.value });
                      }}
                    />
                    <TextField
                      label="Phone Number"
                      name="pNumber"
                      size="small"
                      required
                      value={formData.pNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, pNumber: e.target.value })
                      }
                    />
                    <TextField
                      label="Password"
                      required
                      size="small"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
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
                      required
                      size="small"
                      type={showPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
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
                  </Stack>
                  <Stack sx={{ pt: 3, width: "50%" }}>
                    <Stack direction="row">
                      <Checkbox size="small" sx={{ m: 0, p: 0 }} />
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
                          px: 4,
                          backgroundColor: "#1565c0",
                          "&:hover": { backgroundColor: "#2962ff" },
                        }}
                        startIcon={<FacebookIcon />}
                      >
                        Facebook
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        sx={{
                          mt: 2,
                          py: 1,
                          px: 4,
                          backgroundColor: "#e53935",
                          "&:hover": {
                            backgroundColor: "#f44336",
                          },
                        }}
                        startIcon={<GoogleIcon />}
                      >
                        Google
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              </div>
            )}
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default LogInCard;
