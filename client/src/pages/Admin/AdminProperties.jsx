import { useEffect, useState } from "react";
import { FiEdit2, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import { getProperties, createProperty, deleteProperty, updateProperty } from "../../services/propertyService";
import { getAgents } from "../../services/agentService";

function AdminProperties() {
	const [properties, setProperties] = useState([]);
	const [agents, setAgents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("all");

	const [formData, setFormData] = useState({
		title: "",
		category: "residential",
		price: "",
		location: "",
		description: "",
		bedrooms: "",
		bathrooms: "",
		propertyType: "",
		agent: "",
		image: null
	});

	const [editingProperty, setEditingProperty] = useState(null);

	useEffect(() => {
        const loadData = async () => {
            try {
                const [propertiesResponse, agentsResponse] = await Promise.all([
                    getProperties(),
                    getAgents()
                ]);

                setProperties(
                    propertiesResponse.data.properties ||
                    propertiesResponse.data
                );

                setAgents(
                    agentsResponse.data.agents ||
                    agentsResponse.data
                );
            } catch (error) {
                console.error(error);
                setError("Failed to load properties or agents.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormData((currentData) => ({
			...currentData,
			[name]: value
		}));
	};

	const handleImageChange = (event) => {
		setFormData((currentData) => ({
			...currentData,
			image: event.target.files[0]
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsSubmitting(true);
		setError("");

		try {
			const data = new FormData();

			Object.entries(formData).forEach(([key, value]) => {
				if (key === "image") {
					if (value) {
						data.append("image", value);
					}
				} else {
					data.append(key, value);
				}
			});

			const token = localStorage.getItem("token");

			if (editingProperty) {
				await updateProperty(editingProperty._id, data, token);
			} else {
				await createProperty(data, token);
			}

			const response = await getProperties();

			setProperties(
				response.data.properties || response.data
			);

			setFormData({
				title: "",
				category: "residential",
				price: "",
				location: "",
				description: "",
				bedrooms: "",
				bathrooms: "",
				propertyType: "",
				agent: "",
				image: ""
			});

			setEditingProperty(null);
			setIsFormOpen(false);
		} catch (error) {
			console.error(error);

			setError(
				error.response?.data?.message ||
				"Failed to save property."
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDelete = async (id) => {
		const token = localStorage.getItem("token");

		if (!token) {
			setError("Admin login token not found.");
			return;
		}

		const confirmDelete = window.confirm(
			"Are you sure you want to delete this property?"
		);

		if (!confirmDelete) {
			return;
		}

		try {
			await deleteProperty(id, token);

			setProperties((currentProperties) =>
				currentProperties.filter((property) => property._id !== id)
			);
		} catch (error) {
			console.error(error);
			setError(
				error.response?.data?.message ||
				"Failed to delete property."
			);
		}
	};

	const handleEdit = (property) => {
		setEditingProperty(property);

		setFormData({
			title: property.title,
			category: property.category,
			price: property.price,
			location: property.location,
			description: property.description,
			bedrooms: property.bedrooms,
			bathrooms: property.bathrooms,
			propertyType: property.propertyType,
			agent: property.agent?._id || property.agent || "",
			image: ""
		});

		setIsFormOpen(true);
	};

	const filteredProperties = selectedCategory === "all" ? properties : properties.filter(
			(property) => property.category === selectedCategory
		);

	return (
		<div className="min-h-screen bg-gray-100 p-6 md:p-10">
			<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div>
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
						Admin Panel
					</p>

					<h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
						Properties
					</h1>

					<p className="mt-3 text-gray-500">
						Manage all properties from one place.
					</p>
				</div>

				<button
					type="button"
					onClick={() => setIsFormOpen(true)}
					className="flex w-fit items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white transition ease-in-out duration-500 hover:bg-secondary"
				>
					<FiPlus />
					Add Property
				</button>
			</div>

			{error && (
				<div className="mt-6 rounded-md bg-red-50 p-4 text-sm text-red-600">
					{error}
				</div>
			)}

			{isFormOpen && (
				<div className="mt-8 rounded-xl bg-white p-6 shadow-sm md:p-8">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="text-xl font-semibold text-gray-900">
								Add Property
							</h2>

							<p className="mt-1 text-sm text-gray-500">
								Add a new property to your listings.
							</p>
						</div>

						<button
							type="button"
							onClick={() => setIsFormOpen(false)}
							className="rounded-md p-2 text-gray-500 transition ease-in-out duration-500 hover:bg-gray-100 hover:text-gray-900"
						>
							<FiX />
						</button>
					</div>

					<form
						onSubmit={handleSubmit}
						className="mt-8 grid gap-6 md:grid-cols-2"
					>
						<div>
							<label className="mb-2 block text-sm font-medium text-gray-700">
								Title
							</label>

							<input
								type="text"
								name="title"
								value={formData.title}
								onChange={handleChange}
								required
								placeholder="Enter property title"
								className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition ease-in-out duration-500 focus:border-primary"
							/>
						</div>

						<div>
							<label className="mb-2 block text-sm font-medium text-gray-700">
								Category
							</label>

							<select
								name="category"
								value={formData.category}
								onChange={handleChange}
								className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition ease-in-out duration-500 focus:border-primary"
							>
								<option value="residential">
									Residential
								</option>
								<option value="commercial">
									Commercial
								</option>
								<option value="apartment">
									Apartment
								</option>
							</select>
						</div>

						<div>
							<label className="mb-2 block text-sm font-medium text-gray-700">
								Price
							</label>

							<input
								type="number"
								name="price"
								value={formData.price}
								onChange={handleChange}
								required
								min="0"
								placeholder="Enter price"
								className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition ease-in-out duration-500 focus:border-primary"
							/>
						</div>

						<div>
							<label className="mb-2 block text-sm font-medium text-gray-700">
								Location
							</label>

							<input
								type="text"
								name="location"
								value={formData.location}
								onChange={handleChange}
								required
								placeholder="Enter location"
								className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition ease-in-out duration-500 focus:border-primary"
							/>
						</div>

						<div>
							<label className="mb-2 block text-sm font-medium text-gray-700">
								Bedrooms
							</label>

							<input
								type="number"
								name="bedrooms"
								value={formData.bedrooms}
								onChange={handleChange}
								required
								min="0"
								placeholder="Number of bedrooms"
								className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition ease-in-out duration-500 focus:border-primary"
							/>
						</div>

						<div>
							<label className="mb-2 block text-sm font-medium text-gray-700">
								Bathrooms
							</label>

							<input
								type="number"
								name="bathrooms"
								value={formData.bathrooms}
								onChange={handleChange}
								required
								min="0"
								placeholder="Number of bathrooms"
								className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition ease-in-out duration-500 focus:border-primary"
							/>
						</div>

						<div>
							<label className="mb-2 block text-sm font-medium text-gray-700">
								Property Type
							</label>

							<input
								type="text"
								name="propertyType"
								value={formData.propertyType}
								onChange={handleChange}
								required
								placeholder="e.g. Villa, Office, Flat"
								className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition ease-in-out duration-500 focus:border-primary"
							/>
						</div>

						<div>
							<label className="mb-2 block text-sm font-medium text-gray-700">
								Agent
							</label>

							<select
								name="agent"
								value={formData.agent}
								onChange={handleChange}
								required
								className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition ease-in-out duration-500 focus:border-primary"
							>
								<option value="">
									Select an agent
								</option>

								{agents.map((agent) => (
									<option
										key={agent._id}
										value={agent._id}
									>
										{agent.name}
									</option>
								))}
							</select>
						</div>

						<div className="md:col-span-2">
							<label className="mb-2 block text-sm font-medium text-gray-700">
								Description
							</label>

							<textarea
								name="description"
								value={formData.description}
								onChange={handleChange}
								required
								rows="5"
								placeholder="Enter property description"
								className="w-full resize-none rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition ease-in-out duration-500 focus:border-primary"
							/>
						</div>

						<div className="md:col-span-2">
							<label className="mb-2 block text-sm font-medium text-gray-700">
								Property Image
							</label>

							<input
								type="file"
								accept="image/*"
								onChange={handleImageChange}
								className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm"
							/>
						</div>

						<div className="flex gap-3 md:col-span-2">
							<button
								type="submit"
								disabled={isSubmitting}
								className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition ease-in-out duration-500 hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60"
							>
								{isSubmitting
									? "Adding Property..."
									: "Add Property"}
							</button>

							<button
								type="button"
								onClick={() => setIsFormOpen(false)}
								className="rounded-md bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-700 transition ease-in-out duration-500 hover:bg-gray-200"
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			)}

			<div className="mb-6 flex flex-wrap gap-3">
				{[
					{ label: "All", value: "all" },
					{ label: "Residential", value: "residential" },
					{ label: "Commercial", value: "commercial" },
					{ label: "Apartment", value: "apartment" }
				].map((category) => (
					<button
						key={category.value}
						type="button"
						onClick={() => setSelectedCategory(category.value)}
						className={`rounded-md px-5 py-2.5 text-sm font-semibold transition ease-in-out duration-500 ${
							selectedCategory === category.value
								? "bg-primary text-white"
								: "bg-white text-gray-600 hover:bg-secondary hover:text-white"
						}`}
					>
						{category.label}
					</button>
				))}
			</div>

			<div className="mt-10 rounded-xl bg-white p-6 shadow-sm">
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-semibold text-gray-900">
						Property Listings
					</h2>

					<p className="text-sm text-gray-500">
						{properties.length} Properties
					</p>
				</div>

				{loading ? (
					<div className="py-16 text-center text-gray-500">
						Loading properties...
					</div>
				) : properties.length === 0 ? (
					<div className="py-16 text-center text-gray-500">
						No properties found.
					</div>
				) : (
					<div className="mt-6 overflow-x-auto">
						<table className="w-full min-w-200 text-left">
							<thead>
								<tr className="border-b border-gray-200 text-sm text-gray-500">
									<th className="px-4 py-4 font-medium">
										Property
									</th>
									<th className="px-4 py-4 font-medium">
										Category
									</th>
									<th className="px-4 py-4 font-medium">
										Location
									</th>
									<th className="px-4 py-4 font-medium">
										Price
									</th>
									<th className="px-4 py-4 font-medium">
										Agent
									</th>
									<th className="px-4 py-4 font-medium">
										Actions
									</th>
								</tr>
							</thead>

							<tbody>
								{filteredProperties.map((property) => (
									<tr
										key={property._id}
										className="border-b border-gray-100 transition ease-in-out duration-500 hover:bg-gray-50"
									>
										<td className="px-4 py-4">
											<div className="flex items-center gap-4">
												<img
													src={property.image}
													alt={property.title}
													className="h-14 w-20 rounded-md object-cover"
												/>

												<div>
													<p className="font-semibold text-gray-900">
														{property.title}
													</p>

													<p className="mt-1 text-sm text-gray-500">
														{property.propertyType}
													</p>
												</div>
											</div>
										</td>

										<td className="px-4 py-4 text-sm capitalize text-gray-600">
											{property.category}
										</td>

										<td className="px-4 py-4 text-sm text-gray-600">
											{property.location}
										</td>

										<td className="px-4 py-4 text-sm font-semibold text-gray-900">
											₹{property.price.toLocaleString()}
										</td>

										<td className="px-4 py-4 text-sm text-gray-600">
											{property.agent?.name || "No agent"}
										</td>

										<td className="px-4 py-4">
											<div className="flex items-center gap-2">
												<button
													type="button"
													className="rounded-md bg-gray-100 p-2 text-gray-600 transition ease-in-out duration-500 hover:bg-primary hover:text-white"
													title="Edit property"
													onClick={() => handleEdit(property)}
												>
													<FiEdit2 />
												</button>

												<button
													type="button"
													onClick={() =>
														handleDelete(property._id)
													}
													className="rounded-md bg-gray-100 p-2 text-gray-600 transition ease-in-out duration-500 hover:bg-red-500 hover:text-white"
													title="Delete property"
												>
													<FiTrash2 />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
}

export default AdminProperties;