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

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} md={8}>
        <h1>hello</h1>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
