import { useEffect, useState } from "react";

// material-ui
import Grid from "@mui/material/Grid";

import { gridSpacing } from "store/constant";

import { useUser } from "context/UserContext";

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    setLoading(false);
  }, [user]);

  return <Grid container spacing={gridSpacing}></Grid>;
};

export default Dashboard;
