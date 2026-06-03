import React from "react";

export default function FinalScreen({ codigoFinal, onRestart }) {
  return (
    <main className="screen final-screen">
      <section className="old-folder final-folder">
        <span className="stamp green-stamp">MISIÓN COMPLETA</span>

        <div className="title-card">
          <h1>¡Llegaron al final del recorrido!</h1>
          <h2>El asombro fue la llave</h2>
        </div>

        <p>
          Han demostrado tener el instinto de verdaderos naturalistas. Ahora que
          descifraron los secretos de Rosa, solo queda un último paso.
        </p>

        <div className="code-box">
          <span>Código ganador</span>
          <strong>{codigoFinal}</strong>
        </div>

        <p>
          Ingresen estos 4 dígitos en el candado, respetando el orden de los
          desafíos.
        </p>

        <button className="primary-btn" onClick={onRestart}>
          Jugar nuevamente
        </button>
      </section>
    </main>
  );
}
