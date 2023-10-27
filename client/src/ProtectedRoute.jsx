import { Navigate,Outlet } from "react-router-dom";
import {  useAuth} from "./context/AuthContext";

function ProtectedRoute() {
    const {loading,user,isAuthenticated}=useAuth();

    if (loading) {
        return <h1>Loadind...</h1>
    }
    if (!loading && !isAuthenticated) {
        return <Navigate to="/login" replace/>
    }

    return <Outlet/>
}

export default ProtectedRoute;
