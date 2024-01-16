"use client";
import React, { useState, useEffect } from "react";
import Bird from "./../../components/Bird";
import Pipes from "./../../components/Pipes";
import { GameOverText } from "../../components/GameOverText";

const App = () => {
  const [birdPosition, setBirdPosition] = useState({ x: 50, y: 200 });
  const [pipes, setPipes] = useState<any[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const jump = () => {
    if (!gameOver && gameStarted) {
      setBirdPosition((prev) => ({ ...prev, y: prev.y - 60 }));
    } else if (!gameOver && !gameStarted) {
      // Start the game on the first jump
      setGameStarted(true);
      setScore(0);
    } else {
      // Restart the game
      setBirdPosition({ x: 50, y: 200 });
      setPipes([]);
      setGameOver(false);
      setGameStarted(true);
      setScore(0);
    }
  };

  const checkCollision = () => {
    const birdTop = birdPosition.y;
    const birdBottom = birdPosition.y + 50;
    const birdLeft = birdPosition.x;
    const birdRight = birdPosition.x + 50;

    pipes.forEach((pipe) => {
      const pipeTop = pipe.y;
      const pipeBottom = pipe.y + 600;
      const pipeLeft = pipe.x;
      const pipeRight = pipe.x + 100;

      const isColliding =
        birdRight > pipeLeft &&
        birdLeft < pipeRight &&
        birdBottom > pipeTop &&
        birdTop < pipeBottom;

      if (isColliding) {
        setGameOver(true);
        setGameStarted(false);
        return;
      }

      // Check if the bird has passed the pipe
      if (!pipe.passed && birdRight > pipeRight) {
        pipe.passed = true; // Mark the pipe as passed
        setScore((prevScore) => prevScore + 1);
      }
    });

    // Check if bird is out of the screen vertically
    if (birdBottom > 800 || birdTop < -170) {
      // Bird is out of bounds, end the game
      setGameOver(true);
      setGameStarted(false);
    }
  };

  useEffect(() => {
    checkCollision();
  }, [birdPosition, pipes, gameOver]);

  useEffect(() => {
    setPipes((prevPipes) =>
      prevPipes.map((pipe) => ({ ...pipe, passed: false }))
    );
  }, []);

  useEffect(() => {
    // Spacebar to jump
    const handleKeyDown = (e: any) => {
      if (
        e.key == " " ||
        e.code == "Space" ||      
        e.keyCode == 32      
      ) {
        jump();
        console.log('jump')
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    const gravity = setInterval(() => {
      setBirdPosition((prev) => ({ ...prev, y: prev.y + 5 }));
      checkCollision();
    }, 30);

    const pipeGenerator = setInterval(() => {
      if (!gameOver && gameStarted) {
        setPipes((prev) => [
          ...prev,
          { 
            x: 800,
            // heighth is a random number between 200 and 400px
            y: Math.floor(Math.random() * 200) + 200
          },
        ]);
      }
    }, 2000);

    const pipeMove = setInterval(() => {
      if (!gameOver && gameStarted) {
        setPipes((prev) => prev.map((pipe) => ({ ...pipe, x: pipe.x - 5 })));
      }
    }, 30);

    return () => {
      clearInterval(gravity);
      clearInterval(pipeGenerator);
      clearInterval(pipeMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameOver, gameStarted]);

  return (
    <div>
      <h1 className="title">crypto bird</h1>
      <p>score: {score}</p>
      <div className={`App ${gameOver ? "game-over" : ""}`} onClick={jump}>
        <Bird birdPosition={birdPosition} />
        {pipes.map((pipe, index) => (
          <Pipes key={index} pipePosition={pipe} />
        ))}
        {gameOver && <GameOverText />}
      </div>
    </div>
  );
};

export default App;
