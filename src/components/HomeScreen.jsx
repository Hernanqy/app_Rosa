import React from "react";

export default function HomeScreen({ onEnter }) {
  return (
    <main className="screen home-screen">
      <section className="old-folder home-folder">
        <div className="hero-rosa-box home-hero">
          <img
            src="/img/hero-rosa.png"
            alt="La Habitación de Rosa"
            className="hero-rosa-img"
          />
        </div>

        <div className="home-intro">
          <p>
            Una sala de escape educativa ambiental donde cada pista revela un
            secreto de la naturaleza.
          </p>
        </div>

        <button className="primary-btn" onClick={onEnter}>
          Iniciar juego
        </button>
      </section>
    </main>
  );
}
