import { useEffect, useMemo, useState } from "react";
import "./App.css";

const gameBlocks = ["😄", "😼", "💗", "🗻", "🗿","💀","👻","😵","👋"];

function App() {
  const [emo, setEmo] = useState([]);
  const isComplete = useMemo(() => {
    if(emo.every(emoji=>emoji.isSolved)){
      return true;
    }
    return false;
  }, [emo])

  const start = () => {
    const dupliBlocks = gameBlocks.concat(gameBlocks);
    const newBlocks = [];

    while (newBlocks.length < gameBlocks.length * 2) {
      var randomIndex = Math.floor(Math.random() * dupliBlocks.length);
      newBlocks.push({
        emoji: dupliBlocks[randomIndex],
        isFlipped: false,
        isSolved: false,
        position: newBlocks.length,
      });
      dupliBlocks.splice(randomIndex, 1);
    }
    setEmo(newBlocks);
  };

  const handleActive = (data) => {
    const flippedData = emo.filter((data) => data.isFlipped && !data.isSolved);
    if (flippedData.length === 2) return;

    const newEmo = emo.map((emo) => {
      if (emo.position === data.position) {
        emo.isFlipped = !emo.isFlipped;
      }
      return emo;
    });
    setEmo(newEmo);
  };

  const gameLogic = () => {
    const flippedData = emo.filter((data) => data.isFlipped && !data.isSolved);
    if (flippedData.length === 2) {
      setTimeout(() => {
        if (flippedData[0].emoji === flippedData[1].emoji) {
          const newEmo = emo.map((emo) => {
            if (
              emo.position === flippedData[1].position ||
              emo.position === flippedData[0].position
            ) {
              emo.isSolved = true;
              gameTrack +=1 
            }
            return emo;
          });

          setEmo(newEmo);

        } else {
          const newEmo = emo.map((emo) => {
            if (
              emo.position === flippedData[1].position ||
              emo.position === flippedData[0].position
            ) {
              emo.isFlipped = false;
            }
            return emo;
          });

          setEmo(newEmo);
        }
      }, 800);
    }
  };

  const gameFinished = () => {
    if(emo.length > 0){
      if(emo.every(emoji=>emoji.isSolved)){
        
      }
    }
  }

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    gameLogic();
    gameFinished();
  }, [emo]);

  return (
    <main>
      <h1>Memory Game</h1>
      <div className="container">
        {emo.map((emo, i) => (
          <div
            className={`flip-card ${emo.isFlipped || emo.isSolved ? "active" : ""}`}
            key={i}
            onClick={() => handleActive(emo)}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front"></div>
              <div className={`flip-card-back `}>
                <p>{emo.emoji}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
