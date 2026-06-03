import React, { useState } from "react";
import "./styles/rosa.css";

import { pistas } from "./data/pistas";

import StartScreen from "./components/StartScreen";
import ClueScreen from "./components/ClueScreen";
import SuccessScreen from "./components/SuccessScreen";
import GameOverScreen from "./components/GameOverScreen";
import FinalScreen from "./components/FinalScreen";

export default function App() {
  const [pantalla, setPantalla] = useState("inicio");
  const [pistaActual, setPistaActual] = useState(0);
  const [codigoEncontrado, setCodigoEncontrado] = useState([]);

  const pista = pistas[pistaActual];

  function iniciarJuego() {
    setPantalla("pista");
    setPistaActual(0);
    setCodigoEncontrado([]);
  }

  function respuestaCorrecta() {
    setCodigoEncontrado((prev) => [...prev, pista.respuestaCorrecta]);
    setPantalla("exito");
  }

  function pasarSiguiente() {
    const esUltima = pistaActual === pistas.length - 1;

    if (esUltima) {
      setPantalla("final");
      return;
    }

    setPistaActual((prev) => prev + 1);
    setPantalla("pista");
  }

  function finalizarPorError() {
    setPantalla("gameover");
  }

  const codigoFinal =
    codigoEncontrado.length === pistas.length
      ? codigoEncontrado.join("")
      : pistas.map((item) => item.respuestaCorrecta).join("");

  return (
    <>
      {pantalla === "inicio" && <StartScreen onStart={iniciarJuego} />}

      {pantalla === "pista" && (
        <ClueScreen
          pista={pista}
          pistaActual={pistaActual}
          totalPistas={pistas.length}
          onCorrectAnswer={respuestaCorrecta}
          onGameOver={finalizarPorError}
        />
      )}

      {pantalla === "exito" && (
        <SuccessScreen
          pista={pista}
          esUltima={pistaActual === pistas.length - 1}
          onNext={pasarSiguiente}
        />
      )}

      {pantalla === "gameover" && (
        <GameOverScreen onRestart={iniciarJuego} />
      )}

      {pantalla === "final" && (
        <FinalScreen codigoFinal={codigoFinal} onRestart={iniciarJuego} />
      )}
    </>
  );
}
