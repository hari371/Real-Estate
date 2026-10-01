import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiMapPin, FiUser } from "react-icons/fi";
import { MdBathtub, MdBed, MdHome } from "react-icons/md";
import { getPropertyById } from "../../services/propertyService";

function PropertyDetails() {
	const { id } = useParams();

	const [property, setProperty] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const loadProperty = async () => {
			try {
				const response = await getPropertyById(id);

				setProperty(
					response.data.property ||
					response.data
				);
			} catch (error) {
				console.error(error);
				setError("Failed to load property details.");
			} finally {
				setLoading(false);
			}
		};

		loadProperty();
	}, [id]);

	const formatPrice = (price) => {
		return new Intl.NumberFormat("en-IN", {
			style: "currency",
			currency: "INR",
			maximumFractionDigits: 0
		}).format(price);
	};

	if (loading) {
		return (
			<div className="flex min-h-[70vh] items-center justify-center bg-gray-50">
				<p className="text-gray-500">
					Loading property details...
				</p>
			</div>
		);
	}

	if (error || !property) {
		return (
			<div className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-6">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-gray-900">
						Property Not Found
					</h1>

					<p className="mt-3 text-gray-500">
						{error || "The requested property could not be found."}
					</p>

					<Link
						to="/properties"
						className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white transition ease-in-out duration-500 hover:bg-secondary"
					>
						<FiArrowLeft />
						Back to Properties
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-gray-50">
			<section className="bg-gray-900 px-6 py-16">
				<div
					className="mx-auto max-w-7xl"
					data-aos="fade-up"
				>
					<Link
						to="/properties"
						className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition ease-in-out duration-500 hover:text-secondary"
					>
						<FiArrowLeft />
						Back to Properties
					</Link>

					<div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
						<div>
							<p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
								{property.category}
							</p>

							<h1 className="mt-2 text-3xl font-bold text-white md:text-5xl">
								{property.title}
							</h1>

							<div className="mt-4 flex items-center gap-2 text-gray-400">
								<FiMapPin className="text-secondary" />
								<span>{property.location}</span>
							</div>
						</div>

						<p className="text-2xl font-bold text-primary md:text-3xl">
							{formatPrice(property.price)}
						</p>
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-7xl px-6 py-12">
				<div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
					<div>
						<div
							className="overflow-hidden rounded-xl bg-white shadow-sm"
							data-aos="fade-up"
						>
							<img
								src={property.image}
								alt={property.title}
								className="h-100 w-full object-cover md:h-140"
							/>
						</div>

						<div
							className="mt-8 rounded-xl bg-white p-6 shadow-sm md:p-8"
							data-aos="fade-up"
						>
							<h2 className="text-2xl font-bold text-gray-900">
								Property Description
							</h2>

							<p className="mt-5 leading-8 text-gray-600">
								{property.description}
							</p>
						</div>
					</div>

					<div className="space-y-6">
						<div
							className="rounded-xl bg-white p-6 shadow-sm"
							data-aos="fade-up"
						>
							<h2 className="text-xl font-bold text-gray-900">
								Property Information
							</h2>

							<div className="mt-6 grid grid-cols-2 gap-5">
								<div className="rounded-lg bg-gray-50 p-4">
									<MdHome className="text-xl text-primary" />

									<p className="mt-2 text-xs text-gray-500">
										Property Type
									</p>

									<p className="mt-1 font-semibold text-gray-900">
										{property.propertyType}
									</p>
								</div>

								<div className="rounded-lg bg-gray-50 p-4">
									<MdBed className="text-xl text-primary" />

									<p className="mt-2 text-xs text-gray-500">
										Bedrooms
									</p>

									<p className="mt-1 font-semibold text-gray-900">
										{property.bedrooms}
									</p>
								</div>

								<div className="rounded-lg bg-gray-50 p-4">
									<MdBathtub className="text-xl text-primary" />

									<p className="mt-2 text-xs text-gray-500">
										Bathrooms
									</p>

									<p className="mt-1 font-semibold text-gray-900">
										{property.bathrooms}
									</p>
								</div>

								<div className="rounded-lg bg-gray-50 p-4">
									<FiMapPin className="text-xl text-primary" />

									<p className="mt-2 text-xs text-gray-500">
										Location
									</p>

									<p className="mt-1 font-semibold text-gray-900">
										{property.location}
									</p>
								</div>
							</div>
						</div>

						{property.agent && (
							<div
								className="rounded-xl bg-white p-6 shadow-sm"
								data-aos="fade-up"
							>
								<h2 className="text-xl font-bold text-gray-900">
									Property Agent
								</h2>

								<div className="mt-5 flex items-center gap-4">
									<div className="h-16 w-16 overflow-hidden rounded-full bg-gray-200">
										{property.agent.image ? (
											<img
												src={property.agent.image}
												alt={property.agent.name}
												className="h-full w-full object-cover"
											/>
										) : (
											<div className="flex h-full items-center justify-center">
												<FiUser className="text-2xl text-gray-400" />
											</div>
										)}
									</div>

									<div>
										<h3 className="font-bold text-gray-900">
											{property.agent.name}
										</h3>

										<p className="mt-1 text-sm text-gray-500">
											{property.agent.email}
										</p>
									</div>
								</div>

								<Link
									to={`/agents/${property.agent._id}`}
									className="mt-5 block rounded-md bg-primary px-5 py-3 text-center text-sm font-semibold text-white transition ease-in-out duration-500 hover:bg-secondary"
								>
									View Agent
								</Link>
							</div>
						)}
					</div>
				</div>
			</section>
		</div>
	);
}

export default PropertyDetails;