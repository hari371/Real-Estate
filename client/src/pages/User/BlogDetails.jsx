import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiCalendar, FiUser } from "react-icons/fi";
import { getBlogById } from "../../services/blogService";

function BlogDetails() {
	const { id } = useParams();
	const [blog, setBlog] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const loadBlog = async () => {
			try {
				const response = await getBlogById(id);

				setBlog(
					response.data.blog ||
					response.data
				);
			} catch (error) {
				console.error(error);
				setError("Failed to load blog.");
			} finally {
				setLoading(false);
			}
		};

		loadBlog();
	}, [id]);

	if (loading) {
		return (
			<div className="flex min-h-[60vh] items-center justify-center bg-gray-50">
				<p className="text-gray-500">Loading blog...</p>
			</div>
		);
	}

	if (error || !blog) {
		return (
			<div className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-6">
				<div className="text-center">
					<p className="text-red-500">
						{error || "Blog not found."}
					</p>

					<Link
						to="/blogs"
						className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white transition ease-in-out duration-500 hover:bg-secondary"
					>
						<FiArrowLeft />
						Back to Blogs
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-gray-50">
			<section className="bg-gray-900 px-6 py-20">
				<div
					className="mx-auto max-w-4xl"
					data-aos="fade-up"
				>
					<Link
						to="/blogs"
						className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 transition ease-in-out duration-500 hover:text-secondary"
					>
						<FiArrowLeft />
						Back to Blogs
					</Link>

					<p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
						Real Estate Insights
					</p>

					<h1 className="mt-3 text-3xl font-bold leading-tight text-white md:text-5xl">
						{blog.title}
					</h1>

					<div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-gray-400">
						<div className="flex items-center gap-2">
							<FiUser className="text-primary" />
							<span>{blog.author}</span>
						</div>

						<div className="flex items-center gap-2">
							<FiCalendar className="text-primary" />
							<span>
								{new Date(blog.createdAt).toLocaleDateString(
									"en-IN",
									{
										day: "numeric",
										month: "long",
										year: "numeric"
									}
								)}
							</span>
						</div>
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-5xl px-6 py-12">
				<div
					className="overflow-hidden rounded-xl bg-white shadow-sm"
					data-aos="fade-up"
				>
					<img
						src={blog.image}
						alt={blog.title}
						className="h-75 w-full object-cover md:h-125"
					/>

					<div className="p-6 md:p-10">
						<p className="whitespace-pre-line text-base leading-8 text-gray-600 md:text-lg">
							{blog.description}
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}

export default BlogDetails;