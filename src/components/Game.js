import React, { Component } from "react";
import Board from "./Board";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turnoDeX: true,
      stepNumber: 0,
      historial: [{ cuadros: Array(9).fill(null) }],
    };
  }

  handleClick(i) {
    const historial = this.state.historial.slice(0, this.state.stepNumber + 1);
    const actual = historial[historial.length - 1];
    const cuadros = actual.cuadros.slice();
    const ganador = calcularGanador(cuadros);
    if (ganador || cuadros[i]) {
      return;
    }
    cuadros[i] = this.state.turnoDeX ? "X" : "O";
    this.setState({
      historial: historial.concat({
        cuadros: cuadros,
      }),
      turnoDeX: !this.state.turnoDeX,
      stepNumber: historial.length,
    });
  }

  jumpTo(step) {
    const historial = this.state.historial.slice(0, step + 1);
    this.setState({
      stepNumber: step,
      turnoDeX: step % 2 === 0,
      historial,
    });
  }

  render() {
    const historial = this.state.historial;
    const actual = historial[this.state.stepNumber];
    const ganador = calcularGanador(actual.cuadros);
    const movimientos = historial.map((step, movimiento) => {
      const descripcion = movimiento
        ? "Movimiento #" + movimiento
        : "Volver a comenzar";
      return historial.length !== movimiento + 1 ? (
        <div key={movimiento}>
          <button
            className="button"
            onClick={() => {
              this.jumpTo(movimiento);
            }}
          >
            {descripcion}
          </button>
        </div>
      ) : null;
    });

    let estado = ganador ? (
      <div className="ganador">El ganador es {ganador}</div>
    ) : (
      <div className="siguienteJugador">
        Turno de {this.state.turnoDeX ? "X" : "O"}
      </div>
    );

    return (
      <div className="container">
        <div className="game">
          <Board
            onClick={(i) => this.handleClick(i)}
            cuadros={actual.cuadros}
          />
        </div>
        <div>
          <div>{estado}</div>
          <div>{movimientos}</div>
        </div>
      </div>
    );
  }
}

function calcularGanador(cuadros) {
  const lineas = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lineas.length; i++) {
    const [a, b, c] = lineas[i];
    if (cuadros[a] && cuadros[a] === cuadros[b] && cuadros[b] === cuadros[c]) {
      return cuadros[a];
    }
  }
  return null;
}
