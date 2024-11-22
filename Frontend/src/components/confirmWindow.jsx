import React from "react";

function ConfirmModal({ isOpen, message, onConfirm, onCancel }) {
  if (!isOpen) return null;
  return (
    <div style={modalStyles}>
      {" "}
      <div style={modalContentStyles}>
        {" "}
        <p>{message}</p> <button onClick={onConfirm}>Yes</button>{" "}
        <button onClick={onCancel}>No</button>{" "}
      </div>{" "}
    </div>
  );
}

const modalStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const modalContentStyles = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "5px",
  textAlign: "center",
};
export default ConfirmModal;
