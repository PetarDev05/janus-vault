import { toast } from "react-hot-toast";

export const notify = (message, flag) => {
  if (flag === "S") {
    toast.success(message);
  } else if (flag === "F") {
    toast.error(message);
  } else {
    toast(message);
  }
};
