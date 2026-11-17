import { useState } from 'react';
import EspecialidadesPanel from './components/EspecialidadesPanel';
import CitasPanel from './components/CitasPanel';

export default function App() {
  const [tab, setTab] = useState('especialidades');

  return (
    <div className="container">
      <header>
        <h1>MediCitas Popayán</h1>
        <p className="subtitle">
          Cliente React (Vite) que consume la API REST de Django para gestionar especialidades y citas médicas.
        </p>
        <p className="header-note">
          Proyecto ajustado a entrega individual: demuestra el flujo completo servidor ↔ cliente con CRUD, estados de carga y error, y edición (bonus).
        </p>
      </header>

      <div className="tabs">
        <button className={`tab ${tab === 'especialidades' ? 'active' : ''}`} onClick={() => setTab('especialidades')}>
          Especialidades
        </button>
        <button className={`tab ${tab === 'citas' ? 'active' : ''}`} onClick={() => setTab('citas')}>
          Citas médicas
        </button>
      </div>

      <main className="panel">
        {tab === 'especialidades' ? <EspecialidadesPanel /> : <CitasPanel />}
      </main>
    </div>
  );
}
