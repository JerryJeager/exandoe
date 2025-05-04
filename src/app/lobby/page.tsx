"use client";

import { useState } from "react";
import { ArrowRight, UserCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import { BASE_URL2 } from "@/data";

// Mock data for online users

export default function LobbyPage() {
  const [username, setUsername] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  // Simulate connecting to the game
  const handleConnect = () => {
    if (username.trim()) {
      const ws = new WebSocket(
        `${BASE_URL2()}/users/lobby?username=${username}`
      );
      ws.onopen = () => {
        console.log("WebSocket connection opened.");
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
        if (data?.type == "online_users") {
          setIsConnected(true);
          setOnlineUsers(data?.users);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = (event) => {
        console.log("WebSocket closed.", event);
        console.log("Code:", event.code, "Reason:", event.reason);
      };
      setSocket(ws);

      if (socket && socket.readyState === WebSocket.OPEN) {
    //   socket.send(
    //     JSON.stringify({
    //       receiver_id: selectedUser.id,
    //       content: newMessage,
    //     })
    //   );
    }
    }
  };

  // Handle challenge
  const handleChallenge = (username: string) => {
    // const user = onlineUsers.find((user) => user.id === userId);
    // alert(`Challenging ${user?.username}...`);
  };

  return (
    <div className="bg-dark1">
      <Header />
      <div className="min-h-screen  p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8"> Lobby</h1>

          {!isConnected ? (
            <div className="bg-dark2  border-slate-300 rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Join the Game</h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md  text-primary caret-primary outline-none focus:ring-2 focus:ring-black"
                />
                <button
                  onClick={handleConnect}
                  disabled={!username.trim()}
                  className="px-6 py-2 bg-primary text-white rounded-md  transition-colors disabled:cursor-not-allowed flex items-center justify-center"
                >
                  Connect <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-dark2  border-secondary  rounded-lg shadow-sm p-6 mb-4">
              <div className="flex items-center gap-2">
                <UserCircle className="h-6 w-6" />
                <p className="font-medium">
                  Connected as: <span className="font-bold">{username}</span>
                </p>
              </div>
            </div>
          )}

          <div className="bg-dark2 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Online Players</h2>

            {isConnected ? (
              <div className="divide-y">
                {onlineUsers.map((user) => (
                  <div
                    key={user}
                    className="py-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <UserCircle className="h-5 w-5 text-gray-500" />
                      <span>{user}</span>
                    </div>
                    <button
                      onClick={() => handleChallenge(user)}
                      className="px-4 py-1.5 bg-gray-100 text-gray-800 text-sm rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Challenge
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Connect to see online players
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
