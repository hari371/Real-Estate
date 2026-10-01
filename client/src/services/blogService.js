import api from "./api";

export const getBlogs = () => {
	return api.get("/blogs");
};

export const getBlogById = (id) => {
	return api.get(`/blogs/${id}`);
};

export const createBlog = (formData, token) => {
	return api.post("/blogs", formData, {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "multipart/form-data"
		}
	});
};

export const updateBlog = (id, formData, token) => {
	return api.put(`/blogs/${id}`, formData, {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "multipart/form-data"
		}
	});
};

export const deleteBlog = (id, token) => {
	return api.delete(`/blogs/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
};