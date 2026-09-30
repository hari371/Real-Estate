import { useState } from "react";

function Properties() {
	const [activeCategory, setActiveCategory] = useState("all");

	const categories = [
		"all",
		"residential",
		"commercial",
		"apartment"
	];

	return (
		<>
			<section className="bg-gray-900 py-20">
				<div className="mx-auto max-w-7xl px-6">
					<p
						data-aos="fade-up"
						className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary"
					>
						Properties
					</p>

					<h1
						data-aos="fade-up"
						data-aos-delay="100"
						className="mt-3 text-4xl font-bold text-white md:text-5xl"
					>
						Find Your Perfect Property
					</h1>

					<p
						data-aos="fade-up"
						data-aos-delay="200"
						className="mt-5 max-w-2xl text-gray-300"
					>
						Explore residential, commercial, and apartment
						properties managed through our platform.
					</p>
				</div>
			</section>

			<section className="py-20">
				<div className="mx-auto max-w-7xl px-6">
					<div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
						<div>
							<p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
								Property Collection
							</p>

							<h2 className="mt-2 text-3xl font-bold text-gray-900">
								Browse Properties
							</h2>
						</div>

						<div className="flex flex-wrap gap-3">
							{categories.map((category) => (
								<button
									key={category}
									type="button"
									onClick={() => setActiveCategory(category)}
									className={`rounded-md px-5 py-2.5 text-sm font-semibold capitalize transition ease-in-out duration-500 ${
										activeCategory === category
											? "bg-primary text-white"
											: "bg-gray-100 text-gray-700 hover:bg-secondary hover:text-white"
									}`}
								>
									{category}
								</button>
							))}
						</div>
					</div>

					<div className="mt-12 flex min-h-80 items-center justify-center rounded-xl bg-gray-50">
						<p className="text-gray-500">
							Properties will appear here.
						</p>
					</div>
				</div>
			</section>
		</>
	);
}

export default Properties;