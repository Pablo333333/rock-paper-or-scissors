import React, { useState, useEffect } from "react";
import BotonOpcion from "./BotonOpcion";
import BotonReset from "./BotonReset";
import Score from "./Score";
import TableroInterno from "./TableroInterno";

const vencedores = {
  "✊": "✌",
  "🖐": "✊",
  "✌": "🖐",
};

const opciones = Object.keys(vencedores);

const numeroAleatorio = () => {
  return Math.floor(Math.random() * opciones.length);
};

function Tablero() {
  const [resultadoTexto, setResultadoTexto] = useState("-");
  const [eleccionIA, setEleccionIA] = useState("?");
  const [eleccionJugador, setEleccionJugador] = useState("?");
  const [scoreIA, setScoreIA] = useState(0);
  const [scoreJugador, setScoreJugador] = useState(0);
  const [reiniciar, setReiniciar] = useState(false);
  const [ganador, setGanador] = useState(null);

  const comprobarGanador = (opcionJugador) => {
    if (ganador) {
      return;
    }
    const opcionPC = opciones[numeroAleatorio()];
    const resultado = logicaJuego(opcionJugador, opcionPC);
    setEleccionIA(opcionPC);
    setResultadoTexto(resultado);
    setEleccionJugador(opcionJugador);
  };

  const logicaJuego = (opcionJugador, opcionPC) => {
    if (vencedores[opcionJugador] === opcionPC) {
      setScoreJugador(scoreJugador + 1);
      if (scoreJugador + 1 === 10) {
        setGanador("JUGADOR");
      }
      return "GANASTE";
    } else if (opcionJugador === opcionPC) {
      return "EMPATE";
    } else {
      setScoreIA(scoreIA + 1);
      if (scoreIA + 1 === 10) {
        setGanador("IA");
      }
      return "PERDISTE";
    }
  };

  const reiniciarJuego = () => {
    setResultadoTexto("-");
    setEleccionIA("?");
    setEleccionJugador("?");
    setScoreIA(0);
    setScoreJugador(0);
    setReiniciar(false);
    setGanador(null);
  };

  useEffect(() => {
    reiniciarJuego();
  }, [reiniciar]);

  return (
    <div className="tablero">
      <Score scoreIA={scoreIA} scoreJugador={scoreJugador} />
      <h1>PIEDRA, PAPEL o TIJERA</h1>
      {ganador ? (
        <h2>{`¡GANÓ ${ganador}!`}</h2>
      ) : (
        <TableroInterno
          eleccionIA={eleccionIA}
          resultadoTexto={resultadoTexto}
          eleccionJugador={eleccionJugador}
        />
      )}
      <p>Seleccioná una opción para jugar:</p>
      <div>
        {opciones.map((opcion, index) => {
          return (
            <BotonOpcion
              key={index}
              opcionTexto={opcion}
              comprobarGanador={comprobarGanador}
            />
          );
        })}
      </div>
      <BotonReset reiniciarJuego={reiniciarJuego} />
    </div>
  
  );
}

export default Tablero;
