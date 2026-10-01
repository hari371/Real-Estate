import { useEffect, useState } from "react";
import { FiEdit, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import {
	getAgents,
	createAgent,
	updateAgent,
	deleteAgent
} from "../../services/agentService";

function AdminAgents() {
	const [agents, setAgents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [editingAgent, setEditingAgent] = useState(null);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		description: "",
		image: ""
	});

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

	const handleChange = (event) => {
		const { name, value, files } = event.target;

		setFormData((previous) => ({
			...previous,
			[name]: files ? files[0] : value
		}));
	};

	const resetForm = () => {
		setFormData({
			name: "",
			email: "",
			phone: "",
			description: "",
			image: ""
		});

		setEditingAgent(null);
		setIsFormOpen(false);
	};

	const handleEdit = (agent) => {
		setEditingAgent(agent);

		setFormData({
			name: agent.name,
			email: agent.email,
			phone: agent.phone,
			description: agent.description,
			image: ""
		});

		setIsFormOpen(true);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		setIsSubmitting(true);
		setError("");

		try {
			const data = new FormData();

			data.append("name", formData.name);
			data.append("email", formData.email);
			data.append("phone", formData.phone);
			data.append("description", formData.description);

			if (formData.image) {
				data.append("image", formData.image);
			}

			const token = localStorage.getItem("token");

			if (editingAgent) {
				await updateAgent(
					editingAgent._id,
					data,
					token
				);
			} else {
				await createAgent(data, token);
			}

			const response = await getAgents();

			setAgents(
				response.data.agents ||
				response.data
			);

			resetForm();
		} catch (error) {
			console.error(error);

			setError(
				error.response?.data?.message ||
				"Failed to save agent."
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDelete = async (id) => {
		const confirmed = window.confirm(
			"Are you sure you want to delete this agent?"
		);

		if (!confirmed) {
			return;
		}

		try {
			const token = localStorage.getItem("token");

			await deleteAgent(id, token);

			setAgents((previous) =>
				previous.filter((agent) => agent._id !== id)
			);
		} catch (error) {
			console.error(error);

			setError(
				error.response?.data?.message ||
				"Failed to delete agent."
			);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 p-6 md:p-10">
			<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div>
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
						Admin Panel
					</p>

					<h1 className="mt-2 text-3xl font-bold text-gray-900">
						Agents
					</h1>

					<p className="mt-2 text-gray-500">
						Manage your real estate agents.
					</p>
				</div>

				<button
					type="button"
					onClick={() => {
						setEditingAgent(null);
						setFormData({
							name: "",
							email: "",
							phone: "",
							description: "",
							image: ""
						});
						setIsFormOpen(true);
					}}
					className="flex w-fit items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white transition ease-in-out duration-500 hover:bg-secondary"
				>
					<FiPlus />
					Add Agent
				</button>
			</div>

			{error && (
				<div className="mt-6 rounded-md bg-red-100 px-4 py-3 text-sm text-red-700">
					{error}
				</div>
			)}

			{loading ? (
				<div className="mt-10 text-center text-gray-500">
					Loading agents...
				</div>
			) : (
				<div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
					{agents.map((agent) => (
						<div
							key={agent._id}
							className="overflow-hidden rounded-xl bg-white shadow-sm transition ease-in-out duration-500 hover:-translate-y-1 hover:shadow-lg"
						>
							<div className="h-64 bg-gray-200">
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

							<div className="p-6">
								<h2 className="text-xl font-bold text-gray-900">
									{agent.name}
								</h2>

								<p className="mt-2 text-sm text-gray-500">
									{agent.email}
								</p>

								<p className="mt-1 text-sm text-gray-500">
									{agent.phone}
								</p>

								<p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
									{agent.description}
								</p>

								<div className="mt-6 flex gap-3">
									<button
										type="button"
										onClick={() => handleEdit(agent)}
										className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition ease-in-out duration-500 hover:bg-secondary"
									>
										<FiEdit />
										Edit
									</button>

									<button
										type="button"
										onClick={() => handleDelete(agent._id)}
										className="flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white transition ease-in-out duration-500 hover:bg-red-600"
									>
										<FiTrash2 />
										Delete
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}

			{isFormOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
					<div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
						<div className="flex items-center justify-between">
							<h2 className="text-2xl font-bold text-gray-900">
								{editingAgent ? "Edit Agent" : "Add Agent"}
							</h2>

							<button
								type="button"
								onClick={resetForm}
								className="text-2xl text-gray-500 transition ease-in-out duration-500 hover:text-secondary"
							>
								<FiX />
							</button>
						</div>

						<form
							onSubmit={handleSubmit}
							className="mt-6 space-y-5"
						>
							<div>
								<label className="mb-2 block text-sm font-medium text-gray-700">
									Name
								</label>

								<input
									type="text"
									name="name"
									value={formData.name}
									onChange={handleChange}
									required
									className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-primary"
								/>
							</div>

							<div className="grid gap-5 md:grid-cols-2">
								<div>
									<label className="mb-2 block text-sm font-medium text-gray-700">
										Email
									</label>

									<input
										type="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										required
										className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-primary"
									/>
								</div>

								<div>
									<label className="mb-2 block text-sm font-medium text-gray-700">
										Phone
									</label>

									<input
										type="text"
										name="phone"
										value={formData.phone}
										onChange={handleChange}
										required
										className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-primary"
									/>
								</div>
							</div>

							<div>
								<label className="mb-2 block text-sm font-medium text-gray-700">
									Description
								</label>

								<textarea
									name="description"
									value={formData.description}
									onChange={handleChange}
									required
									rows="5"
									className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-primary"
								/>
							</div>

							<div>
								<label className="mb-2 block text-sm font-medium text-gray-700">
									Agent Image
								</label>

								<input
									type="file"
									name="image"
									accept="image/*"
									onChange={handleChange}
									className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm"
								/>

								{editingAgent && (
									<p className="mt-2 text-xs text-gray-500">
										Leave empty to keep the current image.
									</p>
								)}
							</div>

							<div className="flex justify-end gap-3 pt-2">
								<button
									type="button"
									onClick={resetForm}
									className="rounded-md bg-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition ease-in-out duration-500 hover:bg-gray-300"
								>
									Cancel
								</button>

								<button
									type="submit"
									disabled={isSubmitting}
									className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white transition ease-in-out duration-500 hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60"
								>
									{isSubmitting
										? "Saving..."
										: editingAgent
											? "Update Agent"
											: "Add Agent"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}

export default AdminAgents;