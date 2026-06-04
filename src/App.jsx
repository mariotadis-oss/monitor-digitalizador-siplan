import React, { useState } from 'react';
import './App.css';

// 1. BASE DE DATOS SIMULADA
const baseDeDatosSimulada = {
  "fichas": [1, 3, 5],
  "actas": [2, 6],
  "anexo": [4, 8, 12],
  "envios": [3, 7, 11],
  "egresos": [5, 10],
  "sisai-g1": [1, 2, 3, 4],
  "sisai-g2": [6, 7, 8],
  "sitec-cedula": [9, 11, 12],
  "numeralia": [2, 5, 8, 11],
  "informe-etapas": [9]
};

const expedientesSimulados = {
  "fichas": [
    { nombre: "Resumen_Ejecutivo_FIBAP_De_Proyectos_De_Infraestructura_Estatal_2026_Firmado.pdf", tipo: "pdf", icon: "fas fa-file-pdf", size: "2.4 MB", acciones: ["ver", "descargar"] },
    { nombre: "Matriz_De_Costos_Y_Beneficios_Anualizados.xlsx", tipo: "excel", icon: "fas fa-file-excel", size: "1.1 MB", acciones: ["ver", "descargar"] }
  ],
  "actas": [
    { nombre: "Acta_De_Instalacion_Del_Comite_De_Planeacion_Sian_Firmada.pdf", tipo: "pdf", icon: "fas fa-file-pdf", size: "4.8 MB", acciones: ["ver", "descargar"] }
  ],
  "default": [
    { nombre: "Reporte_Estandar_Validado_De_Produccion.pdf", tipo: "pdf", icon: "fas fa-file-pdf", size: "1.2 MB", acciones: ["ver", "descargar"] }
  ]
};

const nombresMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

function App() {
  // 2. ESTADOS DE REACT (Reemplazan la manipulación del DOM)
  const [activeItem, setActiveItem] = useState(null);
  const [breadcrumb, setBreadcrumb] = useState({ principal: "Planeación", secundario: "", item: "Fichas Fibap de Proyectos" });
  const [openFolders, setOpenFolders] = useState({});
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, title: "", files: [] });
  const [isBreadcrumbVisible, setIsBreadcrumbVisible] = useState(false);

  // 3. CONTROLADORES DE EVENTOS
  const toggleFolder = (folderId, e) => {
    e.stopPropagation();
    setOpenFolders(prev => ({ ...prev, [folderId]: !prev[folderId] }));
  };

  const handleItemClick = (id, principal, secundario, itemText, e) => {
    e.stopPropagation();
    setActiveItem(id);
    setBreadcrumb({ principal, secundario, item: itemText });
    
    // 👇 NUEVO: Encendemos la visibilidad al hacer clic
    setIsBreadcrumbVisible(true); 

    if (window.innerWidth <= 992) {
      setIsMenuExpanded(false);
    }
  };

  const openModal = (mesIdx) => {
    const mesNombre = nombresMeses[mesIdx - 1];
    const categoryName = breadcrumb.secundario ? breadcrumb.secundario : breadcrumb.principal;
    const titleJSX = (
      <>
        {categoryName} <span style={{ opacity: 0.5, fontWeight: 'normal' }}>{'>'}</span> {breadcrumb.item} (<span style={{ color: 'var(--blanco)', fontWeight: 'bold' }}>{mesNombre}</span>)
      </>
    );

    const archivosDelMes = expedientesSimulados[activeItem] || expedientesSimulados["default"];

    setModalState({
      isOpen: true,
      title: titleJSX,
      files: archivosDelMes
    });
  };

  const closeModal = () => setModalState({ ...modalState, isOpen: false });

  // 4. FUNCIONES DE RENDERIZADO PARA LAS TABLAS
  const renderCell = (mes) => {
    const entregas = baseDeDatosSimulada[activeItem] || [];
    const hasMarker = entregas.includes(mes);

    return (
      <td 
        key={`mes-${mes}`} 
        className={`celda-indicador ${hasMarker ? 'has-marker' : ''}`}
        onClick={() => hasMarker ? openModal(mes) : null}
        style={{ cursor: hasMarker ? 'pointer' : 'default', color: hasMarker ? 'inherit' : '#ccc' }}
      >
        {!hasMarker && "-"}
      </td>
    );
  };

  return (
    <>
      {/* ENCABEZADO */}
      <header className="main-header">
        <div className="top-bar">
          <a href="#" className="url-sitio">www.finanzaschiapas.gob.mx</a>
        </div>
        <div className="banner-container">
          <div className="logo-container">
            <div className="escudo-chiapas">
              <img src="/img/escudo-de-armas-chiapas.png" alt="Escudo" />
            </div>
            <div className="logo-humanismo">
              <img src="/img/humanismo-que-transforma.png" alt="Humanismo" />
            </div>
          </div>
          <div className="header-titles">
            <h2>Subsecretaría de Planeación</h2>
            <p className="page-subtitle">MONITOR DIGITALIZADOR</p>
          </div>
        </div>
        <div className="franja-roja-tramada"></div>
      </header>

      {/* CONTENEDOR PRINCIPAL */}
      <main className="container monitor-layout">
        
        {/* SIDEBAR ACORDEÓN */}
        <aside className={`sidebar-menu ${isMenuExpanded ? 'menu-expanded' : ''}`}>
          <div className="menu-header" id="menu-trigger" onClick={(e) => {
            if (window.innerWidth <= 992 && !e.target.closest('.tree-menu')) {
              setIsMenuExpanded(!isMenuExpanded);
            }
          }}>
            <div className="header-text-container">
              <div className="menu-title-row">
                <div className="brand-block">
                  <span className="icon-gear"><i className="fas fa-cog"></i></span> 
                  <span id="header-dynamic-title">SIPLAN</span>
                </div>
                <div id="menu-sub-breadcrumb" className={`menu-breadcrumb ${isBreadcrumbVisible ? 'visible' : ''}`}>
                  {breadcrumb.principal} 
                  {breadcrumb.secundario && <> <span style={{opacity: 0.5}}>{'>'}</span> {breadcrumb.secundario}</>}
                  {' '}<span style={{opacity: 0.5}}>{'>'}</span> <span style={{fontWeight: 'bold'}}>{breadcrumb.item}</span>
                </div>
              </div>                
            </div>
            <span className="menu-arrow">▼</span>
          </div>
          
          <ul className="tree-menu" id="collapsible-tree">
            {/* Planeación */}
            <li className={`category ${openFolders.planeacion ? 'open' : ''}`} onClick={(e) => toggleFolder('planeacion', e)}>
              <span className="folder-icon"><i className="fas fa-file"></i></span> Planeación
              <ul>
                <li className={`clickable-item ${activeItem === 'fichas' ? 'active' : ''}`} onClick={(e) => handleItemClick('fichas', 'Planeación', '', 'Fichas Fibap de Proyectos', e)}>Fichas Fibap de Proyectos</li>
                <li className={`clickable-item ${activeItem === 'actas' ? 'active' : ''}`} onClick={(e) => handleItemClick('actas', 'Planeación', '', 'Actas', e)}>Actas</li>
                <li className={`clickable-item ${activeItem === 'anexo' ? 'active' : ''}`} onClick={(e) => handleItemClick('anexo', 'Planeación', '', 'Anexo (desglose)', e)}>Anexo (desglose)</li>
              </ul>
            </li>
            
            {/* Programación */}
            <li className={`category ${openFolders.programacion ? 'open' : ''}`} onClick={(e) => toggleFolder('programacion', e)}>
              <span className="folder-icon"><i className="fas fa-file"></i></span> Programación
              <ul>
                <li className={`clickable-item ${activeItem === 'envios' ? 'active' : ''}`} onClick={(e) => handleItemClick('envios', 'Programación', '', 'Envíos programados', e)}>Envíos programados</li>
                <li className={`clickable-item ${activeItem === 'egresos' ? 'active' : ''}`} onClick={(e) => handleItemClick('egresos', 'Programación', '', 'Envío de egresos', e)}>Envío de egresos</li>
              </ul>
            </li>

            {/* Seguimiento */}
            <li className={`category ${openFolders.seguimiento ? 'open' : ''}`} onClick={(e) => toggleFolder('seguimiento', e)}>
              <span className="folder-icon"><i className="fas fa-file"></i></span> Seguimiento
              <ul>
                <li className={`sub-category ${openFolders.sisai ? 'open' : ''}`} onClick={(e) => toggleFolder('sisai', e)}>
                  <span className="folder-icon"><i className="far fa-file"></i></span> SISAI
                  <ul>
                    <li className={`clickable-item ${activeItem === 'sisai-g1' ? 'active' : ''}`} onClick={(e) => handleItemClick('sisai-g1', 'Seguimiento', 'SISAI', 'Envío G1', e)}>Envío G1</li>
                    <li className={`clickable-item ${activeItem === 'sisai-g2' ? 'active' : ''}`} onClick={(e) => handleItemClick('sisai-g2', 'Seguimiento', 'SISAI', 'Envío G2', e)}>Envío G2</li>
                  </ul>
                </li>
                <li className={`sub-category ${openFolders.sitec ? 'open' : ''}`} onClick={(e) => toggleFolder('sitec', e)}>
                  <span className="folder-icon"><i className="far fa-file"></i></span> SITEC
                  <ul>
                    <li className={`clickable-item ${activeItem === 'sitec-cedula' ? 'active' : ''}`} onClick={(e) => handleItemClick('sitec-cedula', 'Seguimiento', 'SITEC', 'Envío Cédula de Indicadores', e)}>Envío Cédula de Indicadores</li>
                  </ul>
                </li>
                <li className={`sub-category ${openFolders.numeralia ? 'open' : ''}`} onClick={(e) => toggleFolder('numeralia', e)}>
                  <span className="folder-icon"><i className="far fa-file"></i></span> NUMERALIA
                  <ul>
                    <li className={`clickable-item ${activeItem === 'numeralia' ? 'active' : ''}`} onClick={(e) => handleItemClick('numeralia', 'Seguimiento', 'NUMERALIA', 'Envío Numeralia', e)}>Envío Numeralia</li>
                  </ul>
                </li>
              </ul>
            </li>

            {/* Informe de Gobierno */}
            <li className={`category ${openFolders.informe ? 'open' : ''}`} onClick={(e) => toggleFolder('informe', e)}>
              <span className="folder-icon"><i className="fas fa-file"></i></span> Informe de Gobierno
              <ul>
                <li className={`clickable-item ${activeItem === 'informe-etapas' ? 'active' : ''}`} onClick={(e) => handleItemClick('informe-etapas', 'Informe de Gobierno', '', 'Envío etapas', e)}>Envío etapas</li>
              </ul>
            </li>
          </ul>
        </aside>

        {/* TABLAS DE CRONOGRAMA */}
        <section className="table-container">
          
          {/* Tabla Escritorio */}
          <table className="cronograma-table tabla-escritorio">
            <thead>
              <tr>
                <th colSpan="6" className="primer-semestre">Primer Semestre</th>
                <th colSpan="6" className="segundo-semestre">Segundo Semestre</th>
              </tr>
              <tr>
                <th colSpan="3">Primer Trimestre</th>
                <th colSpan="3">Segundo Trimestre</th>
                <th colSpan="3">Tercer Trimestre</th>
                <th colSpan="3">Cuarto Trimestre</th>
              </tr>
              <tr className="months-header">
                <th>Ene</th><th>Feb</th><th>Mar</th>
                <th>Abr</th><th>May</th><th>Jun</th>
                <th>Jul</th><th>Ago</th><th>Sep</th>
                <th>Oct</th><th>Nov</th><th>Dic</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {[1,2,3,4,5,6,7,8,9,10,11,12].map(mes => renderCell(mes))}
              </tr>
            </tbody>
          </table>

          {/* Tabla Móvil 1 */}
          <table className="cronograma-table tabla-movil">
            <thead>
              <tr>
                <th colSpan="6" className="primer-semestre">Primer Semestre</th>
              </tr>
              <tr>
                <th colSpan="3">Primer Trimestre</th>
                <th colSpan="3">Segundo Trimestre</th>
              </tr>
              <tr className="months-header">
                <th>Ene</th><th>Feb</th><th>Mar</th>
                <th>Abr</th><th>May</th><th>Jun</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {[1,2,3,4,5,6].map(mes => renderCell(mes))}
              </tr>
            </tbody>
          </table>

          {/* Tabla Móvil 2 */}
          <table className="cronograma-table tabla-movil">
            <thead>
              <tr>
                <th colSpan="6" className="segundo-semestre">Segundo Semestre</th>
              </tr>
              <tr>
                <th colSpan="3">Segundo Trimestre</th>
                <th colSpan="3">Tercer Trimestre</th>
              </tr>
              <tr className="months-header">
                <th>Jul</th><th>Ago</th><th>Sep</th>
                <th>Oct</th><th>Nov</th><th>Dic</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {[7,8,9,10,11,12].map(mes => renderCell(mes))}
              </tr>
            </tbody>
          </table>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="main-footer">
        <div className="footer-column">
          <h4>Contacto:</h4>
          <p><strong>Manuel Francisco Antonio Pariente Gavito</strong><br />
          Secretario de Finanzas<br />
          mparlante@finanzaschiapas.gob.mx</p>
          <p><strong>José Antonio Zenteno Santiago</strong><br />
          Subsecretario de Planeación<br />
          jzenteno@finanzaschiapas.gob.mx</p>
        </div>
        <div className="footer-column">
          <h4>Visítanos:</h4>
          <p>Torre Chiapas, Nivel 10<br />
          Tuxtla Gutiérrez, Chiapas<br />
          CP 29045</p>
          <p><i className="fas fa-phone"></i> 961 691 4020</p>
        </div>
      </footer>

      {/* VENTANA MODAL */}
      <div className={`modal-overlay ${modalState.isOpen ? 'active' : ''}`} onClick={(e) => {
        if(e.target.classList.contains('modal-overlay')) closeModal();
      }}>
        <div className="modal-content">
          <div className="modal-header-popup">
            <h3>{modalState.title}</h3>
            <span className="close-modal-btn" onClick={closeModal}>&times;</span>
          </div>
          <div className="modal-body">
            <p className="modal-instruction-text">Documentos registrados para auditoría y validación:</p>
            
            <div className="files-grid-container">
              {modalState.files.map((archivo, index) => (
                <div key={index} className="file-card">
                  <div className="file-info">
                    <span className="file-icon"><i className={archivo.icon} style={{ fontSize: '1.5rem', color: archivo.tipo === 'pdf' ? 'var(--rojo2)' : 'var(--verde)' }}></i></span>
                    <div className="file-name-wrapper">
                      <span className="file-title">{archivo.nombre}</span>
                    </div>
                  </div>
                  <div className="file-footer-row">
                    <span className="file-size">{archivo.size} • {archivo.tipo.toUpperCase()}</span>
                    <div className="file-actions">
                      {archivo.acciones.includes('ver') && (
                        <button className="action-btn btn-view" title="Visualizar documento" onClick={() => alert(`Abriendo visor para: ${archivo.nombre}`)}>
                          <i className="fas fa-eye"></i>
                        </button>
                      )}
                      {archivo.acciones.includes('descargar') && (
                        <button className="action-btn btn-download" title="Descargar archivo" onClick={() => alert(`Descargando: ${archivo.nombre}`)}>
                          <i className="fas fa-download"></i>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-meta-data">
              <p><strong>Estatus del Mes:</strong> <span className="status-badge">Validado</span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;