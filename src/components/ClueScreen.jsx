import React, { useState } from "react";

export default function ClueScreen({
  pista,
  onCorrectAnswer,
  onIncorrectAnswer,
  onGameOver,
  pistaActual,
  totalPistas,
  segundosRestantes,
  onRepeatAudio,
}) {
  const [respuesta, setRespuesta] = useState("");
  const [intentos, setIntentos] = useState(0);
  const [mensajeError, setMensajeError] = useState("");

  const maxIntentos = 2;

  function normalizarRespuesta(valor) {
    return valor.trim().toLowerCase();
  }

  function formatearTiempo(segundosTotales) {
    const minutos = Math.floor(segundosTotales / 60);
    const segundos = segundosTotales % 60;

    return `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(
      2,
      "0"
    )}`;
  }

  function validarRespuesta(e) {
    e.preventDefault();

    const respuestaUsuario = normalizarRespuesta(respuesta);
    const respuestaCorrecta = normalizarRespuesta(pista.respuestaCorrecta);

    if (respuestaUsuario === respuestaCorrecta) {
      onCorrectAnswer();
      return;
    }

    onIncorrectAnswer();

    const nuevosIntentos = intentos + 1;
    setIntentos(nuevosIntentos);

    if (nuevosIntentos >= maxIntentos) {
      setTimeout(() => {
        onGameOver();
      }, 500);
      return;
    }

    setMensajeError(
      "Respuesta incorrecta. Atención: te queda un último intento para resolver esta pista."
    );

    setRespuesta("");
  }

  return (
    <main className="screen clue-screen">
      <section className="paper-panel">
        <div className="top-row">
          <img
            src="/img/logo-municipio.png"
            alt="Municipio de Olavarría"
            className="municipio-logo"
          />

          <span className="progress">
            Pista {pistaActual + 1} de {totalPistas}
          </span>
        </div>

        <div className="active-timer-box">
          <img
            src="/img/timer-20.png"
            alt="Tiempo restante"
            className="active-timer-icon"
          />
          <span>{formatearTiempo(segundosRestantes)}</span>
        </div>

        <h1>{pista.titulo}</h1>
        <h2>{pista.subtitulo}</h2>

        <button className="audio-btn" onClick={onRepeatAudio}>
          Repetir audio de la pista
        </button>

        <div className="clue-text">
          <p>{pista.texto}</p>
        </div>

        <div className="question-card">
          <p>{pista.pregunta}</p>

          <form onSubmit={validarRespuesta}>
            <input
              type="text"
              value={respuesta}
              onChange={(e) => setRespuesta(e.target.value)}
              placeholder="Escribí tu respuesta"
              inputMode="numeric"
            />

            <button className="primary-btn" type="submit">
              Comprobar respuesta
            </button>
          </form>
        </div>

        {mensajeError && (
          <div className="error-box">
            <strong>Error</strong>
            <p>{mensajeError}</p>
          </div>
        )}

        <details className="hint-box">
          <summary>Necesito una pequeña orientación</summary>
          <p>{pista.ayuda}</p>
        </details>
      </section>
    </main>
  );
}
