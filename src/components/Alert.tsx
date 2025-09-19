import React from "react";
import { Button } from "./Button";

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

  return (
    <div
      role="alert"
      className={`
        fixed
        top-[5%]
        left-1/2
        transform -translate-x-1/2
        max-w-lg
        w-[90%]
        p-4
        rounded-full
        shadow-lg
        flex items-center justify-between
        ${bgColor}
        z-50
      `}
    >
      <span>{`${message}`}</span>
      {onClose && (
        <Button
          variant="ghost"
          onClick={onClose}
          className="ml-4 font-bold text-xl shadow-none border-none leading-none focus:outline-none"
          aria-label="Fechar alerta"
        >
          X
        </Button>
      )}
    </div>
  );
};
