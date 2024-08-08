# Educational Institution Management System
Project Overview
The Educational Institution Management System is a comprehensive platform designed to manage various aspects of a university or college. The system caters to different user roles, including students, staff members, and administrators, allowing each to access and manage relevant data and perform their respective tasks efficiently.

# Features
1. Role-Based Access Control (RBAC)
The system provides different access levels for students, staff, and administrators.
Each user role has specific permissions to access and modify data relevant to their functions.
2. User Authentication
Users authenticate via email and password using Firebase Authentication.
After logging in, users are directed to their respective dashboards based on their role.
3. Admin Management
Admins can manage and view detailed information related to the institution.
Secure access to admin-specific pages is ensured through protected routes.
4. Student and Staff Management
Students and staff have personalized dashboards displaying relevant information.
The system allows for secure navigation between different pages without losing user session data.
5. Data Persistence
User data is stored and retrieved from Firebase Firestore, ensuring real-time updates and data integrity.
The system handles the fetching and updating of user roles and details in a secure and efficient manner.
Project Structure
Contexts:
The project uses React Contexts to manage global state, such as the current logged-in user's information.
Components:
The system consists of modular React components for different pages and functionalities, such as login, dashboard, and protected routes.
Firebase:
Firebase is utilized for authentication and Firestore for database management.
# Installation
1. Clone the repository:
git clone [https://github.com/your-repo-url/educational-institution-management-system.git](https://github.com/AvihaiMordechay/college-yedion.git)
2. Install dependencies:
yarn install
3. Set up Firebase:
Create a Firebase project and add your configuration in a .env file.
4. Navigate to: 
cd Application
5. Run the development server:
yarn start

# Usage
- Access the application through the login page.
- Use your credentials to log in as a student, staff member, or admin.
- Based on your role, you'll be redirected to your personalized dashboard.
Contribution

