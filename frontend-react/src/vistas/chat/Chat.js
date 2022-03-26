import React, { useState } from 'react';
import Chat2 from './componentes/Chat';

const Chat = () => {

  const [nombre, setNombre] = useState( '' );
  const [registrado, setRegistrado] = useState( '' );

  const registrar = ( e ) => {

    e.preventDefault();
    if ( nombre !== '' ) {

      setRegistrado( true );

    }

  };

  return (
    <div className="App">
      {
        !registrado &&
                <form onSubmit={registrar}>
                  <label htmlFor="">Introduzca su nombre</label>
                  <input value={nombre}
                    onChange={e => setNombre( e.target.value )}></input>
                  <button>Ir al chat</button>
                </form>
      }

      {
        registrado &&
                <Chat2 nombre={nombre}></Chat2>
      }

    </div>
  );

};

export default Chat;
