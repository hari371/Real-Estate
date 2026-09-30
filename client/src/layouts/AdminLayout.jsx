import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

function AdminLayout() {
	return (
		<div className="min-h-screen bg-gray-100">
			<AdminSidebar />

			<main className="lg:ml-64">
				<Outlet />
			</main>
		</div>
	);
}

export default AdminLayout;