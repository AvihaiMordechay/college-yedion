import adminDashboard from "./adminDashboard";
import adminClasses from "./adminClasses";
import adminUsers from "./adminUsers";
import adminWebsiteActions from "./adminWebsiteActions";


// ==============================|| ADMIN MENU ITEMS ||============================== //
const adminMenuItems = (user) => {
    return {
        items: [
            adminDashboard(user),
            adminClasses(user),
            adminUsers(user),
            adminWebsiteActions(user),
        ]
    };
};

export default adminMenuItems;
