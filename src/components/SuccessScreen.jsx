import React from "react";

export default function SuccessScreen({ pista, onNext, esUltima }) {
  return (
    <main className="screen success-screen">
      <section className="paper-panel success-panel">
        <span className="stamp green-stamp">ARCHIVAL RECORD</span>

        <h1>¡Pista resuelta!</h1>

        <p className="big-number">
          Dígito encontrado: <strong>{pista.respuestaCorrecta}</strong>
        </p>

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
