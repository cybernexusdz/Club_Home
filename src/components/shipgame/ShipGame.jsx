import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "./Grid";
import GuideModal from "./GuideModal";
import {
  createEmptyGrid,
  placeShips,
  checkHit,
  checkShipSunk,
  calculateBotAttack,
  allShipsSunk,
} from "./utils/gameLogic";
import "./styles/App.css";
import { Home, BookOpen, RotateCcw } from "lucide-react";

function ShipGame() {
  const navigate = useNavigate();
  const [playerGrid, setPlayerGrid] = useState(createEmptyGrid());
  const [botGrid, setBotGrid] = useState(createEmptyGrid());
  const [playerShips, setPlayerShips] = useState([]);
  const [botShips, setBotShips] = useState([]);
  const [playerAttacks, setPlayerAttacks] = useState({});
  const [botAttacks, setBotAttacks] = useState({});
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showGuide, setShowGuide] = useState(false);
  const [botTargeting, setBotTargeting] = useState({ huntMode: false, lastHit: null });

  // Initialize game
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const newPlayerShips = placeShips();
    const newBotShips = placeShips();
    setPlayerShips(newPlayerShips);
    setBotShips(newBotShips);
    setPlayerGrid(createEmptyGrid());
    setBotGrid(createEmptyGrid());
    setPlayerAttacks({});
    setBotAttacks({});
    setIsPlayerTurn(true);
    setGameOver(false);
    setWinner(null);
    setBotTargeting({ huntMode: false, lastHit: null });
  };

  const handlePlayerAttack = (row, col) => {
    if (!isPlayerTurn || gameOver) return;

    const position = `${row}-${col}`;
    if (playerAttacks[position]) return; // Already attacked

    const { hit, shipIndex } = checkHit(botShips, position);
    const newAttacks = { ...playerAttacks, [position]: { hit } };

    if (hit) {
      const updatedBotShips = [...botShips];
      updatedBotShips[shipIndex].hits.push(position);
      updatedBotShips[shipIndex].sunk = checkShipSunk(updatedBotShips[shipIndex]);
      setBotShips(updatedBotShips);

      if (allShipsSunk(updatedBotShips)) {
        setGameOver(true);
        setWinner("player");
        return;
      }
    }

    setPlayerAttacks(newAttacks);
    setIsPlayerTurn(false);

    // Bot's turn after a short delay
    setTimeout(() => {
      botAttack();
    }, 1000);
  };

  const botAttack = () => {
    if (gameOver) return;

    const attack = calculateBotAttack(botAttacks, botTargeting);
    const position = `${attack.row}-${attack.col}`;

    const { hit, shipIndex } = checkHit(playerShips, position);
    const newAttacks = { ...botAttacks, [position]: { hit } };

    if (hit) {
      const updatedPlayerShips = [...playerShips];
      updatedPlayerShips[shipIndex].hits.push(position);
      updatedPlayerShips[shipIndex].sunk = checkShipSunk(updatedPlayerShips[shipIndex]);
      setPlayerShips(updatedPlayerShips);

      // Update bot targeting for next attack
      setBotTargeting({
        huntMode: true,
        lastHit: position,
      });

      if (allShipsSunk(updatedPlayerShips)) {
        setGameOver(true);
        setWinner("bot");
        return;
      }

      // Bot gets another turn
      setTimeout(() => {
        botAttack();
      }, 1000);
    } else {
      // Bot missed, player's turn
      setBotTargeting({ huntMode: false, lastHit: null });
      setIsPlayerTurn(true);
    }

    setBotAttacks(newAttacks);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200/30 to-base-100 py-8 px-4">
      <div className="app">
        <div className="game-container">
          <h1 className="game-title text-base-content">Battleship Game</h1>
          
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            <button
              onClick={() => navigate("/")}
              className="btn btn-secondary"
            >
              Back to Home
            </button>
            <button
              onClick={() => setShowGuide(true)}
              className="btn btn-info"
            >
              How to Play
            </button>
          </div>

          <div
            className={`status-info ${
              gameOver
                ? "game-over"
                : isPlayerTurn
                ? "your-turn"
                : "bot-turn"
            }`}
          >
            {gameOver
              ? winner === "player"
                ? "🎉 You Won! Congratulations!"
                : "😔 Bot Won! Better luck next time!"
              : isPlayerTurn
              ? "Your turn! Click on the bot's grid to attack."
              : "🤖 Bot's Turn - Please wait..."}
          </div>

          <div className="fleets-container">
            <div className="bot-section">
              <div className="ships-info-inline">
                <strong>Your Ships {playerShips.filter((s) => !s.sunk).length}</strong>
              </div>
              <h2 className="section-title">Enemy Fleet</h2>
              <Grid
                grid={botGrid}
                attacks={playerAttacks}
                ships={botShips}
                type="bot"
                onCellClick={handlePlayerAttack}
                disabled={!isPlayerTurn || gameOver}
              />
            </div>

            <div className="player-section">
              <div className="ships-info-inline">
                <strong>Bot Ships {botShips.filter((s) => !s.sunk).length}</strong>
              </div>
              <h2 className="section-title">Your Fleet</h2>
              <Grid
                grid={playerGrid}
                attacks={botAttacks}
                ships={playerShips}
                type="player"
                disabled={true}
              />
            </div>
          </div>
        </div>
      </div>

      <GuideModal show={showGuide} onClose={() => setShowGuide(false)} />
    </div>
  );
}

export default ShipGame;

