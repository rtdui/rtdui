import { Outlet } from "react-router-dom";
import { Notifications } from "@rtdui/notifications";
import { Dialogs } from "@rtdui/dialogs";

export default function Root() {
  return (
    <>
      <Dialogs />
      <Notifications />
      <Outlet />
    </>
  );
}
