import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "dark" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-mtn-yellow text-mtn-black active:bg-mtn-yellow-dark",
  dark: "bg-mtn-black text-white active:bg-black/80",
  outline: "bg-transparent text-mtn-black border-[1.5px] border-mtn-black",
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`w-full rounded-[10px] px-3 py-2.5 font-body text-[13px] font-bold transition-colors ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
