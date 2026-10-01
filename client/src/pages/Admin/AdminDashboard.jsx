import { useEffect, useState } from "react";
import { FiGrid, FiUsers, FiFileText } from "react-icons/fi";
import { getProperties } from "../../services/propertyService";
import { getAgents } from "../../services/agentService";
import { getBlogs } from "../../services/blogService";

function AdminDashboard() {
	const [stats, setStats] = useState({
		properties: 0,
		agents: 0,
		blogs: 0
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadStats = async () => {
			try {
				const [
					propertiesResponse,
					agentsResponse,
					blogsResponse
				] = await Promise.all([
					getProperties(),
					getAgents(),
					getBlogs()
				]);

				const properties =
					propertiesResponse.data.properties ||
					propertiesResponse.data;

				const agents =
					agentsResponse.data.agents ||
					agentsResponse.data;

				const blogs =
					blogsResponse.data.blogs ||
					blogsResponse.data;

				setStats({
					properties: properties.length,
					agents: agents.length,
					blogs: blogs.length
				});
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		loadStats();
	}, []);

	const statCards = [
		{
			title: "Properties",
			value: stats.properties,
			icon: <FiGrid />
		},
		{
			title: "Agents",
			value: stats.agents,
			icon: <FiUsers />
		},
		{
			title: "Blogs",
			value: stats.blogs,
			icon: <FiFileText />
		}
	];

	return (
		<div className="min-h-screen bg-gray-100 p-6 md:p-10">
			<div>
				<p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
					Admin Panel
				</p>

				<h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
					Dashboard
				</h1>

				<p className="mt-3 text-gray-500">
					Manage your real estate platform from one place.
				</p>
			</div>

			<div className="mt-10 grid gap-6 md:grid-cols-3">
				{statCards.map((stat) => (
					<div
						key={stat.title}
						className="rounded-xl bg-white p-6 shadow-sm transition ease-in-out duration-500 hover:-translate-y-1 hover:shadow-lg"
					>
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-500">
									{stat.title}
								</p>

								<p className="mt-2 text-3xl font-bold text-gray-900">
									{loading ? "..." : stat.value}
								</p>
							</div>

							<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-xl text-white">
								{stat.icon}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default AdminDashboard;