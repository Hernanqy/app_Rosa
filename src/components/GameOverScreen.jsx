import React from "react";

export default function GameOverScreen({ onRestart }) {
  return (
    <main className="screen gameover-screen">
      <section className="paper-panel gameover-panel">
        <span className="stamp red-stamp">EXPEDIENTE CERRADO</span>

        <h1>Fin del juego</h1>

        <p>
          Se agotaron los intentos disponibles para esta pista. Los secretos de
          la habitación de Rosa seguirán ocultos por ahora.
        </p>

        <p>
          Pueden volver a intentarlo desde el comienzo y observar con más
          atención cada detalle del entorno.
        </p>

        <button className="primary-btn" onClick={onRestart}>
          Reiniciar experiencia
        </button>
      </section>
    </main>
  );
}
