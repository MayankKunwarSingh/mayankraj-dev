import { cn } from "@/lib/utils";
import * as React from "react";

const buttonVariantClasses = {
  primary: "button-primary",
  secondary: "button-secondary",
  ghost: "button-ghost",
} as const;

const buttonSizeClasses = {
  default: "button-default",
  sm: "button-sm",
  icon: "button-icon",
} as const;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariantClasses;
  size?: keyof typeof buttonSizeClasses;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => (
    <button
      className={cn(
        "button",
        buttonVariantClasses[variant],
        buttonSizeClasses[size],
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);

Button.displayName = "Button";
