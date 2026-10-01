import api from "./api";

export const getProperties = () => {
	return api.get("/properties");
};

export const getPropertyById = (id) => {
	return api.get(`/properties/${id}`);
};

export const createProperty = (formData, token) => {
	return api.post("/properties", formData, {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "multipart/form-data"
		}
	});
};

export const updateProperty = (id, formData, token) => {
	return api.put(`/properties/${id}`, formData, {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "multipart/form-data"
		}
	});
};

export const deleteProperty = (id, token) => {
	return api.delete(`/properties/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
};