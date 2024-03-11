import React from "react";

const variantStyles = {
  add: "bg-blue-500 text-white px-8 py-2 rounded-md border border-gray-400",
  delete: "bg-red-400 text-white px-3 py-2 rounded-md border border-gray-400",
  edit: "bg-gray-400 text-white px-3 py-2 rounded-md border border-gray-400",
  completed:
    "bg-green-500  text-white px-3 py-2  rounded-md border border-gray-400",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant: keyof typeof variantStyles;
  className?: React.CSSProperties | string;
};

const Button = ({ children, variant, className, ...props }: ButtonProps) => {
  return (
    <button className={variantStyles[variant] + className} {...props}>
      {children}
    </button>
  );
};

export default Button;
