import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMail, FiShield } from "react-icons/fi";
import api from "../../services/api";

function AdminVerifyOtp() {
	const location = useLocation();
	const navigate = useNavigate();

	const email = location.state?.email || "";

	const [otp, setOtp] = useState("");
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError("");
		setIsSubmitting(true);

		try {
			await api.post("/auth/verify-otp", {
				email,
				otp
			});

			navigate("/admin/login");
		} catch (error) {
			setError(
				error.response?.data?.message ||
				"OTP verification failed. Please try again."
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!email) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
				<div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
					<h1 className="text-2xl font-bold text-gray-900">
						Registration Required
					</h1>

					<p className="mt-3 text-sm text-gray-500">
						Please register your admin account first.
					</p>

					<Link
						to="/admin/register"
						className="mt-6 inline-block rounded-md bg-primary px-6 py-3 font-semibold text-white transition ease-in-out duration-500 hover:bg-secondary"
					>
						Go to Register
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
			<div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
				<div className="text-center">
					<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl text-white">
						<FiShield />
					</div>

					<h1 className="mt-5 text-3xl font-bold text-gray-900">
						Verify OTP
					</h1>

					<p className="mt-3 text-sm text-gray-500">
						We sent a verification code to
					</p>

					<div className="mt-2 flex items-center justify-center gap-2 text-sm font-semibold text-gray-700">
						<FiMail />
						{email}
					</div>
				</div>

				{error && (
					<div className="mt-6 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className="mt-8 space-y-5">
					<div>
						<label className="mb-2 block text-sm font-medium text-gray-700">
							OTP
						</label>

						<input
							type="text"
							value={otp}
							onChange={(event) => setOtp(event.target.value)}
							placeholder="Enter 6-digit OTP"
							maxLength="6"
							required
							className="w-full rounded-md border border-gray-300 px-4 py-3 text-center text-xl tracking-[0.4em] outline-none transition ease-in-out duration-500 focus:border-primary"
						/>
					</div>

					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full rounded-md bg-primary py-3 font-semibold text-white transition ease-in-out duration-500 hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-70"
					>
						{isSubmitting ? "Verifying..." : "Verify OTP"}
					</button>
				</form>

				<p className="mt-6 text-center text-sm text-gray-500">
					Already verified?{" "}
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

export default AdminVerifyOtp;