import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import apartment from "../assets/hero-2.jpg";
import villa from "../assets/hero-3.jpg";
import residential from "../assets/hero-1.avif";

function Hero() {
	const slides = [
		{
			image: apartment,
			title: "Find Your Perfect Home",
			description:
				"Discover beautiful properties designed for the way you want to live."
		},
		{
			image: villa,
			title: "A Place You'll Love",
			description:
				"Explore premium homes in locations that match your lifestyle."
		},
		{
			image: residential,
			title: "Your Next Chapter Starts Here",
			description:
				"Find a property that feels like home."
		}
	];

	return (
		<section className="relative">
			<Swiper
				modules={[Autoplay, Pagination]}
				autoplay={{
					delay: 5000,
					disableOnInteraction: false
				}}
				pagination={{
					clickable: true
				}}
				loop={true}
				className="h-150"
			>
				{slides.map((slide, index) => (
					<SwiperSlide key={index}>
						<div className="relative h-full">
							<img
								src={slide.image}
								alt={slide.title}
								className="h-full w-full object-cover"
							/>

							<div className="absolute inset-0 bg-black/40" />

							<div className="absolute inset-0 flex items-center">
								<div className="mx-auto w-full max-w-7xl px-6">
									<div className="max-w-2xl text-white">
										<p className="mb-4 text-sm font-medium uppercase tracking-[0.3em]">
											Real Estate
										</p>

										<h1 className="text-5xl font-bold leading-tight md:text-6xl">
											{slide.title}
										</h1>

										<p className="mt-6 max-w-xl text-lg leading-8 text-gray-200">
											{slide.description}
										</p>

										<button
											type="button"
											className="mt-8 bg-primary px-7 py-3 text-sm font-semibold text-white rounded-lg transition ease-in-out duration-500 hover:bg-secondary"
										>
											Explore Properties
										</button>
									</div>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
}

export default Hero;