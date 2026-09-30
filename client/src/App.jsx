import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import Home from "./pages/user/Home";
import Properties from "./pages/User/Properties";
import Agents from "./pages/User/Agents";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<UserLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/properties" element={<Properties />} />
					<Route path="/agents" element={<Agents />} />
					<Route path="/blogs" element={<h1>Blogs</h1>} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;