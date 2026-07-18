import React from "react";

export default function SuccessScreen({
  pista,
  onNext,
  esUltima,
  onRepeatSuccessAudio,
}) {
  return (
    <main className="screen success-screen">
      <section className="paper-panel success-panel">
        <span className="stamp green-stamp">PISTA RESUELTA</span>

        <h1>¡Pista resuelta!</h1>

        <p className="big-number">
          Dígito encontrado: <strong>{pista.respuestaCorrecta}</strong>
        </p>

        <button className="audio-btn" onClick={onRepeatSuccessAudio}>
          Repetir audio de pista resuelta
        </button>

        <div className="sabias-box">
          <h2>¿Sabías que?</h2>
          <p>{pista.sabiaQue}</p>
        </div>

        <button className="primary-btn" onClick={onNext}>
          {esUltima ? "Ir al cierre final" : "Pasar a la siguiente pista"}
        </button>
      </section>
    </main>
  );
}
