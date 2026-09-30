function BlogDetails() {
	return (
		<>
			<section className="bg-gray-900 py-20">
				<div className="mx-auto max-w-7xl px-6">
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
						Blog Details
					</p>

					<h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
						Blog Article
					</h1>
				</div>
			</section>

			<section className="py-20">
				<div className="mx-auto max-w-4xl px-6">
					<div className="flex min-h-96 items-center justify-center rounded-xl bg-gray-50">
						<p className="text-gray-500">
							Blog details will appear here.
						</p>
					</div>
				</div>
			</section>
		</>
	);
}

export default BlogDetails;