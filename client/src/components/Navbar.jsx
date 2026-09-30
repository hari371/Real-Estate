import { Link } from "react-router-dom";

function Navbar() {
	return (
		<nav className="border-b bg-white">
			<div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
				<Link
					to="/"
					className="text-2xl font-bold"
				>
					Real Estate
				</Link>

				<div className="flex items-center gap-8">
					<Link to="/">Home</Link>

					<Link to="/properties">
						Properties
					</Link>

					<Link to="/agents">
						Agents
					</Link>

					<Link to="/blogs">
						Blogs
					</Link>

					<a href="#contact">
						Contact
					</a>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;