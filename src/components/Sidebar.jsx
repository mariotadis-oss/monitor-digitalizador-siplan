import React, { useState } from 'react'

function Sidebar({ onSelectDeliverable }) {
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [openCategories, setOpenCategories] = useState({});
  const [breadcrumbText, setBreadcrumbText] = useState('');

  const toggleCategory = (e, categoryName) => {
    e.stopPropagation();
    setOpenCategories(prev => ({ ...prev, [categoryName]: !prev[categoryName] }));
  };

  const handleItemClick = (e, itemText, parentChain, id) => {
    e.stopPropagation();
    setBreadcrumbText(`${parentChain} > ${itemText}`);
    onSelectDeliverable(id); // 🚀 Mandamos el ID seleccionado a la aplicación principal
  };

  return (
    <aside className={`sidebar-menu ${menuExpanded ? 'menu-expanded' : ''}`}>
      <div className="menu-header" id="menu-trigger" onClick={() => setMenuExpanded(!menuExpanded)}>
        <div className="header-text-container">
          <div className="menu-title-row">
            <span className="icon-gear"><i className="fas fa-cog"></i></span> 
            <span id="header-dynamic-title">SIPLAN</span>
            <div className={`menu-breadcrumb ${breadcrumbText ? 'visible' : ''}`}>{breadcrumbText}</div>
          </div>                
        </div>
        <span className="menu-arrow">▼</span>
      </div>

      <ul className="tree-menu" id="collapsible-tree">
        <li className={`category ${openCategories['planeacion'] ? 'open' : ''}`} onClick={(e) => toggleCategory(e, 'planeacion')}>
          <span className="folder-icon"><i className="fas fa-file"></i></span> Planeación
          <ul>
            <li className="clickable-item" onClick={(e) => handleItemClick(e, 'Fichas Fibap de Proyectos', 'Planeación', 'fichas')}>Fichas Fibap de Proyectos</li>
            <li className="clickable-item" onClick={(e) => handleItemClick(e, 'Actas', 'Planeación', 'actas')}>Actas</li>
            <li className="clickable-item" onClick={(e) => handleItemClick(e, 'Anexo (desglose)', 'Planeación', 'anexo')}>Anexo (desglose)</li>
          </ul>
        </li>

        <li className={`category ${openCategories['programacion'] ? 'open' : ''}`} onClick={(e) => toggleCategory(e, 'programacion')}>
          <span className="folder-icon"><i className="fas fa-file"></i></span> Programación
          <ul>
            <li className="clickable-item" onClick={(e) => handleItemClick(e, 'Envíos programados', 'Programación', 'envios')}>Envíos programados</li>
            <li className="clickable-item" onClick={(e) => handleItemClick(e, 'Envío de egresos', 'Programación', 'egresos')}>Envío de egresos</li>
          </ul>
        </li>

        <li className={`category ${openCategories['seguimiento'] ? 'open' : ''}`} onClick={(e) => toggleCategory(e, 'seguimiento')}>
          <span className="folder-icon"><i className="fas fa-file"></i></span> Seguimiento
          <ul>
            <li className={`sub-category ${openCategories['sisai'] ? 'open' : ''}`} onClick={(e) => toggleCategory(e, 'sisai')}>
              <span className="folder-icon"><i className="far fa-file"></i></span> SISAI
              <ul>
                <li className="clickable-item" onClick={(e) => handleItemClick(e, 'Envío G1', 'Seguimiento > SISAI', 'sisai-g1')}>Envío G1</li>
                <li className="clickable-item" onClick={(e) => handleItemClick(e, 'Envío G2', 'Seguimiento > SISAI', 'sisai-g2')}>Envío G2</li>
              </ul>
            </li>
            <li className={`sub-category ${openCategories['sitec'] ? 'open' : ''}`} onClick={(e) => toggleCategory(e, 'sitec')}>
              <span className="folder-icon"><i className="far fa-file"></i></span> SITEC
              <ul>
                <li className="clickable-item" onClick={(e) => handleItemClick(e, 'Envío Cédula de Indicadores', 'Seguimiento > SITEC', 'sitec-cedula')}>Envío Cédula de Indicadores</li>
              </ul>
            </li>
            <li className={`sub-category ${openCategories['numeralia'] ? 'open' : ''}`} onClick={(e) => toggleCategory(e, 'numeralia')}>
              <span className="folder-icon"><i className="far fa-file"></i></span> NUMERALIA
              <ul>
                <li className="clickable-item" onClick={(e) => handleItemClick(e, 'Envío Numeralia', 'Seguimiento > NUMERALIA', 'numeralia')}>Envío Numeralia</li>
              </ul>
            </li>
          </ul>
        </li>

        <li className={`category ${openCategories['informe'] ? 'open' : ''}`} onClick={(e) => toggleCategory(e, 'informe')}>
          <span className="folder-icon"><i className="fas fa-file"></i></span> Informe de Gobierno
          <ul>
            <li className="clickable-item" onClick={(e) => handleItemClick(e, 'Envío etapas', 'Informe de Gobierno', 'informe-etapas')}>Envío etapas</li>
          </ul>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar