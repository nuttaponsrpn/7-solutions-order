"use client";

import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";

export default function Page() {
  const item = [
    {
      title: "AutoDeleteTodo",
      imagePath: "/static/images/todolist.jpg",
      link: "/Assignment/AutoDeleteTodoList",
      description: "Auto remove item(after pass 5seconds) when the item is moved into it category",
    },
    {
      title: "ConvertData",
      imagePath: "/static/images/convertdata.png",
      link: "/Assignment/ConvertData",
      description: "Convert user data and group users by department",
    },
  ];

  return (
    <div className="flex gap-6">
      <title>7Solutions - Assignment</title>
      <meta content="7Solutions - Assignments Page" key="title" property="og:title" />

      {item.map((item) => (
        <Link href={item.link} key={item.title}>
          <Card className="h-full w-52">
            <CardMedia alt="Auto Delete Todo" className="h-32" component="img" image={item.imagePath} />
            <CardContent>
              <Typography sx={{ color: "text.primary" }} variant="h5">
                {item.title}
              </Typography>
              <Typography sx={{ color: "text.secondary" }} variant="body2">
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
