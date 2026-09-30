import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import Home from "./pages/user/Home";
import Properties from "./pages/User/Properties";
import Agents from "./pages/User/Agents";
import AgentDetails from "./pages/User/AgentDetails";
import Blogs from "./pages/User/Blogs";
import BlogDetails from "./pages/User/BlogDetails";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<UserLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/properties" element={<Properties />} />
					<Route path="/agents" element={<Agents />} />
					<Route path="/agents/:id" element={<AgentDetails />} />
					<Route path="/blogs" element={<Blogs />} />
					<Route path="/blogs/:id" element={<BlogDetails />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;