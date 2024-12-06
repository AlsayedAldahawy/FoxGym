import PropTypes from "prop-types";
import "../assets/css/messageModule.css";
import { useEffect } from "react";

const MessageModal = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);
  if (!isVisible) return null;

  setTimeout(() => {
    isVisible = false;
  }, 1500);
  let messageClass = "";
  switch (type) {
    case "success":
      messageClass = "message-success";
      break;
    case "error":
      messageClass = "message-error";
      break;
    case "info":
      messageClass = "message-info";
      break;
    case "default":
    default:
      messageClass = "message-default";
      break;
  }

  return (
    <div className={`message ${messageClass}`}>
      <span>{message}</span>
      <button onClick={onClose} className="close-button">
        ×
      </button>
    </div>
  );
};

MessageModal.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "info", "default"]).isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MessageModal;
