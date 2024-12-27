import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Login from "../components/Login";
import SignUp from "../components/Signup";
import CreateJob from "../Pages/CreateJob";
import MyJobs from "../Pages/MyJobs";
import SalaryPage from "../Pages/SalaryPage";
import UpdateJob from "../Pages/UpdateJob";
import RequireAuth from "../components/RequireAuth";
import React from "react"; // Import RequireAuth component

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <SignUp />, // Make SignUp the default route
            },
            {
                path: "/home",
                element: (
                    <RequireAuth>
                        <Home />
                    </RequireAuth>
                ), // Protect the Home page
            },
            {
                path: "/about",
                element: (
                    <RequireAuth>
                        <About />
                    </RequireAuth>
                ), // Protect the About page
            },
            {
                path: "/sign-up",
                element: <SignUp />, // Public route for SignUp
            },
            {
                path: "/post-job",
                element: (
                    <RequireAuth>
                        <CreateJob />
                    </RequireAuth>
                ), // Protect the Post Job page
            },
            {
                path: "/my-job",
                element: (
                    <RequireAuth>
                        <MyJobs />
                    </RequireAuth>
                ), // Protect the My Jobs page
            },
            {
                path: "/salary",
                element: (
                    <RequireAuth>
                        <SalaryPage />
                    </RequireAuth>
                ), // Protect the Salary page
            },
            {
                path: "edit-job/:id",
                element: (
                    <RequireAuth>
                        <UpdateJob />
                    </RequireAuth>
                ), // Protect the Edit Job page
                loader: ({ params }) =>
                    fetch(`http://localhost:3000/all-jobs/${params.id}`),
            },
            {
                path: "/login",
                element: <Login />, // Public route for Login
            },
        ],
    },
]);

export default router;
