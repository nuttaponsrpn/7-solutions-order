"use client";

import { Button, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-2">
      <Typography variant="h2">** Set a Goal **</Typography>
      <Typography variant="h3">Functionality Work!!!</Typography>
      <Typography variant="h4">Create auto remove todo list component</Typography>
      <Typography variant="h4">Create format data component</Typography>
      <Typography variant="h4">Ensure code quality by unit test</Typography>
      <Typography variant="h5">Component documentation</Typography>

      <Link href="/Assignment">
        <Button className="w-48 font-bold" variant="contained">
          GO
        </Button>
      </Link>
    </div>
  );
}
