import MainCard from "Components/Cards/MainCard";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const MessagingTable = ({ rows, columns }) => {
  return (
    <MainCard>
      <div style={{ height: 400, width: "100%", direction: "ltr" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </MainCard>
  );
};

export default MessagingTable;
