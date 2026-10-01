import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMapPin } from "react-icons/fi";
import { MdBathtub, MdBed } from "react-icons/md";
import { getProperties } from "../services/propertyService";

function PropertyListings() {
	const [properties, setProperties] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("residential");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const loadProperties = async () => {
			try {
				const response = await getProperties();

				setProperties(
					response.data.properties ||
					response.data
				);
			} catch (error) {
				console.error(error);
				setError("Failed to load properties.");
			} finally {
				setLoading(false);
			}
		};

		loadProperties();
	}, []);

	const categories = [
		{
			label: "Residential",
			value: "residential"
		},
		{
			label: "Commercial",
			value: "commercial"
		},
		{
			label: "Apartment",
			value: "apartment"
		}
	];

	const filteredProperties = properties
		.filter(
			(property) =>
				property.category === selectedCategory
		)
		.slice(0, 3);

	const formatPrice = (price) => {
		return new Intl.NumberFormat("en-IN", {
			style: "currency",
			currency: "INR",
			maximumFractionDigits: 0
		}).format(price);
	};

	return (
		<section className="bg-gray-50 px-6 py-20">
			<div className="mx-auto max-w-7xl">
				<div
					className="text-center"
					data-aos="fade-up"
				>
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
						Explore Properties
					</p>

					<h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
						Discover Your Next Property
					</h2>

					<p className="mx-auto mt-4 max-w-2xl text-gray-500">
						Explore our latest residential, commercial,
						and apartment properties.
					</p>
				</div>

				<div
					className="mt-10 flex flex-wrap justify-center gap-3"
					data-aos="fade-up"
				>
					{categories.map((category) => (
						<button
							key={category.value}
							type="button"
							onClick={() =>
								setSelectedCategory(category.value)
							}
							className={`rounded-md px-6 py-3 text-sm font-semibold transition ease-in-out duration-500 ${
								selectedCategory === category.value
									? "bg-primary text-white"
									: "bg-white text-gray-600 shadow-sm hover:bg-secondary hover:text-white"
							}`}
						>
							{category.label}
						</button>
					))}
				</div>

				{loading && (
					<div className="py-20 text-center text-gray-500">
						Loading properties...
					</div>
				)}

				{error && (
					<div className="py-20 text-center text-red-500">
						{error}
					</div>
				)}

				{!loading && !error && (
					<>
						{filteredProperties.length === 0 ? (
							<div className="py-20 text-center text-gray-500">
								No properties found.
							</div>
						) : (
							<div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
								{filteredProperties.map(
									(property, index) => (
										<div
											key={property._id}
											className="overflow-hidden rounded-xl bg-white shadow-sm transition ease-in-out duration-500 hover:-translate-y-1 hover:shadow-xl"
											data-aos="fade-up"
											data-aos-delay={index * 100}
										>
											<div className="relative h-64 overflow-hidden">
												<img
													src={property.image}
													alt={property.title}
													className="h-full w-full object-cover transition ease-in-out duration-500 hover:scale-105"
												/>

												<div className="absolute left-4 top-4 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold uppercase text-white">
													{property.category}
												</div>
											</div>

											<div className="p-6">
												<div className="flex items-start justify-between gap-4">
													<h3 className="text-xl font-bold text-gray-900">
														{property.title}
													</h3>

													<p className="shrink-0 text-lg font-bold text-primary">
														{formatPrice(
															property.price
														)}
													</p>
												</div>

												<div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
													<FiMapPin className="shrink-0 text-secondary" />
													<span>
														{property.location}
													</span>
												</div>

												<div className="mt-5 flex items-center gap-5 border-t border-gray-100 pt-5 text-sm text-gray-500">
													<div className="flex items-center gap-2">
														<MdBed className="text-lg text-primary" />
														<span>
															{property.bedrooms} Beds
														</span>
													</div>

													<div className="flex items-center gap-2">
														<MdBathtub className="text-lg text-primary" />
														<span>
															{property.bathrooms} Baths
														</span>
													</div>
												</div>

												<Link
													to={`/properties/${property._id}`}
													className="mt-6 block rounded-md bg-primary px-5 py-3 text-center text-sm font-semibold text-white transition ease-in-out duration-500 hover:bg-secondary"
												>
													View Details
												</Link>
											</div>
										</div>
									)
								)}
							</div>
						)}

						<div
							className="mt-10 text-center"
							data-aos="fade-up"
						>
							<Link
								to="/properties"
								className="inline-block rounded-md border-2 border-primary px-7 py-3 text-sm font-semibold text-primary transition ease-in-out duration-500 hover:bg-primary hover:text-white"
							>
								See More Properties
							</Link>
						</div>
					</>
				)}
			</div>
		</section>
	);
}

export default PropertyListings;