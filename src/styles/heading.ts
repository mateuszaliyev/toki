import { cva } from "class-variance-authority";

export const heading = cva("font-semibold", {
  compoundVariants: [
    {
      className: "py-10",
      size: "large",
      tall: true,
    },
    {
      className: "py-12",
      size: "medium",
      tall: true,
    },
  ],
  defaultVariants: {
    size: "medium",
  },
  variants: {
    size: {
      large: "text-5xl",
      medium: "text-2xl",
    },
    tall: {
      true: "",
    },
  },
});
