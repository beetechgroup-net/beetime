import {Button, Stack, SvgIconTypeMap, Typography} from "@mui/material";
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {useRouter} from "next/navigation";

interface SideBarItemProps {
  Icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  label: string,
  route: string
}

export default function SideBarItem({Icon, label, route}: SideBarItemProps) {
  const router = useRouter()

  return (
      <Stack
          direction="row"
          justifyContent={"left"}
          alignItems={"center"}
          spacing={1}
          width={200}
      >
        <Button startIcon={<Icon/>} onClick={() => router.push(route)}>
          {label}
        </Button>
      </Stack>
  )
}