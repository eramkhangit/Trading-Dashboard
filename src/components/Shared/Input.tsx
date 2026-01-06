import React from "react";
import { cn } from "../../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const baseInputStyles =
    "w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2";

export const normalState =
    "border-gray-300 focus:ring-blue-500";

export const errorState =
    "border-red-500 focus:ring-red-500";


export const Input = React.forwardRef<
    HTMLInputElement,
    InputProps
>(({ label, error, helperText, className, ...props }, ref) => {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <input
                ref={ref}
                className={cn(
                    baseInputStyles,
                    error ? errorState : normalState,
                    className
                )}
                {...props}
            />

            {helperText && !error && (
                <p className={cn("text-xs text-gray-500")}>
                    {helperText}
                </p>
            )}

            {error && (
                <p className={cn("text-xs text-red-500")}>
                    {error}
                </p>
            )}
        </div>
    );
});

Input.displayName = "Input";
