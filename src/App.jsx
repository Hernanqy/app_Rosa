import React, { useEffect, useRef, useState } from "react";
import "./styles/rosa.css";

import { pistas } from "./data/pistas";

import HomeScreen from "./components/HomeScreen";
import StartScreen from "./components/StartScreen";
import ClueScreen from "./components/ClueScreen";
import SuccessScreen from "./components/SuccessScreen";
import GameOverScreen from "./components/GameOverScreen";
import FinalScreen from "./components/FinalScreen";
import TimeOverScreen from "./components/TimeOverScreen";

const TIEMPO_TOTAL_SEGUNDOS = 15 * 60;

export default function App() {
  const [pantalla, setPantalla] = useState("home");
  const [pistaActual, setPistaActual] = useState(0);
  const [codigoEncontrado, setCodigoEncontrado] = useState([]);
  const [segundosRestantes, setSegundosRestantes] = useState(
    TIEMPO_TOTAL_SEGUNDOS
  );
  const [timerActivo, setTimerActivo] = useState(false);

  const musicaIntroRef = useRef(null);
  const fondoJuegoRef = useRef(null);
  const audioActualRef = useRef(null);
  const efectoAudioRef = useRef(null);

  const pista = pistas[pistaActual];

  useEffect(() => {
    musicaIntroRef.current = new Audio("/audio/musica-intro.mp3");
    musicaIntroRef.current.loop = true;
    musicaIntroRef.current.volume = 0.25;

    fondoJuegoRef.current = new Audio("/audio/fondo-juego.mp3");
    fondoJuegoRef.current.loop = true;
    fondoJuegoRef.current.volume = 0.12;

    reproducirMusicaIntro();

    return () => {
      detenerTodosLosAudios();
    };
  }, []);

  useEffect(() => {
    if (!timerActivo) return;

    const intervalo = setInterval(() => {
      setSegundosRestantes((segundosPrevios) => {
        if (segundosPrevios <= 1) {
          clearInterval(intervalo);
          setTimerActivo(false);
          detenerAudioActual();
          detenerFondoJuego();
          setPantalla("tiempo");
          return 0;
        }

        return segundosPrevios - 1;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [timerActivo]);

  function reproducirMusicaIntro() {
    if (!musicaIntroRef.current) return;

    musicaIntroRef.current.play().catch(() => {
      console.log("El navegador bloqueó la música inicial automática.");
    });
  }

  function detenerMusicaIntro() {
    if (!musicaIntroRef.current) return;

    musicaIntroRef.current.pause();
    musicaIntroRef.current.currentTime = 0;
  }

  function reproducirFondoJuego() {
    if (!fondoJuegoRef.current) return;

    fondoJuegoRef.current.play().catch(() => {
      console.log("El navegador bloqueó el fondo del juego.");
    });
  }

  function detenerFondoJuego() {
    if (!fondoJuegoRef.current) return;

    fondoJuegoRef.current.pause();
    fondoJuegoRef.current.currentTime = 0;
  }

  function detenerAudioActual() {
    if (!audioActualRef.current) return;

    audioActualRef.current.pause();
    audioActualRef.current.currentTime = 0;
    audioActualRef.current = null;
  }

  function detenerEfectoAudio() {
    if (!efectoAudioRef.current) return;

    efectoAudioRef.current.pause();
    efectoAudioRef.current.currentTime = 0;
    efectoAudioRef.current = null;
  }

  function reproducirAudio(ruta) {
    detenerAudioActual();

    const audio = new Audio(ruta);
    audio.volume = 1;
    audioActualRef.current = audio;

    audio.play().catch((error) => {
      console.log("No se pudo reproducir el audio:", ruta, error);
    });
  }

  function reproducirEfecto(ruta) {
    detenerEfectoAudio();

    const audio = new Audio(ruta);
    audio.volume = 0.85;
    efectoAudioRef.current = audio;

    audio.play().catch((error) => {
      console.log("No se pudo reproducir el efecto:", ruta, error);
    });
  }

  function detenerTodosLosAudios() {
    detenerMusicaIntro();
    detenerFondoJuego();
    detenerAudioActual();
    detenerEfectoAudio();
  }

  function entrarPresentacion() {
    detenerMusicaIntro();
    detenerFondoJuego();
    reproducirAudio("/audio/intro.wav");

    setPantalla("inicio");
    setPistaActual(0);
    setCodigoEncontrado([]);
    setSegundosRestantes(TIEMPO_TOTAL_SEGUNDOS);
    setTimerActivo(false);
  }

  function repetirIntro() {
    reproducirAudio("/audio/intro.wav");
  }

  function iniciarJuego() {
    detenerMusicaIntro();
    reproducirFondoJuego();
    reproducirAudio("/audio/pista-1.wav");

    setPantalla("pista");
    setPistaActual(0);
    setCodigoEncontrado([]);
    setSegundosRestantes(TIEMPO_TOTAL_SEGUNDOS);
    setTimerActivo(true);
  }

  function respuestaCorrecta() {
    reproducirEfecto("/audio/exito.wav");

    setTimeout(() => {
      detenerAudioActual();
      setCodigoEncontrado((prev) => [...prev, pista.respuestaCorrecta]);
      setPantalla("exito");
    }, 350);
  }

  function respuestaIncorrecta() {
    reproducirEfecto("/audio/reintento.wav");
  }

  function pasarSiguiente() {
    const esUltima = pistaActual === pistas.length - 1;

    if (esUltima) {
      setTimerActivo(false);
      detenerFondoJuego();
      reproducirAudio("/audio/logro.wav");
      setPantalla("final");
      return;
    }

    const siguientePista = pistaActual + 1;
    reproducirAudio(`/audio/pista-${siguientePista + 1}.wav`);

    setPistaActual(siguientePista);
    setPantalla("pista");
  }

  function repetirAudioPista() {
    reproducirAudio(`/audio/pista-${pistaActual + 1}.wav`);
  }

  function finalizarPorError() {
    setTimerActivo(false);
    detenerTodosLosAudios();
    setPantalla("gameover");
  }

  function reiniciarJuego() {
    detenerTodosLosAudios();

    setPantalla("home");
    setPistaActual(0);
    setCodigoEncontrado([]);
    setSegundosRestantes(TIEMPO_TOTAL_SEGUNDOS);
    setTimerActivo(false);

    setTimeout(() => {
      reproducirMusicaIntro();
    }, 150);
  }

  const codigoFinal =
    codigoEncontrado.length === pistas.length
      ? codigoEncontrado.join("")
      : pistas.map((item) => item.respuestaCorrecta).join("");

  return (
    <>
      {pantalla === "home" && <HomeScreen onEnter={entrarPresentacion} />}

      {pantalla === "inicio" && (
        <StartScreen onStart={iniciarJuego} onRepeatIntro={repetirIntro} />
      )}

      {pantalla === "pista" && (
        <ClueScreen
          pista={pista}
          pistaActual={pistaActual}
          totalPistas={pistas.length}
          segundosRestantes={segundosRestantes}
          onCorrectAnswer={respuestaCorrecta}
          onIncorrectAnswer={respuestaIncorrecta}
          onGameOver={finalizarPorError}
          onRepeatAudio={repetirAudioPista}
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
        <GameOverScreen onRestart={reiniciarJuego} />
      )}

      {pantalla === "tiempo" && (
        <TimeOverScreen onRestart={reiniciarJuego} />
      )}

      {pantalla === "final" && (
        <FinalScreen codigoFinal={codigoFinal} onRestart={reiniciarJuego} />
      )}
    </>
  );
}
