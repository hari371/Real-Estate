import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const navLinkClass = ({ isActive }) =>
		`text-sm font-medium transition ${
			isActive
				? "text-gray-900"
				: "text-gray-700 hover:text-gray-500"
		}`;

	return (
		<nav className="border-b border-gray-200 bg-white">
			<div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
				<Link
					to="/"
					className="text-2xl font-bold tracking-tight text-gray-900"
					onClick={() => setIsMenuOpen(false)}
				>
					REAL ESTATE
				</Link>

				<div className="hidden items-center gap-8 md:flex">
					<NavLink
						to="/"
						end
						className={navLinkClass}
					>
						Home
					</NavLink>

					<NavLink
						to="/properties"
						className={navLinkClass}
					>
						Properties
					</NavLink>

					<NavLink
						to="/agents"
						className={navLinkClass}
					>
						Agents
					</NavLink>

					<NavLink
						to="/blogs"
						className={navLinkClass}
					>
						Blogs
					</NavLink>

					<a
						href="#contact"
						className="text-sm font-medium text-gray-700 transition hover:text-gray-500"
					>
						Contact
					</a>
				</div>

				<button
					type="button"
					className="text-2xl text-gray-900 md:hidden"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					aria-label="Toggle navigation menu"
				>
					{isMenuOpen ? <FiX /> : <FiMenu />}
				</button>
			</div>

			{isMenuOpen && (
				<div className="border-t border-gray-100 px-6 py-5 md:hidden">
					<div className="flex flex-col gap-5">
						<NavLink
							to="/"
							end
							className={navLinkClass}
							onClick={() => setIsMenuOpen(false)}
						>
							Home
						</NavLink>

						<NavLink
							to="/properties"
							className={navLinkClass}
							onClick={() => setIsMenuOpen(false)}
						>
							Properties
						</NavLink>

						<NavLink
							to="/agents"
							className={navLinkClass}
							onClick={() => setIsMenuOpen(false)}
						>
							Agents
						</NavLink>

						<NavLink
							to="/blogs"
							className={navLinkClass}
							onClick={() => setIsMenuOpen(false)}
						>
							Blogs
						</NavLink>

						<a
							href="#contact"
							className="text-sm font-medium text-gray-700 transition hover:text-gray-500"
							onClick={() => setIsMenuOpen(false)}
						>
							Contact
						</a>
					</div>
				</div>
			)}
		</nav>
	);
}

export default Navbar;