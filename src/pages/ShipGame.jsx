import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Grid from "../components/shipgame/Grid";
import GuideModal from "../components/shipgame/GuideModal";
import {
  GRID_SIZE,
  SHIPS,
  placeShips,
  checkHit,
  checkShipSunk,
  calculateBotAttack,
  allShipsSunk,
} from "../components/shipgame/utils/gameLogic";
import "../components/shipgame/styles/App.css";
import "../components/shipgame/Grid.css";
import "../components/shipgame/GuideModal.css";

const ShipGame = () => {
  const navigate = useNavigate();
  const [playerShips, setPlayerShips] = useState([]);
  const [botShips, setBotShips] = useState([]);
  const [playerAttacks, setPlayerAttacks] = useState({});
  const [botAttacks, setBotAttacks] = useState({});
  const [currentTurn, setCurrentTurn] = useState("player");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showGuide, setShowGuide] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [botTurnInProgress, setBotTurnInProgress] = useState(false);
  const [botTargeting, setBotTargeting] = useState({});

  // Initialize game on mount
  useEffect(() => {
    initializeGame();
  }, []);

  // Handle bot turn when it's bot's turn
  useEffect(() => {
    if (currentTurn === "bot" && !gameOver && !botTurnInProgress) {
      const timer = setTimeout(() => {
        handleBotTurn();
      }, 1000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTurn, gameOver, botTurnInProgress]);

  const initializeGame = () => {
    const newPlayerShips = placeShips();
    const newBotShips = placeShips();

    setPlayerShips(newPlayerShips);
    setBotShips(newBotShips);
    setPlayerAttacks({});
    setBotAttacks({});
    setCurrentTurn("player");
    setGameOver(false);
    setWinner(null);
    setBotTargeting({});
  };

  const handlePlayerAttack = async (row, col) => {
    if (gameOver || currentTurn !== "player" || botTurnInProgress) {
      return;
    }

    const position = `${row}-${col}`;

    // Check if already attacked
    if (playerAttacks[position]) {
      return;
    }

    // Check if hit
    const { hit, shipIndex } = checkHit(botShips, position);

    // Update attack record
    const newPlayerAttacks = {
      ...playerAttacks,
      [position]: { hit, sunk_ship: null },
    };

    let sunkShip = null;
    let updatedBotShips = botShips;

    if (hit && shipIndex !== null) {
      // Add hit to ship
      updatedBotShips = botShips.map((ship, idx) => {
        if (idx === shipIndex) {
          const newHits = [...ship.hits, position];
          const isSunk = checkShipSunk({ ...ship, hits: newHits });
          return {
            ...ship,
            hits: newHits,
            sunk: isSunk,
          };
        }
        return ship;
      });

      // Check if ship was sunk
      const hitShip = updatedBotShips[shipIndex];
      if (hitShip.sunk) {
        sunkShip = hitShip;
        newPlayerAttacks[position].sunk_ship = sunkShip;
      }
    }

    setPlayerAttacks(newPlayerAttacks);
    setBotShips(updatedBotShips);

    // Check if player won
    if (allShipsSunk(updatedBotShips)) {
      setGameOver(true);
      setWinner("player");
      setCurrentTurn(null);
      setShowGameOver(true);
      return;
    }

    // Handle turn switching
    if (hit) {
      // Player gets another turn on hit
      setCurrentTurn("player");
    } else {
      // Switch to bot's turn on miss
      setCurrentTurn("bot");
    }
  };

  const handleBotTurn = useCallback(() => {
    if (gameOver || currentTurn !== "bot" || botTurnInProgress) {
      return;
    }

    setBotTurnInProgress(true);

    setTimeout(() => {
      // Calculate bot attack
      const attack = calculateBotAttack(botAttacks, botTargeting);
      const { row, col } = attack;
      const position = `${row}-${col}`;

      // Check if hit
      const { hit, shipIndex } = checkHit(playerShips, position);

      // Update attack record
      const newBotAttacks = {
        ...botAttacks,
        [position]: { hit, sunk_ship: null },
      };

      let sunkShip = null;
      let updatedPlayerShips = playerShips;
      let newBotTargeting = { ...botTargeting };

      if (hit && shipIndex !== null) {
        // Add hit to ship
        updatedPlayerShips = playerShips.map((ship, idx) => {
          if (idx === shipIndex) {
            const newHits = [...ship.hits, position];
            const isSunk = checkShipSunk({ ...ship, hits: newHits });
            return {
              ...ship,
              hits: newHits,
              sunk: isSunk,
            };
          }
          return ship;
        });

        // Update bot targeting
        newBotTargeting = {
          huntMode: true,
          lastHit: position,
        };

        // Check if ship was sunk
        const hitShip = updatedPlayerShips[shipIndex];
        if (hitShip.sunk) {
          sunkShip = hitShip;
          newBotAttacks[position].sunk_ship = sunkShip;
          // Reset hunt mode when ship is sunk
          newBotTargeting = {};
        }
      } else {
        // Miss - keep hunt mode if we were hunting
        if (newBotTargeting.huntMode) {
          // Continue hunting around last hit
        }
      }

      setBotAttacks(newBotAttacks);
      setPlayerShips(updatedPlayerShips);
      setBotTargeting(newBotTargeting);

      // Check if bot won
      if (allShipsSunk(updatedPlayerShips)) {
        setGameOver(true);
        setWinner("bot");
        setCurrentTurn(null);
        setShowGameOver(true);
        setBotTurnInProgress(false);
        return;
      }

      // Handle turn switching
      if (hit) {
        // Bot gets another turn on hit
        setCurrentTurn("bot");
      } else {
        // Switch to player's turn on miss
        setCurrentTurn("player");
      }

      setBotTurnInProgress(false);
    }, 1000);
  }, [
    gameOver,
    currentTurn,
    botTurnInProgress,
    botAttacks,
    botTargeting,
    playerShips,
  ]);

  const resetGame = () => {
    initializeGame();
    setShowGameOver(false);
  };

  const getPlayerShipsLeft = () => {
    return playerShips.filter((ship) => !ship.sunk).length;
  };

  const getBotShipsLeft = () => {
    return botShips.filter((ship) => !ship.sunk).length;
  };

  const getStatusMessage = () => {
    if (gameOver) {
      return winner === "player" ? "You won! 🎉" : "Bot won! 😢";
    }
    if (currentTurn === "player") {
      return "Your turn! Click on the bot's grid to attack.";
    }
    return "Bot's turn...";
  };

  const getStatusClass = () => {
    if (gameOver) return "game-over";
    if (currentTurn === "player") return "your-turn";
    return "bot-turn";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all border border-white/30 backdrop-blur-sm"
          style={{ marginBottom: "20px" }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        <div className="app">
          <div className="game-container">
            <h1 className="game-title">🚢 Battleship vs Bot 🤖</h1>

            <div className={`status-info ${getStatusClass()}`}>
              <span>{getStatusMessage()}</span>
            </div>

            <div className="ships-info">
              <div>
                <strong>Your Ships:</strong> <span>{getPlayerShipsLeft()}</span>
              </div>
              <div>
                <strong>Bot Ships:</strong> <span>{getBotShipsLeft()}</span>
              </div>
            </div>

            <div className="fleets-container">
              <div className="bot-section">
                <h2 className="section-title">Bot's Fleet (Click to Attack)</h2>
                <Grid
                  grid={null}
                  attacks={playerAttacks}
                  ships={botShips}
                  type="bot"
                  onCellClick={handlePlayerAttack}
                  disabled={currentTurn !== "player" || gameOver}
                />
              </div>

              <div className="player-section">
                <h2 className="section-title">Your Fleet</h2>
                <Grid
                  grid={null}
                  attacks={botAttacks}
                  ships={playerShips}
                  type="player"
                  disabled={true}
                />
              </div>
            </div>

            <div className="btn-container">
              <button className="btn btn-danger btn-lg" onClick={resetGame}>
                Reset Game
              </button>
              <button
                className="btn btn-info btn-lg"
                onClick={() => setShowGuide(true)}
              >
                📖 Guide
              </button>
            </div>
          </div>

          {showGameOver && (
            <div
              className="modal-overlay"
              onClick={() => setShowGameOver(false)}
            >
              <div
                className="modal-content game-over-modal"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <h5 className="modal-title">Game Over</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowGameOver(false)}
                  >
                    ×
                  </button>
                </div>
                <div className="modal-body">
                  <p>{getStatusMessage()}</p>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setShowGameOver(false);
                      resetGame();
                    }}
                  >
                    Play Again
                  </button>
                </div>
              </div>
            </div>
          )}

          <GuideModal show={showGuide} onClose={() => setShowGuide(false)} />
        </div>
      </div>
    </div>
  );
};

export default ShipGame;
