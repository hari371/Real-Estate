import { Link } from "react-router-dom";

function Footer() {
	return (
		<footer
			id="contact"
			className="mt-20 bg-gray-900 text-white"
		>
			<div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
				<div>
					<h2 className="text-2xl font-bold">
						REAL ESTATE
					</h2>

					<p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
						Find the right property for your next home,
						investment, or business.
					</p>
				</div>

				<div>
					<h3 className="text-lg font-semibold">
						Quick Links
					</h3>

					<div className="mt-4 flex flex-col gap-3 text-sm text-gray-400">
						<Link
							to="/"
							className="transition hover:text-white"
						>
							Home
						</Link>

						<Link
							to="/properties"
							className="transition hover:text-white"
						>
							Properties
						</Link>

						<Link
							to="/agents"
							className="transition hover:text-white"
						>
							Agents
						</Link>

						<Link
							to="/blogs"
							className="transition hover:text-white"
						>
							Blogs
						</Link>
					</div>
				</div>

				<div>
					<h3 className="text-lg font-semibold">
						Contact
					</h3>

					<div className="mt-4 space-y-3 text-sm text-gray-400">
						<p>+91 98765 43210</p>
						<p>info@realestate.com</p>
						<p>Indore, Madhya Pradesh, India</p>
					</div>
				</div>
			</div>

			<div className="border-t border-gray-800">
				<div className="mx-auto max-w-7xl px-6 py-5 text-center text-sm text-gray-500">
					© 2026 Real Estate. All rights reserved.
				</div>
			</div>
		</footer>
	);
}

export default Footer;