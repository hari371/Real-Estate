import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import api from "../../services/api";

function AdminRegister() {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: ""
	});

	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormData((previous) => ({
			...previous,
			[name]: value
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError("");
		setIsSubmitting(true);

		try {
			await api.post("/auth/register", formData);

			navigate("/admin/verify-otp", {
				state: {
					email: formData.email
				}
			});
		} catch (error) {
			setError(
				error.response?.data?.message ||
				"Registration failed. Please try again."
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
			<div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
				<div className="text-center">
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
						Real Estate
					</p>

					<h1 className="mt-2 text-3xl font-bold text-gray-900">
						Create Admin Account
					</h1>

					<p className="mt-3 text-sm text-gray-500">
						Register your account to access the admin panel.
					</p>
				</div>

				{error && (
					<div className="mt-6 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className="mt-8 space-y-5">
					<div>
						<label className="mb-2 block text-sm font-medium text-gray-700">
							Name
						</label>

						<div className="relative">
							<FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								placeholder="Enter your name"
								required
								className="w-full rounded-md border border-gray-300 py-3 pl-10 pr-4 outline-none transition ease-in-out duration-500 focus:border-primary"
							/>
						</div>
					</div>

					<div>
						<label className="mb-2 block text-sm font-medium text-gray-700">
							Email
						</label>

						<div className="relative">
							<FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								placeholder="Enter your email"
								required
								className="w-full rounded-md border border-gray-300 py-3 pl-10 pr-4 outline-none transition ease-in-out duration-500 focus:border-primary"
							/>
						</div>
					</div>

					<div>
						<label className="mb-2 block text-sm font-medium text-gray-700">
							Password
						</label>

						<div className="relative">
							<FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

							<input
								type="password"
								name="password"
								value={formData.password}
								onChange={handleChange}
								placeholder="Create a password"
								required
								className="w-full rounded-md border border-gray-300 py-3 pl-10 pr-4 outline-none transition ease-in-out duration-500 focus:border-primary"
							/>
						</div>
					</div>

					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full rounded-md bg-primary py-3 font-semibold text-white transition ease-in-out duration-500 hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-70"
					>
						{isSubmitting ? "Creating Account..." : "Register"}
					</button>
				</form>

				<p className="mt-6 text-center text-sm text-gray-500">
					Already have an account?{" "}
					<Link
						to="/admin/login"
						className="font-semibold text-primary transition ease-in-out duration-500 hover:text-secondary"
					>
						Login
					</Link>
				</p>
			</div>
		</div>
	);
}

export default AdminRegister;