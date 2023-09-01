import { Routes, Route } from "react-router-dom";
import Layout from "../layout";
import Signup from "../pages/auth/signup";
import Login from "../pages/auth/login";
import AdminDashboard from "../pages/adminDashboard";
import Branches from "../pages/adminDashboard/settings/branches";
import BranchForm from "../pages/adminDashboard/settings/branches/form";
import { HocModal } from "../utils/modal";

function Routing() {
    return (
        <Routes>
            <Route element={<Layout layoutName="admin" proctedRoute={true} />}>
                <Route path="admin">
                    <Route index element={<AdminDashboard />} />

                    <Route path="settings">
                        <Route path="branches" element={<Branches />} />
                    </Route>
                </Route>
            </Route>
            <Route element={<Layout layoutName="auth" />}>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/" element={<Login />} />
            <Route path="add/branch" element={
                    <BranchForm />
            } />
            <Route path="*" element={404} />
        </Routes>
    )
}

export default Routing;