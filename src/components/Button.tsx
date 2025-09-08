import { twMerge } from "tailwind-merge"
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
   variant?: "primary" | "danger" | "secondary",
}

export const Button = ({variant = "primary", className, ...rest}: ButtonProps) => {

    const variants = {
        primary: "bg-gray-400",
        danger: "bg-red-700",
        secondary: "bg-blue-700"
    };

    return(
        <button 
        className={twMerge(
            `rounded-full px-8 py-2 cursor-pointer shadow-md shadow-gray-500/50 transition-transform
             duration-200 hover:scale-95 active:scale-[98%]`,variants[variant], className)}
        {...rest}
        />
      
    )
}