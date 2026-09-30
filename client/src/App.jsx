import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<UserLayout />}>
					<Route path="/" element={<h1>Home</h1>} />
					<Route path="/properties" element={<h1>Properties</h1>} />
					<Route path="/agents" element={<h1>Agents</h1>} />
					<Route path="/blogs" element={<h1>Blogs</h1>} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;