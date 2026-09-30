import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const navLinkClass = ({ isActive }) =>
		`text-sm font-medium transition ease-in-out duration-500 ${
			isActive
				? "text-primary"
				: "text-gray-300 hover:text-secondary"
		}`;

	return (
		<nav
			className={`sticky top-0 z-50 bg-gray-900 transition ease-in-out duration-500 ${
				isScrolled ? "shadow-lg" : "shadow-none"
			}`}
		>
			<div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
				<Link
					to="/"
					className="text-2xl font-bold tracking-tight text-white transition ease-in-out duration-500 hover:text-secondary"
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
						className="text-sm font-medium text-gray-300 transition ease-in-out duration-500 hover:text-secondary"
					>
						Contact
					</a>

					<Link
						to="/admin"
						className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition ease-in-out duration-500 hover:bg-secondary"
					>
						Admin
					</Link>
				</div>

				<button
					type="button"
					className="text-2xl text-white transition ease-in-out duration-500 hover:text-secondary md:hidden"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					aria-label="Toggle navigation menu"
				>
					{isMenuOpen ? <FiX /> : <FiMenu />}
				</button>
			</div>

			{isMenuOpen && (
				<div className="border-t border-gray-800 bg-gray-900 px-6 py-5 md:hidden">
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
							className="text-sm font-medium text-gray-300 transition ease-in-out duration-500 hover:text-secondary"
							onClick={() => setIsMenuOpen(false)}
						>
							Contact
						</a>

						<Link
							to="/admin"
							className="w-fit rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition ease-in-out duration-500 hover:bg-secondary"
							onClick={() => setIsMenuOpen(false)}
						>
							Admin
						</Link>
					</div>
				</div>
			)}
		</nav>
	);
}

export default Navbar;