import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { getBlogs } from "../../services/blogService";

function Blogs() {
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

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

	return (
		<div className="bg-gray-50">
			<section className="bg-gray-900 px-6 py-20">
				<div
					className="mx-auto max-w-7xl text-center"
					data-aos="fade-up"
				>
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
						Real Estate Insights
					</p>

					<h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
						Our Blogs
					</h1>

					<p className="mx-auto mt-4 max-w-2xl text-gray-400">
						Explore the latest real estate insights, property
						tips, and market information.
					</p>
				</div>
			</section>

			<section className="mx-auto max-w-7xl px-6 py-12">
				{loading && (
					<div className="py-20 text-center text-gray-500">
						Loading blogs...
					</div>
				)}

				{error && (
					<div className="py-20 text-center text-red-500">
						{error}
					</div>
				)}

				{!loading && !error && (
					<>
						{blogs.length === 0 ? (
							<div className="py-20 text-center text-gray-500">
								No blogs found.
							</div>
						) : (
							<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
								{blogs.map((blog, index) => (
									<article
										key={blog._id}
										className="overflow-hidden rounded-xl bg-white shadow-sm transition ease-in-out duration-500 hover:-translate-y-1 hover:shadow-xl"
										data-aos="fade-up"
										data-aos-delay={index * 50}
									>
										<div className="h-64 overflow-hidden bg-gray-200">
											<img
												src={blog.image}
												alt={blog.title}
												className="h-full w-full object-cover transition ease-in-out duration-500 hover:scale-105"
											/>
										</div>

										<div className="p-6">
											<p className="text-sm font-semibold text-primary">
												By {blog.author}
											</p>

											<h2 className="mt-2 text-2xl font-bold text-gray-900">
												{blog.title}
											</h2>

											<p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
												{blog.des}
											</p>

											<Link
												to={`/blogs/${blog._id}`}
												className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white transition ease-in-out duration-500 hover:bg-secondary"
											>
												Read More
												<FiArrowRight />
											</Link>
										</div>
									</article>
								))}
							</div>
						)}
					</>
				)}
			</section>
		</div>
	);
}

export default Blogs;