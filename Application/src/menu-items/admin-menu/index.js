import adminDashboard from "./adminDashboard";

// ==============================|| ADMIN MENU ITEMS ||============================== //
const adminMenuItems = (user) => {
    return {
        items: [adminDashboard(user)]
    };
};

export default adminMenuItems;
