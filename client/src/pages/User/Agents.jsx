import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiPhone } from "react-icons/fi";
import { getAgents } from "../../services/agentService";

function Agents() {
	const [agents, setAgents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const loadAgents = async () => {
			try {
				const response = await getAgents();

				setAgents(
					response.data.agents ||
					response.data
				);
			} catch (error) {
				console.error(error);
				setError("Failed to load agents.");
			} finally {
				setLoading(false);
			}
		};

		loadAgents();
	}, []);

	return (
		<div className="bg-gray-50">
			<section className="bg-gray-900 px-6 py-20">
				<div
					className="mx-auto max-w-7xl text-center"
					data-aos="fade-up"
				>
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
						Our Professionals
					</p>

					<h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
						Meet Our Agents
					</h1>

					<p className="mx-auto mt-4 max-w-2xl text-gray-400">
						Connect with experienced real estate professionals
						who can help you find the right property.
					</p>
				</div>
			</section>

			<section className="mx-auto max-w-7xl px-6 py-12">
				{loading && (
					<div className="py-20 text-center text-gray-500">
						Loading agents...
					</div>
				)}

				{error && (
					<div className="py-20 text-center text-red-500">
						{error}
					</div>
				)}

				{!loading && !error && (
					<>
						{agents.length === 0 ? (
							<div className="py-20 text-center text-gray-500">
								No agents found.
							</div>
						) : (
							<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
								{agents.map((agent, index) => (
									<div
										key={agent._id}
										className="overflow-hidden rounded-xl bg-white shadow-sm transition ease-in-out duration-500 hover:-translate-y-1 hover:shadow-xl"
										data-aos="fade-up"
										data-aos-delay={index * 50}
									>
										<div className="h-72 overflow-hidden bg-gray-200">
											{agent.image ? (
												<img
													src={agent.image}
													alt={agent.name}
													className="h-full w-full object-cover transition ease-in-out duration-500 hover:scale-105"
												/>
											) : (
												<div className="flex h-full items-center justify-center text-gray-400">
													No Image
												</div>
											)}
										</div>

										<div className="p-6">
											<h2 className="text-2xl font-bold text-gray-900">
												{agent.name}
											</h2>

											<p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
												{agent.description}
											</p>

											<div className="mt-5 space-y-3 border-t border-gray-100 pt-5">
												<div className="flex items-center gap-3 text-sm text-gray-500">
													<FiMail className="text-primary" />
													<span>{agent.email}</span>
												</div>

												<div className="flex items-center gap-3 text-sm text-gray-500">
													<FiPhone className="text-primary" />
													<span>{agent.phone}</span>
												</div>
											</div>

											<Link
												to={`/agents/${agent._id}`}
												className="mt-6 block rounded-md bg-primary px-5 py-3 text-center text-sm font-semibold text-white transition ease-in-out duration-500 hover:bg-secondary"
											>
												View Agent
											</Link>
										</div>
									</div>
								))}
							</div>
						)}
					</>
				)}
			</section>
		</div>
	);
}

export default Agents;