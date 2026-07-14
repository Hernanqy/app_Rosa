import React from "react";

export default function StartScreen({ onStart, onRepeatIntro }) {
  return (
    <main className="screen start-screen">
      <section className="old-folder">
        <div className="hero-rosa-box">
          <img
            src="/img/hero-rosa.png"
            alt="La Habitación de Rosa"
            className="hero-rosa-img"
          />
        </div>

        <div className="intro-text">
          <p>
            Están a punto de ingresar al universo de Rosa, una mujer autodidacta,
            naturalista y profundamente apasionada por el ambiente.
          </p>

          <p>
            Rosa dejó su habitación llena de recuerdos, notas de campo y
            elementos de la naturaleza recolectados en sus viajes. Pero este
            espacio no está hecho solo para observar: esconde un enigma.
          </p>

          <p>
            Para salir victoriosos deberán descifrar 4 acertijos. Cada pista
            resuelta entregará un número. Juntos formarán el código ganador de 4
            cifras.
          </p>
        </div>

        <button className="audio-btn" onClick={onRepeatIntro}>
          Repetir introducción
        </button>

        <div className="rules-box">
          <div className="rule-item">
            <img
              src="/img/timer-20.png"
              alt="Tiempo"
              className="rule-icon-img"
            />
            <span>15 minutos</span>
          </div>

          <div className="rule-item">
            <img
              src="/img/icon-oportunidades.png"
              alt="Oportunidades"
              className="rule-icon-img"
            />
            <span>2 por acertijo</span>
          </div>

          <div className="rule-item">
            <img
              src="/img/icon-objetivo.png"
              alt="Objetivo"
              className="rule-icon-img"
            />
            <span>Descubrir el código final</span>
          </div>
        </div>

        <button className="primary-btn" onClick={onStart}>
          Comenzar primera pista
        </button>
      </section>
    </main>
  );
}
