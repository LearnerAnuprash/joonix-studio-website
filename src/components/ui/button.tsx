import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md border font-medium whitespace-nowrap transition-[color,background-color,border-color,transform] duration-150 ease-out select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:translate-y-px disabled:pointer-events-none disabled:opacity-40 aria-disabled:pointer-events-none aria-disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        default:
          "border-primary bg-primary text-primary-foreground hover:bg-primary-hover hover:text-primary-hover-foreground",
        outline:
          "border-foreground bg-transparent text-foreground hover:bg-secondary",
        secondary:
          "border-input bg-secondary text-secondary-foreground hover:border-foreground",
        ghost: "border-transparent bg-transparent hover:bg-secondary",
        link: "h-auto border-transparent px-0 text-foreground underline-offset-3 hover:underline",
      },
      size: {
        default: "h-12 px-6 text-sm",
        sm: "h-11 px-5 text-sm",
        lg: "h-14 px-8 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants, type ButtonProps };
