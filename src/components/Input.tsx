import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import type { IconType } from "react-icons";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  sideLabel?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      className,
      rightIcon: RightIcon,
      leftIcon: LeftIcon,
      sideLabel = false,
      ...rest
    },
    ref,
  ) => {
    return (
      <div className={`flex w-full  gap-1 ${sideLabel ? '' : 'flex-col'}`}>
        {label && (
          <label className="font-medium text-gray-700" htmlFor={rest.id}>
            {label}
          </label>
        )}
        <div className="relative w-full">
          {LeftIcon && (
            <div className="absolute top-1/2 left-2 -translate-y-1/2"> 
                {LeftIcon}
            </div>
          )}
          <input
            name={label}
            ref={ref}
            className={twMerge(
              "text-gray-900 w-1/3 bg-white border-4 border-blue-700 rounded-full",
              
              className,
              LeftIcon && "pl-10",
              RightIcon && "pr-10",
            )}
            {...rest}
          />
          {RightIcon && (
            <div className="absolute top-1/2 right-2 -translate-y-1/2">
                {RightIcon}
            </div>
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";
