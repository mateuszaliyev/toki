import { cva } from "class-variance-authority";

export const heading = cva("flex items-center font-semibold", {
  defaultVariants: {
    size: "medium",
  },
  variants: {
    size: {
      large: "text-5xl",
      medium: "text-2xl",
    },
    tall: {
      false: "",
      true: "h-32",
    },
  },
});
