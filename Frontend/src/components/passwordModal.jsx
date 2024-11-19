import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PasswordModal({
  selectedAdmin,
  password,
  setPassword,
  errorMessage,
  handleLogin,
  onClose,
}) {
  return (
    <Modal
      open={!!selectedAdmin}
      onClose={onClose}
      aria-labelledby="password-modal-title"
      aria-describedby="password-modal-description"
    >
      <Box sx={style}>
        <Typography id="password-modal-title" variant="h6" component="h2">
          Enter Password for {selectedAdmin?.userName}
        </Typography>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          style={{
            width: "100%",
            padding: "8px",
            margin: "16px 0",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        {errorMessage && (
          <Typography
            id="password-modal-description"
            variant="body2"
            color="error"
            sx={{ mb: 2 }}
          >
            {errorMessage}
          </Typography>
        )}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" sx={{
                backgroundColor: "#ed563b",
                "&:hover": {
                backgroundColor: "#d14c33", // Slightly darker shade for hover effect
                },
            }} onClick={handleLogin}>
            Login
          </Button>
          <Button variant="contained" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
