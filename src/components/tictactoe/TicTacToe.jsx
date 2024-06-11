import React, { useRef, useState, useEffect } from "react";
import "../tictactoe/TicTacToe.css";
import Circle from "../assets/Circle";
import Cross from "../assets/Cross";

const initialData = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [data, setData] = useState(initialData);
  const [winner, setWinner] = useState(null);

  const titleRef = useRef(null);

  const toggle = (e, num) => {
    if (lock || data[num]) {
      return;
    }
    const newData = [...data];
    if (count % 2 === 0) {
      newData[num] = "x";
    } else {
      newData[num] = "o";
    }
    setData(newData);
    setCount(count + 1);
    checkWin(newData);
  };

  const checkWin = (newData) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        newData[a] &&
        newData[a] === newData[b] &&
        newData[a] === newData[c]
      ) {
        won(newData[a]);
        return;
      }
    }
  };

  const won = (winner) => {
    setLock(true);
    setWinner(winner);
  };

  useEffect(() => {
    if (winner) {
      titleRef.current.innerHTML = `${winner.toUpperCase()} wins!`;
    }
  }, [winner]);

  const resetGame = () => {
    setData(initialData);
    setCount(0);
    setLock(false);
    setWinner(null);
    titleRef.current.innerHTML = "Tic Tac Toe";
  };

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>
        Tic Tac Toe
      </h1>
      <div className="board">
        {[0, 1, 2].map((num) => (
          <div key={num} className="row">
            {[num * 3, num * 3 + 1, num * 3 + 2].map((index) => (
              <div
                key={index}
                className="boxes"
                onClick={(e) => toggle(e, index)}
              >
                {data[index] === "x" ? (
                  <Cross />
                ) : data[index] === "o" ? (
                  <Circle />
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className="button" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
