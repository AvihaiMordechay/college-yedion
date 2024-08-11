import { useUser } from "context/UserContext";
import Grid from "@mui/material/Grid";
import { gridSpacing } from "store/constant";

// import components
import MessagingTable from "./MessagingTable";
import SidebarMessagingSystem from "./SidebarMessagingSystem";

const MessagingSystem = () => {
  const { user } = useUser();

  const columns = [
    { field: "sender", headerName: "שולח", width: 70 },
    { field: "description", headerName: "מלל", width: 130 },
    { field: "date", headerName: "תאריך שליחה", width: 100 },
  ];
  console.log(user);
  return (
    <Grid
      container
      spacing={gridSpacing}
      className="messaging-system-container"
    >
      <Grid item xs={12} className="messaging-grid">
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={9.4} className="messaging-table">
            <MessagingTable
              rows={user.messages.incomingMessages}
              columns={columns}
            />
          </Grid>
          <Grid item xs={12} md={2.6} className="sidebar-messaging-system">
            <SidebarMessagingSystem />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MessagingSystem;
