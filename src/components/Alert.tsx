import React from "react";
import { Button } from "./Button";
import { MdOutlineCancel } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

interface AlertProps {
  type?: "success" | "error" | "warning" | "info";
  message: string;
  onClose?: () => void;
  show?: boolean;
}

export const Alert: React.FC<AlertProps> = ({
  type = "info",
  message,
  onClose,
  show = true,
}) => {
  if (!show) return null;

  const bgColor = {
    success: "bg-green-100 text-green-800",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-blue-100 text-blue-800",
  }[type];
  const icon = {
    success: <IoIosCheckmarkCircleOutline size={40} className="mr-2" />,
    error: <MdOutlineCancel size={40} className="mr-2" />,
    warning: <MdOutlineCancel size={40} className="mr-2" />,
    info: <MdOutlineCancel size={40} className="mr-2" />,
  }[type];
  return (
    <div
      role="alert"
      className={`
        font-all
        fixed
        top-[5%]
        left-1/2
        transform -translate-x-1/2
        max-w-lg
        w-[60%]
        p-2
        rounded-full
        shadow-lg
        flex items-center justify-between
        ${bgColor}
        z-50
      `}
    >
      {icon}
      <span className="text-xl">{`${message}`}</span>
      {onClose && (
        <Button
          variant="ghost"
          onClick={onClose}
          className="ml-4 font-bold text-2xl shadow-none border-none leading-none focus:outline-none"
          aria-label="Fechar alerta"
        >
          X
        </Button>
      )}
    </div>
  );
};
