import { Fade } from "@mui/material";
import { HTMLAttributes } from "react";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  display: boolean;
};

export default function GlassCard({ display, children, ...props }: GlassCardProps) {
  return (
    <Fade in={display} timeout={800}>
      <div
        {...props}
        className={`${props.className}
          bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100
        `}
      >
        {children}
      </div>
    </Fade>
  );
}
