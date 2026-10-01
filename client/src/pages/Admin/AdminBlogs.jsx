import { useEffect, useState } from "react";
import { FiEdit, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import {
	getBlogs,
	createBlog,
	updateBlog,
	deleteBlog
} from "../../services/blogService";

function AdminBlogs() {
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [editingBlog, setEditingBlog] = useState(null);

	const [formData, setFormData] = useState({
		title: "",
		description: "",
		author: "",
		image: ""
	});

	useEffect(() => {
		const loadBlogs = async () => {
			try {
				const response = await getBlogs();

				setBlogs(
					response.data.blogs ||
					response.data
				);
			} catch (error) {
				console.error(error);
				setError("Failed to load blogs.");
			} finally {
				setLoading(false);
			}
		};

		loadBlogs();
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
			title: "",
			description: "",
			author: "",
			image: ""
		});

		setEditingBlog(null);
		setIsFormOpen(false);
	};

	const handleEdit = (blog) => {
		setEditingBlog(blog);

		setFormData({
			title: blog.title,
			description: blog.description,
			author: blog.author,
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

			data.append("title", formData.title);
			data.append("description", formData.description);
			data.append("author", formData.author);

			if (formData.image) {
				data.append("image", formData.image);
			}

			const token = localStorage.getItem("token");

			if (editingBlog) {
				await updateBlog(
					editingBlog._id,
					data,
					token
				);
			} else {
				await createBlog(data, token);
			}

			const response = await getBlogs();

			setBlogs(
				response.data.blogs ||
				response.data
			);

			resetForm();
		} catch (error) {
			console.error(error);

			setError(
				error.response?.data?.message ||
				"Failed to save blog."
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDelete = async (id) => {
		const confirmed = window.confirm(
			"Are you sure you want to delete this blog?"
		);

		if (!confirmed) {
			return;
		}

		try {
			const token = localStorage.getItem("token");

			await deleteBlog(id, token);

			setBlogs((previous) =>
				previous.filter((blog) => blog._id !== id)
			);
		} catch (error) {
			console.error(error);

			setError(
				error.response?.data?.message ||
				"Failed to delete blog."
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
						Blogs
					</h1>

					<p className="mt-2 text-gray-500">
						Manage your real estate blogs.
					</p>
				</div>

				<button
					type="button"
					onClick={() => {
						setEditingBlog(null);
						setFormData({
							title: "",
							description: "",
							author: "",
							image: ""
						});
						setIsFormOpen(true);
					}}
					className="flex w-fit items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white transition ease-in-out duration-500 hover:bg-secondary"
				>
					<FiPlus />
					Add Blog
				</button>
			</div>

			{error && (
				<div className="mt-6 rounded-md bg-red-100 px-4 py-3 text-sm text-red-700">
					{error}
				</div>
			)}

			{loading ? (
				<div className="mt-10 text-center text-gray-500">
					Loading blogs...
				</div>
			) : (
				<div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
					{blogs.map((blog) => (
						<div
							key={blog._id}
							className="overflow-hidden rounded-xl bg-white shadow-sm transition ease-in-out duration-500 hover:-translate-y-1 hover:shadow-lg"
						>
							<div className="h-56 bg-gray-200">
								<img
									src={blog.image}
									alt={blog.title}
									className="h-full w-full object-cover"
								/>
							</div>

							<div className="p-6">
								<p className="text-sm font-medium text-primary">
									{blog.author}
								</p>

								<h2 className="mt-2 text-xl font-bold text-gray-900">
									{blog.title}
								</h2>

								<p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
									{blog.description}
								</p>

								<div className="mt-6 flex gap-3">
									<button
										type="button"
										onClick={() => handleEdit(blog)}
										className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition ease-in-out duration-500 hover:bg-secondary"
									>
										<FiEdit />
										Edit
									</button>

									<button
										type="button"
										onClick={() => handleDelete(blog._id)}
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
								{editingBlog ? "Edit Blog" : "Add Blog"}
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
									Title
								</label>

								<input
									type="text"
									name="title"
									value={formData.title}
									onChange={handleChange}
									required
									className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-primary"
								/>
							</div>

							<div className="grid gap-5 md:grid-cols-2">
								<div>
									<label className="mb-2 block text-sm font-medium text-gray-700">
										Author
									</label>

									<input
										type="text"
										name="author"
										value={formData.author}
										onChange={handleChange}
										required
										className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-primary"
									/>
								</div>

								<div>
									<label className="mb-2 block text-sm font-medium text-gray-700">
										Blog Image
									</label>

									<input
										type="file"
										name="image"
										accept="image/*"
										onChange={handleChange}
										required={!editingBlog}
										className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm"
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
									rows="7"
									className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-primary"
								/>
							</div>

							{editingBlog && (
								<p className="text-xs text-gray-500">
									Leave the image empty to keep the current image.
								</p>
							)}

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
										: editingBlog
											? "Update Blog"
											: "Add Blog"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}

export default AdminBlogs;