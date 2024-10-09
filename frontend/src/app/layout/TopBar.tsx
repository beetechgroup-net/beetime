import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import {Stack, Typography} from "@mui/material";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import {useSession} from "next-auth/react";

export default function TopBar() {
  const {data: session, status} = useSession();

  return (
      <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="right"
          height={70}
      >
        <NotificationsNoneOutlinedIcon k={12}/>
        <Typography variant="h6">
          {session?.user?.name}
        </Typography>
        <PermIdentityOutlinedIcon/>
      </Stack>
  );
}