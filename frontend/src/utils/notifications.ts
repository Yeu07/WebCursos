import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = ({
  message,
  type,
}: {
  message: string;
  type: "success" | "error";
}) => {
  if (type === "success") {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  } else if (type === "error") {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }

  return null;
};

export default Notification;