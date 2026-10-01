import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FiHome, FiGrid, FiUsers, FiFileText, FiLogOut, FiMenu, FiX } from "react-icons/fi";

function AdminSidebar() {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const navLinkClass = ({ isActive }) =>
		`flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition ease-in-out duration-500 ${
			isActive
				? "bg-primary text-white"
				: "text-gray-300 hover:bg-secondary hover:text-white"
		}`;

	const handleLogout = () => {
		localStorage.removeItem("token");
		setIsOpen(false);
		navigate("/admin/login", { replace: true });
	};

	const handleLinkClick = () => {
		setIsOpen(false);
	};

	return (
		<>
			<div className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between bg-gray-900 px-5 lg:hidden">
				<Link
					to="/"
					className="text-lg font-bold text-white transition ease-in-out duration-500 hover:text-secondary"
				>
					REAL ESTATE
				</Link>

				<button
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					className="rounded-md p-2 text-white transition ease-in-out duration-500 hover:bg-secondary"
				>
					{isOpen ? (
						<FiX className="text-xl" />
					) : (
						<FiMenu className="text-xl" />
					)}
				</button>
			</div>

			{isOpen && (
				<div
					className="fixed inset-0 z-40 bg-black/50 lg:hidden"
					onClick={() => setIsOpen(false)}
				/>
			)}

			<aside
				className={`fixed left-0 top-0 z-50 h-screen w-64 bg-gray-900 transition ease-in-out duration-500 lg:hidden ${
					isOpen
						? "translate-x-0"
						: "-translate-x-full"
				}`}
			>
				<div className="flex h-16 items-center justify-between border-b border-gray-800 px-5">
					<Link
						to="/"
						onClick={handleLinkClick}
						className="text-lg font-bold text-white"
					>
						REAL ESTATE
					</Link>

					<button
						type="button"
						onClick={() => setIsOpen(false)}
						className="text-gray-300 transition ease-in-out duration-500 hover:text-secondary"
					>
						<FiX className="text-xl" />
					</button>
				</div>

				<nav className="px-4 py-6">
					<div className="space-y-2">
						<NavLink
							to="/admin"
							end
							onClick={handleLinkClick}
							className={navLinkClass}
						>
							<FiHome />
							Dashboard
						</NavLink>

						<NavLink
							to="/admin/properties"
							onClick={handleLinkClick}
							className={navLinkClass}
						>
							<FiGrid />
							Properties
						</NavLink>

						<NavLink
							to="/admin/agents"
							onClick={handleLinkClick}
							className={navLinkClass}
						>
							<FiUsers />
							Agents
						</NavLink>

						<NavLink
							to="/admin/blogs"
							onClick={handleLinkClick}
							className={navLinkClass}
						>
							<FiFileText />
							Blogs
						</NavLink>
					</div>

					<div className="mt-8 border-t border-gray-800 pt-6">
						<button
							type="button"
							onClick={handleLogout}
							className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-sm font-medium text-gray-300 transition ease-in-out duration-500 hover:bg-secondary hover:text-white"
						>
							<FiLogOut />
							Logout
						</button>
					</div>
				</nav>
			</aside>

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
							onClick={handleLogout}
							className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-sm font-medium text-gray-300 transition ease-in-out duration-500 hover:bg-secondary hover:text-white"
						>
							<FiLogOut />
							Logout
						</button>
					</div>
				</nav>
			</aside>
		</>
	);
}

export default AdminSidebar;