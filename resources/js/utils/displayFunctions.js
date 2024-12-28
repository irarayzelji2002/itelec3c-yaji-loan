import {
  CheckCircleGradientIcon as CheckCircleIcon,
  ErrorCircleGradientIcon as ErrorCircleIcon,
  InfoCircleGradientIcon as InfoCircleIcon,
  WarningCircleGradientIcon as WarningCircleIcon,
} from "@/Icons/GeneralIcons";
import { toast } from "react-toastify";

export const formatDateMMDDYYY = (value) => {
  const formattedDate = value ? value.split("T")[0] : value;
  const [year, month, day] = formattedDate.split("-");
  return `${month}/${day}/${year}`;
};

export const capitalizeFirstLetter = (val) => {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
};

export const showToast = (
  type,
  message,
  time = 3000,
  {
    icon,
    style = {
      color: "black",
      backgroundColor: "white",
      backgroundImage:
        "linear-gradient(to right, #f5fdf9 0%, #edfcf4 20%, #eafbf2 30%, #81e7b2 100%)",
    },
    progressStyle = {
      backgroundColor: "var(--color-text-light-green)",
    },
    position = "top-right",
    hideProgressBar = false,
    closeOnClick = true,
    pauseOnHover = true,
    draggable = true,
  } = {}
) => {
  const toastOptions = {
    position,
    autoClose: time,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    icon,
    style,
    progressStyle,
  };

  switch (type) {
    case "success":
      toastOptions.icon = CheckCircleIcon;
      toast.success(message, toastOptions);
      break;
    case "error":
      toastOptions.icon = ErrorCircleIcon;
      toast.error(message, toastOptions);
      break;
    case "info":
      toastOptions.icon = InfoCircleIcon;
      toast.info(message, toastOptions);
      break;
    case "warn":
      toastOptions.icon = WarningCircleIcon;
      toast.warn(message, toastOptions);
      break;
    default:
      toast(message, toastOptions);
  }
};
