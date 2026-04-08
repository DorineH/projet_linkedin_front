import api from '../lib/api';

const BASE_URL = '/api/saved-jobs';

export async function getSavedIds() {
  const response = await api.get(`${BASE_URL}/ids`);
  return response.data;
}

export async function saveJob(job_id) {
  const response = await api.post(`${BASE_URL}`, { job_id: Number(job_id) });
  return response.data;
}

export async function listSavedJobs(params = {}) {
  const response = await api.get(`${BASE_URL}`, { params });
  return response.data;
}

export async function updateSavedJob(savedId, payload) {
  const response = await api.patch(`${BASE_URL}/${savedId}`, payload);
  return response.data;
}

export async function deleteSavedJob(savedId) {
  const response = await api.delete(`${BASE_URL}/${savedId}`);
  return response.data;
}