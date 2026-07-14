import React from "react";

export default function TimeOverScreen({ onRestart }) {
  return (
    <main className="screen timeover-screen">
      <section className="paper-panel gameover-panel">
        <span className="stamp red-stamp">TIEMPO AGOTADO</span>

        <h1>Fin de tiempo</h1>

        <p>
          El reloj llegó a cero. Los secretos de la Habitación de Rosa deberán
          esperar una nueva oportunidad.
        </p>

        <button className="primary-btn" onClick={onRestart}>
          Volver al inicio
        </button>
      </section>
    </main>
  );
}
