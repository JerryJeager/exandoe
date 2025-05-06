"use client";
import Board from "@/components/game/Board";
import Header from "@/components/layout/Header";
import { BASE_URL2 } from "@/data";
import { GameMove } from "@/types";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import Link from "next/link";

const Room = () => {
  const [gameMove, setGameMove] = useState<GameMove>();
  const params = useParams<{ room: string }>();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [turn, setTurn] = useState("");
  const searchParams = useSearchParams();
  useEffect(() => {
    const ws = new WebSocket(
      `${BASE_URL2()}/games/play?room=${
        params.room
      }&username=${searchParams.get("user")}`
    );
    setSocket(ws);
    ws.onopen = () => {
      console.log("Websocket connection opened.");
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      setGameMove(data as GameMove);
      setTurn(data?.turn);
      setDialogOpen(data?.status !== "stale");
    };
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = (event) => {
      console.log("WebSocket closed.", event);
      console.log("Code:", event.code, "Reason:", event.reason);
    };

    return () => {
      ws.close();
      setSocket(null);
    };
  }, []);
  return (
    <div className="bg-dark1">
      <Header />
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl text-white font-bold mb-8">
            {" "}
            You are Playing as {searchParams.get("piece")?.toUpperCase() || ""}
          </h1>
          {turn && (
            <p className="text-white p-2 lg:p-3 bg-dark2 rounded-md w-fit border">
              {turn.toUpperCase()} Turn
            </p>
          )}
          {gameMove && (
            <Board
              socket={socket}
              setGameMove={setGameMove}
              gameMove={gameMove}
              piece={searchParams.get("piece") || ""}
              turn={turn}
              setTurn={setTurn}
            />
          )}
        </div>
      </div>

      {gameMove && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="bg-dark2 text-white border-none">
            <DialogHeader>
              <DialogTitle className="text-white">Game is Game</DialogTitle>
              <DialogClose className="text-white hover:text-gray-300 absolute right-4 top-4" />
            </DialogHeader>
            <div className="mb-3 text-center text-xl font-bold">
              {gameMove.status.toUpperCase()}
            </div>
            <div className="flex justify-center">
              <Link
                href="/lobby"
                className="px-4 py-2 text-sm rounded-md bg-primary1 w-fit mx-auto text-white hover:bg-primary1/90"
              >
                Back to Lobby
              </Link>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Room;
