import { useEffect, useState } from 'react';
import { api, normalizeList } from '../api/client';

const initialForm = {
  paciente_nombre: '',
  telefono: '',
  fecha_hora: '',
  motivo: '',
  estado: 'PROGRAMADA',
  observaciones: '',
  especialidad: '',
};

const estados = [
  { value: 'PROGRAMADA', label: 'Programada' },
  { value: 'ATENDIDA', label: 'Atendida' },
  { value: 'CANCELADA', label: 'Cancelada' },
];

function toInputDateTime(value) {
  if (!value) return '';
  const d = new Date(value);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function CitasPanel() {
  const [items, setItems] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function fetchData() {
    return Promise.all([
      api.list('citas'),
      api.list('especialidades'),
    ]).then(([citasData, espData]) => ({
      citas: normalizeList(citasData),
      especialidades: normalizeList(espData),
    }));
  }

  async function load(showLoading = false) {
    if (showLoading) {
      setLoading(true);
      setError('');
    }
    try {
      const data = await fetchData();
      setItems(data.citas);
      setEspecialidades(data.especialidades);
      setError('');
    } catch (e) {
      setError(e.message || 'Error al cargar citas');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;
    fetchData()
      .then((data) => {
        if (cancelled) return;
        setItems(data.citas);
        setEspecialidades(data.especialidades);
        setError('');
      })
      .catch((e) => {
        if (!cancelled) setError(e.message || 'Error al cargar citas');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function startEdit(item) {
    setEditingId(item.id);
    setForm({
      paciente_nombre: item.paciente_nombre || '',
      telefono: item.telefono || '',
      fecha_hora: toInputDateTime(item.fecha_hora),
      motivo: item.motivo || '',
      estado: item.estado || 'PROGRAMADA',
      observaciones: item.observaciones || '',
      especialidad: item.especialidad || '',
    });
    setSuccess('');
    setError('');
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(initialForm);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const payload = { ...form, especialidad: Number(form.especialidad) };
      if (editingId) {
        await api.update('citas', editingId, payload);
        setSuccess('Cita actualizada correctamente.');
      } else {
        await api.create('citas', payload);
        setSuccess('Cita creada correctamente.');
      }
      cancelEdit();
      await load(true);
    } catch (e) {
      setError(e.message || 'Error al guardar la cita');
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id) {
    if (!window.confirm('¿Eliminar esta cita médica?')) return;
    setError('');
    setSuccess('');
    try {
      await api.remove('citas', id);
      setSuccess('Cita eliminada.');
      if (editingId === id) cancelEdit();
      await load(true);
    } catch (e) {
      setError(e.message || 'Error al eliminar la cita');
    }
  }

  function estadoBadgeClass(estado) {
    if (estado === 'ATENDIDA') return 'badge ok';
    if (estado === 'CANCELADA') return 'badge off';
    return 'badge warn';
  }

  return (
    <div className="grid">
      <div className="card">
        <h3>{editingId ? 'Editar cita médica' : 'Nueva cita médica'}</h3>
        <form onSubmit={onSubmit}>
          <label>Paciente *</label>
          <input name="paciente_nombre" value={form.paciente_nombre} onChange={onChange} required minLength={3} maxLength={150} />

          <label>Teléfono</label>
          <input name="telefono" value={form.telefono} onChange={onChange} placeholder="Ej: 3123456789" />

          <label>Especialidad *</label>
          <select name="especialidad" value={form.especialidad} onChange={onChange} required>
            <option value="">Seleccione una especialidad</option>
            {especialidades.map((e) => (
              <option key={e.id} value={e.id}>{e.nombre}</option>
            ))}
          </select>
          {especialidades.length === 0 && <p className="muted">Primero cree una especialidad para poder registrar citas.</p>}

          <label>Fecha y hora *</label>
          <input type="datetime-local" name="fecha_hora" value={form.fecha_hora} onChange={onChange} required />

          <label>Motivo *</label>
          <textarea name="motivo" value={form.motivo} onChange={onChange} required />

          <label>Estado</label>
          <select name="estado" value={form.estado} onChange={onChange}>
            {estados.map((e) => <option key={e.value} value={e.value}>{e.label}</option>)}
          </select>

          <label>Observaciones</label>
          <textarea name="observaciones" value={form.observaciones} onChange={onChange} />

          <div className="row">
            <button className="btn primary" type="submit" disabled={saving}>{saving ? 'Guardando...' : (editingId ? 'Actualizar' : 'Crear')}</button>
            {editingId && <button className="btn secondary" type="button" onClick={cancelEdit}>Cancelar</button>}
          </div>
        </form>
      </div>

      <div>
        {loading && <div className="status loading">Cargando citas...</div>}
        {error && <div className="status error">Error: {error}</div>}
        {success && <div className="status success">{success}</div>}

        <div className="card">
          <h3>Listado de citas médicas</h3>
          {!loading && items.length === 0 ? (
            <p className="muted">No hay citas registradas.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>ID</th><th>Paciente</th><th>Especialidad</th><th>Fecha y hora</th><th>Estado</th><th>Motivo</th><th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it) => (
                    <tr key={it.id}>
                      <td>{it.id}</td>
                      <td>
                        <strong>{it.paciente_nombre}</strong>
                        {it.telefono && <div className="muted">{it.telefono}</div>}
                      </td>
                      <td>{it.especialidad_nombre || it.especialidad}</td>
                      <td>{new Date(it.fecha_hora).toLocaleString()}</td>
                      <td><span className={estadoBadgeClass(it.estado)}>{it.estado}</span></td>
                      <td>{it.motivo}</td>
                      <td>
                        <div className="actions">
                          <button className="btn secondary small" onClick={() => startEdit(it)}>Editar</button>
                          <button className="btn danger small" onClick={() => onDelete(it.id)}>Eliminar</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
