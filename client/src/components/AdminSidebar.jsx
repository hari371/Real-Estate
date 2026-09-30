import { NavLink, Link } from "react-router-dom";
import { FiHome, FiGrid, FiUsers, FiFileText, FiLogOut } from "react-icons/fi";

function AdminSidebar() {
	const navLinkClass = ({ isActive }) =>
		`flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition ease-in-out duration-500 ${
			isActive
				? "bg-primary text-white"
				: "text-gray-300 hover:bg-secondary hover:text-white"
		}`;

	return (
		<aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 bg-gray-900 lg:block">
			<div className="flex h-20 items-center border-b border-gray-800 px-6">
				<Link
					to="/"
					className="text-xl font-bold text-white transition ease-in-out duration-500 hover:text-secondary"
				>
					REAL ESTATE
				</Link>
			</div>

			<nav className="px-4 py-6">
				<div className="space-y-2">
					<NavLink
						to="/admin"
						end
						className={navLinkClass}
					>
						<FiHome />
						Dashboard
					</NavLink>

					<NavLink
						to="/admin/properties"
						className={navLinkClass}
					>
						<FiGrid />
						Properties
					</NavLink>

					<NavLink
						to="/admin/agents"
						className={navLinkClass}
					>
						<FiUsers />
						Agents
					</NavLink>

					<NavLink
						to="/admin/blogs"
						className={navLinkClass}
					>
						<FiFileText />
						Blogs
					</NavLink>
				</div>

				<div className="mt-8 border-t border-gray-800 pt-6">
					<button
						type="button"
						className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-sm font-medium text-gray-300 transition ease-in-out duration-500 hover:bg-secondary hover:text-white"
					>
						<FiLogOut />
						Logout
					</button>
				</div>
			</nav>
		</aside>
	);
}

export default AdminSidebar;