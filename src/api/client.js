const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  if (res.status === 204) return null;

  let data;
  const text = await res.text();
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }

  if (!res.ok) {
    let message = 'Error en la solicitud';
    if (data && typeof data === 'object') {
      if (data.detail) message = data.detail;
      else {
        const firstKey = Object.keys(data)[0];
        const val = data[firstKey];
        message = Array.isArray(val) ? `${firstKey}: ${val[0]}` : `${firstKey}: ${val}`;
      }
    } else if (typeof data === 'string' && data) {
      message = data;
    }
    throw new Error(message);
  }
  return data;
}

export const api = {
  list: (resource) => request(`/${resource}/`),
  create: (resource, body) => request(`/${resource}/`, { method: 'POST', body: JSON.stringify(body) }),
  update: (resource, id, body) => request(`/${resource}/${id}/`, { method: 'PUT', body: JSON.stringify(body) }),
  patch: (resource, id, body) => request(`/${resource}/${id}/`, { method: 'PATCH', body: JSON.stringify(body) }),
  remove: (resource, id) => request(`/${resource}/${id}/`, { method: 'DELETE' }),
};

export function normalizeList(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}
