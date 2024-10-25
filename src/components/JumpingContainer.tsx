import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import { Card, CardContent, CardHeader } from "@mui/material";

type JumpingContainerProps = {
  name: string;
  children: JSX.Element | JSX.Element[];
};

export default function JumpingContainer({ name, children }: JumpingContainerProps) {
  return (
    <Card
      className={`border-solid border-[1px] border-black ${name ? `container-${name}` : "container-main"}`}
      elevation={0}
      sx={{ minWidth: 275 }}
    >
      {!!name && <CardHeader className="text-center bg-slate-200" title={name} />}
      <CardContent className="w-full h-full !p-0">
        <Item className="h-full px-2 py-4">
          <Stack className="flex !flex-col gap-2 items-center justify-center" direction="row">
            {children}
          </Stack>
        </Item>
      </CardContent>
    </Card>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));
