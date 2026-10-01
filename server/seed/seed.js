require("dotenv").config();

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const connectDB = require("../src/config/db");
const uploadToCloudinary = require("../src/utils/uploadToCloudinary");

const Agent = require("../src/models/Agent");
const Property = require("../src/models/Property");
const Blog = require("../src/models/Blog");

const findImage = (folderPath, fileName) => {
	const extensions = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

	for (const extension of extensions) {
		const filePath = path.join(
			folderPath,
			`${fileName}${extension}`
		);

		if (fs.existsSync(filePath)) {
			return filePath;
		}
	}

	throw new Error(
		`Image not found: ${path.join(folderPath, fileName)}`
	);
};

const uploadLocalImage = async (filePath, folder) => {
	const fileBuffer = fs.readFileSync(filePath);

	const result = await uploadToCloudinary(
		fileBuffer,
		folder
	);

	return result.secure_url;
};

const seedDatabase = async () => {
	try {
		await connectDB();

		console.log("Clearing existing data...");

		await Property.deleteMany({});
		await Agent.deleteMany({});
		await Blog.deleteMany({});

		console.log("Existing data cleared.");

		const agentsFolder = "C:\\Users\\91700\\Downloads\\agents";
		const commercialFolder = "C:\\Users\\91700\\Downloads\\comercial";
		const residentialFolder = "C:\\Users\\91700\\Downloads\\resident";
		const apartmentFolder = "C:\\Users\\91700\\Downloads\\appartment";

		console.log("Uploading agent images...");

		const agentImages = [];

		for (let i = 1; i <= 5; i++) {
			const imagePath = findImage(
				agentsFolder,
				`agent${i}`
			);

			const imageUrl = await uploadLocalImage(
				imagePath,
				"real-estate/agents"
			);

			agentImages.push(imageUrl);

			console.log(`Agent image ${i} uploaded.`);
		}

		const agents = await Agent.insertMany([
			{
				name: "Rahul Sharma",
				email: "rahul@realestate.com",
				phone: "+91 98765 43210",
				description: "Experienced real estate consultant specializing in residential properties.",
				image: agentImages[0]
			},
			{
				name: "Priya Mehta",
				email: "priya@realestate.com",
				phone: "+91 98765 43211",
				description: "Property advisor helping clients find modern homes and apartments.",
				image: agentImages[1]
			},
			{
				name: "Arjun Patel",
				email: "arjun@realestate.com",
				phone: "+91 98765 43212",
				description: "Commercial property specialist with extensive market experience.",
				image: agentImages[2]
			},
			{
				name: "Neha Verma",
				email: "neha@realestate.com",
				phone: "+91 98765 43213",
				description: "Residential property expert focused on premium homes and villas.",
				image: agentImages[3]
			},
			{
				name: "Vikram Singh",
				email: "vikram@realestate.com",
				phone: "+91 98765 43214",
				description: "Real estate advisor specializing in investment and commercial properties.",
				image: agentImages[4]
			}
		]);

		console.log(`${agents.length} agents created.`);

		console.log("Uploading residential images...");

		const residentialImages = [];

		for (let i = 1; i <= 9; i++) {
			const imagePath = findImage(
				residentialFolder,
				`resident${i}`
			);

			const imageUrl = await uploadLocalImage(
				imagePath,
				"real-estate/properties"
			);

			residentialImages.push(imageUrl);

			console.log(`Residential image ${i} uploaded.`);
		}

		console.log("Uploading commercial images...");

		const commercialImages = [];

		for (let i = 1; i <= 6; i++) {
			const imagePath = findImage(
				commercialFolder,
				`comercial${i}`
			);

			const imageUrl = await uploadLocalImage(
				imagePath,
				"real-estate/properties"
			);

			commercialImages.push(imageUrl);

			console.log(`Commercial image ${i} uploaded.`);
		}

		console.log("Uploading apartment images...");

		const apartmentImages = [];

		for (let i = 1; i <= 10; i++) {
			const imagePath = findImage(
				apartmentFolder,
				`appartment${i}`
			);

			const imageUrl = await uploadLocalImage(
				imagePath,
				"real-estate/properties"
			);

			apartmentImages.push(imageUrl);

			console.log(`Apartment image ${i} uploaded.`);
		}

		const properties = [
			...residentialImages.map((image, index) => ({
				title: [
					"Modern Family Villa",
					"Luxury Green Residence",
					"Premium City Home",
					"Contemporary Family House",
					"Elegant Suburban Villa",
					"Modern Residential Home",
					"Premium Family Residence",
					"Spacious Garden Villa",
					"Luxury Residential Estate"
				][index],
				category: "residential",
				price: [
					8500000,
					7200000,
					9800000,
					6400000,
					11000000,
					7600000,
					9200000,
					12500000,
					15000000
				][index],
				location: [
					"Indore, Madhya Pradesh",
					"Bhopal, Madhya Pradesh",
					"Pune, Maharashtra",
					"Jaipur, Rajasthan",
					"Bangalore, Karnataka",
					"Delhi, India",
					"Ahmedabad, Gujarat",
					"Indore, Madhya Pradesh",
					"Mumbai, Maharashtra"
				][index],
				description: "A beautiful residential property designed for comfortable and modern family living.",
				bedrooms: [4, 3, 4, 3, 5, 3, 4, 5, 5][index],
				bathrooms: [3, 3, 4, 2, 4, 3, 3, 4, 5][index],
				propertyType: index % 2 === 0 ? "Villa" : "House",
				image,
				agent: agents[index % agents.length]._id
			})),

			...commercialImages.map((image, index) => ({
				title: [
					"Downtown Office Space",
					"Prime Retail Store",
					"Business Center",
					"Commercial Showroom",
					"Corporate Office Floor",
					"Premium Commercial Space"
				][index],
				category: "commercial",
				price: [
					12500000,
					9500000,
					18000000,
					14500000,
					22000000,
					16500000
				][index],
				location: [
					"Mumbai, Maharashtra",
					"Indore, Madhya Pradesh",
					"Gurugram, Haryana",
					"Bhopal, Madhya Pradesh",
					"Hyderabad, Telangana",
					"Pune, Maharashtra"
				][index],
				description: "A strategically located commercial property suitable for business and investment purposes.",
				bedrooms: 0,
				bathrooms: [2, 1, 4, 2, 3, 3][index],
				propertyType: [
					"Office",
					"Retail",
					"Office",
					"Showroom",
					"Office",
					"Commercial Space"
				][index],
				image,
				agent: agents[(index + 2) % agents.length]._id
			})),

			...apartmentImages.map((image, index) => ({
				title: [
					"Skyline Apartment",
					"Luxury High-Rise Apartment",
					"Modern City Apartment",
					"Premium Garden Apartment",
					"Executive Apartment",
					"Urban Luxury Apartment",
					"Contemporary Apartment",
					"Premium City Residence",
					"Modern Family Apartment",
					"Luxury Downtown Apartment"
				][index],
				category: "apartment",
				price: [
					5600000,
					8900000,
					4800000,
					6800000,
					7600000,
					6200000,
					7100000,
					9500000,
					5400000,
					10500000
				][index],
				location: [
					"Indore, Madhya Pradesh",
					"Mumbai, Maharashtra",
					"Bhopal, Madhya Pradesh",
					"Pune, Maharashtra",
					"Bangalore, Karnataka",
					"Delhi, India",
					"Ahmedabad, Gujarat",
					"Hyderabad, Telangana",
					"Jaipur, Rajasthan",
					"Mumbai, Maharashtra"
				][index],
				description: "A modern apartment offering comfortable living, convenient amenities and excellent connectivity.",
				bedrooms: [3, 3, 2, 3, 3, 2, 3, 4, 2, 4][index],
				bathrooms: [2, 3, 2, 2, 3, 2, 2, 3, 2, 4][index],
				propertyType: "Apartment",
				image,
				agent: agents[(index + 1) % agents.length]._id
			}))
		];

		await Property.insertMany(properties);

		console.log(`${properties.length} properties created.`);

		const blogs = await Blog.insertMany([
			{
				title: "How to Choose the Right Property",
				description: "Important factors to consider before buying your next property, from location to budget and long-term value.",
				author: "Real Estate Team",
				image: residentialImages[0]
			},
			{
				title: "Top Things to Check Before Buying a Home",
				description: "A practical guide to inspecting a property before making a purchase.",
				author: "Real Estate Team",
				image: residentialImages[1]
			},
			{
				title: "Understanding Commercial Real Estate",
				description: "Learn about the major factors that influence commercial property investment.",
				author: "Real Estate Team",
				image: commercialImages[0]
			},
			{
				title: "Apartment Buying Guide",
				description: "Everything you should consider when selecting an apartment for yourself or your family.",
				author: "Real Estate Team",
				image: apartmentImages[0]
			},
			{
				title: "Why Location Matters in Real Estate",
				description: "Explore how location affects property value, convenience and future growth.",
				author: "Real Estate Team",
				image: residentialImages[2]
			},
			{
				title: "Tips for First-Time Property Buyers",
				description: "A simple guide for first-time buyers covering planning, financing and property selection.",
				author: "Real Estate Team",
				image: apartmentImages[1]
			}
		]);

		console.log(`${blogs.length} blogs created.`);

		console.log("Database seeded successfully.");

		process.exit(0);
	} catch (error) {
		console.error("Seed error:", error.message);
		process.exit(1);
	}
};

seedDatabase();
