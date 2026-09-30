import { useState } from "react";
import { Link } from "react-router-dom";

function PropertyListings() {
	const [activeCategory, setActiveCategory] = useState("residential");

	const properties = [];

	const filteredProperties = properties
		.filter((property) => property.category === activeCategory)
		.slice(0, 3);

	return (
		<section className="py-20">
			<div className="mx-auto max-w-7xl px-6">
				<div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
							Our Properties
						</p>

						<h2 className="mt-2 text-4xl font-bold text-gray-900">
							Discover House Listings
						</h2>
					</div>

					<div className="flex flex-wrap gap-3">
						{[
							"residential",
							"commercial",
							"apartment"
						].map((category) => (
							<button
								key={category}
								type="button"
								onClick={() => setActiveCategory(category)}
								className={`rounded-md px-5 py-2.5 text-sm font-semibold capitalize transition ease-in-out duration-500 ${
									activeCategory === category
										? "bg-primary text-white"
										: "bg-gray-100 text-gray-700 hover:bg-secondary hover:text-white"
								}`}
							>
								{category}
							</button>
						))}
					</div>
				</div>

				{filteredProperties.length > 0 ? (
					<div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						{filteredProperties.map((property) => (
							<div key={property._id}>
								{/* Property card will be added when API is connected */}
							</div>
						))}
					</div>
				) : (
					<div className="mt-12 flex min-h-64 items-center justify-center rounded-xl bg-gray-50">
						<p className="text-gray-500">
							Properties will appear here.
						</p>
					</div>
				)}

				<div className="mt-10 text-center">
					<Link
						to="/properties"
						className="inline-block rounded-md bg-primary px-7 py-3 text-sm font-semibold text-white transition ease-in-out duration-500 hover:bg-secondary"
					>
						See More Properties
					</Link>
				</div>
			</div>
		</section>
	);
}

export default PropertyListings;