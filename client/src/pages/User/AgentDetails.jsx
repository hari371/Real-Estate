import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { getAgentById } from "../../services/agentService";
import { getProperties } from "../../services/propertyService";

function AgentDetails() {
	const { id } = useParams();

	const [agent, setAgent] = useState(null);
	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const loadAgentData = async () => {
			try {
				const [agentResponse, propertiesResponse] =
					await Promise.all([
						getAgentById(id),
						getProperties()
					]);

				setAgent(
					agentResponse.data.agent ||
					agentResponse.data
				);

				const allProperties =
					propertiesResponse.data.properties ||
					propertiesResponse.data;

				setProperties(
					allProperties.filter(
						(property) =>
							property.agent?._id === id ||
							property.agent === id
					)
				);
			} catch (error) {
				console.error(error);
				setError("Failed to load agent details.");
			} finally {
				setLoading(false);
			}
		};

		loadAgentData();
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
					Loading agent details...
				</p>
			</div>
		);
	}

	if (error || !agent) {
		return (
			<div className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-6">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-gray-900">
						Agent Not Found
					</h1>

					<p className="mt-3 text-gray-500">
						{error || "The requested agent could not be found."}
					</p>

					<Link
						to="/agents"
						className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white transition ease-in-out duration-500 hover:bg-secondary"
					>
						<FiArrowLeft />
						Back to Agents
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
						to="/agents"
						className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition ease-in-out duration-500 hover:text-secondary"
					>
						<FiArrowLeft />
						Back to Agents
					</Link>

					<div className="mt-8">
						<p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
							Real Estate Agent
						</p>

						<h1 className="mt-2 text-3xl font-bold text-white md:text-5xl">
							{agent.name}
						</h1>
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-7xl px-6 py-12">
				<div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
					<div
						className="overflow-hidden rounded-xl bg-white shadow-sm"
						data-aos="fade-up"
					>
						<div className="h-113 bg-gray-200">
							{agent.image ? (
								<img
									src={agent.image}
									alt={agent.name}
									className="h-full w-full object-cover"
								/>
							) : (
								<div className="flex h-full items-center justify-center text-gray-400">
									No Image
								</div>
							)}
						</div>
					</div>

					<div data-aos="fade-up">
						<div className="rounded-xl bg-white p-6 shadow-sm md:p-8">
							<h2 className="text-2xl font-bold text-gray-900">
								About {agent.name}
							</h2>

							<p className="mt-5 leading-8 text-gray-600">
								{agent.description}
							</p>

							<div className="mt-8 space-y-4">
								<div className="flex items-center gap-4 rounded-lg bg-gray-50 p-4">
									<div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-lg text-white">
										<FiMail />
									</div>

									<div>
										<p className="text-xs text-gray-500">
											Email
										</p>

										<p className="mt-1 font-medium text-gray-900">
											{agent.email}
										</p>
									</div>
								</div>

								<div className="flex items-center gap-4 rounded-lg bg-gray-50 p-4">
									<div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-lg text-white">
										<FiPhone />
									</div>

									<div>
										<p className="text-xs text-gray-500">
											Phone
										</p>

										<p className="mt-1 font-medium text-gray-900">
											{agent.phone}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div
					className="mt-12"
					data-aos="fade-up"
				>
					<div className="flex items-end justify-between gap-4">
						<div>
							<p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
								Agent Listings
							</p>

							<h2 className="mt-2 text-3xl font-bold text-gray-900">
								Properties by {agent.name}
							</h2>
						</div>

						<div className="hidden items-center gap-2 text-sm text-gray-500 sm:flex">
							<FiMapPin />
							<span>{properties.length} Properties</span>
						</div>
					</div>

					{properties.length === 0 ? (
						<div className="mt-8 rounded-xl bg-white p-10 text-center shadow-sm">
							<p className="text-gray-500">
								This agent currently has no assigned properties.
							</p>
						</div>
					) : (
						<div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
							{properties.map((property) => (
								<div
									key={property._id}
									className="overflow-hidden rounded-xl bg-white shadow-sm transition ease-in-out duration-500 hover:-translate-y-1 hover:shadow-xl"
								>
									<div className="h-56 overflow-hidden">
										<img
											src={property.image}
											alt={property.title}
											className="h-full w-full object-cover transition ease-in-out duration-500 hover:scale-105"
										/>
									</div>

									<div className="p-6">
										<p className="text-xs font-semibold uppercase text-primary">
											{property.category}
										</p>

										<h3 className="mt-2 text-xl font-bold text-gray-900">
											{property.title}
										</h3>

										<p className="mt-2 text-sm text-gray-500">
											{property.location}
										</p>

										<p className="mt-3 text-lg font-bold text-primary">
											{formatPrice(property.price)}
										</p>

										<Link
											to={`/properties/${property._id}`}
											className="mt-5 block rounded-md bg-primary px-5 py-3 text-center text-sm font-semibold text-white transition ease-in-out duration-500 hover:bg-secondary"
										>
											View Property
										</Link>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</section>
		</div>
	);
}

export default AgentDetails;