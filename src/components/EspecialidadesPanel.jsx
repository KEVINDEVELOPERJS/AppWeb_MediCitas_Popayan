import { useEffect, useState } from 'react';
import { api, normalizeList } from '../api/client';

const initialForm = { nombre: '', descripcion: '', activa: true };

export default function EspecialidadesPanel() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function fetchEspecialidades() {
    return api.list('especialidades').then((data) => normalizeList(data));
  }

  async function load(showLoading = false) {
    if (showLoading) {
      setLoading(true);
      setError('');
    }
    try {
      const data = await fetchEspecialidades();
      setItems(data);
      setError('');
    } catch (e) {
      setError(e.message || 'Error al cargar especialidades');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;
    fetchEspecialidades()
      .then((data) => {
        if (cancelled) return;
        setItems(data);
        setError('');
      })
      .catch((e) => {
        if (!cancelled) setError(e.message || 'Error al cargar especialidades');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  }

  function startEdit(item) {
    setEditingId(item.id);
    setForm({ nombre: item.nombre || '', descripcion: item.descripcion || '', activa: !!item.activa });
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
      if (editingId) {
        await api.update('especialidades', editingId, form);
        setSuccess('Especialidad actualizada correctamente.');
      } else {
        await api.create('especialidades', form);
        setSuccess('Especialidad creada correctamente.');
      }
      cancelEdit();
      await load(true);
    } catch (e) {
      setError(e.message || 'Error al guardar');
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id) {
    if (!window.confirm('¿Eliminar esta especialidad?')) return;
    setError('');
    setSuccess('');
    try {
      await api.remove('especialidades', id);
      setSuccess('Especialidad eliminada.');
      if (editingId === id) cancelEdit();
      await load(true);
    } catch (e) {
      setError(e.message || 'Error al eliminar');
    }
  }

  return (
    <div className="grid">
      <div className="card">
        <h3>{editingId ? 'Editar especialidad' : 'Nueva especialidad'}</h3>
        <form onSubmit={onSubmit}>
          <label>Nombre *</label>
          <input name="nombre" value={form.nombre} onChange={onChange} required maxLength={120} />

          <label>Descripción</label>
          <textarea name="descripcion" value={form.descripcion} onChange={onChange} />

          <label style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12 }}>
            <input type="checkbox" name="activa" checked={form.activa} onChange={onChange} style={{ width: 'auto' }} />
            Activa
          </label>

          <div className="row">
            <button className="btn primary" type="submit" disabled={saving}>{saving ? 'Guardando...' : (editingId ? 'Actualizar' : 'Crear')}</button>
            {editingId && <button className="btn secondary" type="button" onClick={cancelEdit}>Cancelar</button>}
          </div>
        </form>
      </div>

      <div>
        {loading && <div className="status loading">Cargando especialidades...</div>}
        {error && <div className="status error">Error: {error}</div>}
        {success && <div className="status success">{success}</div>}

        <div className="card">
          <h3>Listado de especialidades</h3>
          {!loading && items.length === 0 ? (
            <p className="muted">No hay especialidades registradas.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>ID</th><th>Nombre</th><th>Descripción</th><th>Estado</th><th>Citas</th><th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it) => (
                    <tr key={it.id}>
                      <td>{it.id}</td>
                      <td><strong>{it.nombre}</strong></td>
                      <td>{it.descripcion || '—'}</td>
                      <td><span className={`badge ${it.activa ? 'ok' : 'off'}`}>{it.activa ? 'Activa' : 'Inactiva'}</span></td>
                      <td>{it.total_citas ?? 0}</td>
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
