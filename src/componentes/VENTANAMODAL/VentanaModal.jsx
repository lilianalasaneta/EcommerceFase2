
import './VentanaModal.css'


function VentanaModal({ isOpen, onClose, onConfirm, idParaBorrar,  nombreParaBorrar, pregunta, titulo, unBoton, advertencia}) {
  if (!isOpen) return null

  return (
    <div id='primero'>
      <div id='segundo'>
        <h2>{titulo}</h2>
        <p id="pregunta">{pregunta} {nombreParaBorrar}?</p>
        <br />
        {unBoton?
          <div className="botones-modal">
            <button id="boton-modal-confirma" onClick={advertencia}>Aceptar</button>
          </div>
        :
          <div className="botones-modal">
            <button id="boton-modal-confirma" onClick={onConfirm}>Aceptar</button>
            <button id="boton-modal-no-confirma"  onClick={onClose}>Cancelar</button>
          </div>
        }
      </div>
    </div>
  );
}

export default VentanaModal