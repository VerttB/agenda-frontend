import { twMerge } from "tailwind-merge"
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
   variant?: "primary" | "danger",
}

export const Button = ({variant = "primary", ...rest}: ButtonProps) => {

    const variants = {
        primary: "bg-gray-500",
        danger: "bg-blue-700"
    };

    return(
        <button 
        className={twMerge(`rounded-2xl px-4 py-2 cursor-pointer shadow-md shadow-gray-500/50 transition-transform
                            duration-200 hover:scale-95 active:scale-[98%]`,variants[variant], rest.className)}
        {...rest}
        >
        
        </button>
    )
}