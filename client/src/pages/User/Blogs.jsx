function Blogs() {
	return (
		<>
			<section className="bg-gray-900 py-20">
				<div className="mx-auto max-w-7xl px-6">
					<p
						data-aos="fade-up"
						className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary"
					>
						Our Blog
					</p>

					<h1
						data-aos="fade-up"
						data-aos-delay="100"
						className="mt-3 text-4xl font-bold text-white md:text-5xl"
					>
						Latest News & Insights
					</h1>

					<p
						data-aos="fade-up"
						data-aos-delay="200"
						className="mt-5 max-w-2xl text-gray-300"
					>
						Stay updated with real estate news, market insights,
						and helpful property advice.
					</p>
				</div>
			</section>

			<section className="py-20">
				<div className="mx-auto max-w-7xl px-6">
					<div className="mb-12">
						<p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
							Latest Articles
						</p>

						<h2 className="mt-2 text-3xl font-bold text-gray-900">
							From Our Blog
						</h2>
					</div>

					<div className="flex min-h-80 items-center justify-center rounded-xl bg-gray-50">
						<p className="text-gray-500">
							Blogs will appear here.
						</p>
					</div>
				</div>
			</section>
		</>
	);
}

export default Blogs;