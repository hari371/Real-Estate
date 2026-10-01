import api from "./api";

export const getAgents = () => {
	return api.get("/agents");
};

export const getAgentById = (id) => {
	return api.get(`/agents/${id}`);
};

export const createAgent = (formData, token) => {
	return api.post("/agents", formData, {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "multipart/form-data"
		}
	});
};

export const updateAgent = (id, formData, token) => {
	return api.put(`/agents/${id}`, formData, {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "multipart/form-data"
		}
	});
};

export const deleteAgent = (id, token) => {
	return api.delete(`/agents/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
};