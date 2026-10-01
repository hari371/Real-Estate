import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

function AdminLayout() {
	return (
		<div className="min-h-screen bg-gray-100">
			<AdminSidebar />

			<main className="pt-16 lg:ml-64 lg:pt-0">
				<Outlet />
			</main>
		</div>
	);
}

export default AdminLayout;