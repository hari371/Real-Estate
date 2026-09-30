import {
	FaCity,
	FaBuilding,
	FaUmbrellaBeach,
	FaMountain
} from "react-icons/fa";

function StatesSection() {
	const states = [
		{
			name: "New York",
			properties: "120 Properties",
			icon: <FaCity />
		},
		{
			name: "Chicago",
			properties: "85 Properties",
			icon: <FaBuilding />
		},
		{
			name: "Miami",
			properties: "95 Properties",
			icon: <FaUmbrellaBeach />
		},
		{
			name: "Colorado",
			properties: "70 Properties",
			icon: <FaMountain />
		}
	];

	return (
		<section className="bg-gray-50 py-16">
			<div className="mx-auto max-w-7xl px-6">
				<div className="mb-10">
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
						Explore Locations
					</p>

					<h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
						Discover Properties By State
					</h2>
				</div>

				<div className="grid grid-cols-2 gap-5 md:grid-cols-4">
					{states.map((state) => (
						<div
							key={state.name}
							className="group rounded-lg bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
						>
							<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl text-white transition-colors duration-300 group-hover:bg-secondary">
								{state.icon}
							</div>

							<h3 className="mt-5 text-lg font-semibold text-gray-900 transition-colors duration-300 group-hover:text-secondary">
								{state.name}
							</h3>

							<p className="mt-2 text-sm text-gray-500">
								{state.properties}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default StatesSection;