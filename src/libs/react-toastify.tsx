import { IconNames, Icon, Typography } from "@/components";
import { ToastOptions, toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

export type ToastType = "success" | "error" | "warning" | "info";
interface ToastArgs {
  message: string;
  type?: ToastType;
  options?: ToastOptions;
}

export const reactToastify = (args: ToastArgs) => {
  const { message, type = "info", options } = args;

  const icon: Record<ToastType, IconNames> = {
    info: "HiExclamation",
    success: "HiCheckCircle",
    warning: "HiExclamationCircle",
    error: "HiExclamationCircle",
  };

  const color: Record<ToastType, string> = {
    info: "text-blue-500",
    success: "text-green-500",
    warning: "text-yellow-500",
    error: "text-red-500",
  };
  const borderColor: Record<ToastType, string> = {
    info: "border-blue-500",
    success: "border-green-500",
    warning: "border-yellow-500",
    error: "border-red-500",
  };
  const bgColor: Record<ToastType, string> = {
    info: "bg-blue-50",
    success: "bg-green-50",
    warning: "bg-yellow-50",
    error: "bg-red-50",
  };

  toast(
    () => (
      <div className="flex items-center gap-4">
        <Icon name={icon[type]} size={16} className={`${color[type]}`} />
        <Typography tag="span" className={color[type]}>
          {message}
        </Typography>
      </div>
    ),
    {
      ...options,
      hideProgressBar: true,
      className: twMerge(
        `px-4 py-3 rounded-lg border shadow-none ${borderColor[type]} ${bgColor[type]}`
      ),
      bodyStyle: { padding: 0, margin: 0 },
    }
  );
};
