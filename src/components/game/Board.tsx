import React, { Dispatch, SetStateAction } from "react";
import { julee } from "../layout/Header";
import { GameMove } from "@/types";

const Board = ({
  gameMove,
  setGameMove,
  socket,
  piece,
  turn,
  setTurn,
}: {
  gameMove: GameMove;
  setGameMove: Dispatch<SetStateAction<GameMove | undefined>>;
  setTurn: Dispatch<SetStateAction<string>>;
  socket: WebSocket | null;
  piece: string;
  turn: string
}) => {
  const playMove = (index: number) => {
    const newBoard = gameMove.board1d;
    const oldBoard = [...gameMove.board1d];
    const newTurn = piece == "x" ? "o" : "x"
    if (newBoard[index] == "" && turn == piece) {
      newBoard[index] = piece;
      console.log(index);
      console.log(newBoard);
      setGameMove((prev) =>
        prev
          ? {
              ...prev,
              index: index,
              board1d: newBoard,
            }
          : undefined
      );
      setTurn(newTurn)

      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            index: index,
            turn: gameMove.turn,
            status: gameMove.status,
            board1d: oldBoard,
            board3d: gameMove.board3d,
            type: gameMove.type,
          })
        );
      }
    }
  };
  return (
    <div>
      <div
        className={`w-fit p-3 mx-auto rounded-md border shadow-md border-dark2 grid grid-cols-3 gap-3 ${julee.className}`}
      >
        {gameMove.board1d.map((g, index) => (
          <div
            onClick={() => playMove(index)}
            className={`tile ${g != "" ? "border-yellow-300" : ""} ${
              g == "x" ? "text-primary1" : "text-white"
            }`}
          >
            {g.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
