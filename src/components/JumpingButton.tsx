"use client";

import { AutoDelete } from "@/types/AutoDelete.type";
import Button from "@mui/material/Button";
import { useEffect } from "react";

type JumpingButtonProps = {
  item: AutoDelete;
  delay: number;
  autoJump: boolean;
  onClick: (item: AutoDelete) => void;
  onJumping: (item: AutoDelete) => void;
};

export default function JumpingButton({
  item,
  delay = 5,
  autoJump = false,
  onClick = () => {},
  onJumping = () => {},
}: JumpingButtonProps) {
  useEffect(() => {
    if (!autoJump) return;
    const delayTimeout = setTimeout(() => onJumping(item), delay * 1000);

    return function clearEffect() {
      clearTimeout(delayTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, autoJump, item]);

  return (
    <Button className="w-full" variant="outlined" onClick={() => onClick(item)}>
      {item.name}
    </Button>
  );
}
