import {Divider, Stack, Typography} from "@mui/material";
import Image from "next/image";
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import SideBarItem from "@/app/layout/side-bar/SideBarItem";
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export default function SideBar() {
  return (
      <Stack
          direction="column"
          width={240}
          minHeight="100%"
          backgroundColor="background.secondary"
          justifyContent={"start"}
          alignItems={"center"}
          spacing={4}
          height={"100vh"}
      >
        <Stack
            direction="column"
            width={240}
            justifyContent={"center"}
            alignItems={"center"}
        >
          <Image src={"/img/logo.png"} alt="logo" width={100} height={100}/>
          <Typography>
            Beetime
          </Typography>
        </Stack>
        <Divider sx={{width: "100%"}}/>
        <SideBarItem Icon={SpaceDashboardOutlinedIcon} label="Dashboard" route={"/dashboard"}/>
        <SideBarItem Icon={AssignmentOutlinedIcon} label="My Tasks" route={"/tasks"}/>
        <SideBarItem Icon={AssignmentOutlinedIcon} label="Create Task" route={"/tasks/create"}/>
        <SideBarItem Icon={AccountCircleOutlinedIcon} label="Categories" route={"/categories"}/>
        <SideBarItem Icon={AccountCircleOutlinedIcon} label="Create Categories" route={"/categories/create"}/>
        <SideBarItem Icon={AccountCircleOutlinedIcon} label="Profile" route={"/profile"}/>
        <SideBarItem Icon={SettingsOutlinedIcon} label="Settings" route={"/settings"}/>
      </Stack>
  )
}