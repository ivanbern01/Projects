import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./TowersOfHanoi.module.css";

const TowersOfHanoi = () => {
  const [towers, setTowers] = useState([[5, 4, 3, 2, 1], [], []]);
  const [moves, setMoves] = useState([]);
  const [moveIndex, setMoveIndex] = useState(0);

  const solveTowers = (n, source, auxiliary, destination, result = []) => {
    if (n === 0) return;
    solveTowers(n - 1, source, destination, auxiliary, result);
    result.push([source, destination]);
    solveTowers(n - 1, auxiliary, source, destination, result);
    return result;
  };

  const startSolving = () => {
    const result = solveTowers(5, 0, 1, 2);
    setMoves(result);
    setMoveIndex(0);
    executeMoves(result, 0);
  };

  const executeMoves = (result, index) => {
    if (index >= result.length) return;
    setTimeout(() => {
      const [source, destination] = result[index];
      const newTowers = [...towers];
      const disk = newTowers[source].pop();
      newTowers[destination].push(disk);
      setTowers(newTowers);
      setMoveIndex(index + 1);
      executeMoves(result, index + 1);
    }, 500);
  };

  return (
    <div className={`container ${styles.container}`}>
      <h1 className="text-center mb-4">Towers of Hanoi</h1>
      <div className={styles.towerContainer}>
        {towers.map((tower, index) => (
          <div key={index} className={styles.tower}>
            {tower.map((disk, idx) => (
              <div key={idx} className={`${styles.disk} ${styles["disk" + disk]}`}>
                {disk}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button
        onClick={startSolving}
        className="btn btn-primary mt-4"
        disabled={moveIndex < moves.length && moves.length > 0}
      >
        {moveIndex < moves.length ? "Solving..." : "Start"}
      </button>
      <div className={styles.moveContainer}>
        {moveIndex < moves.length ? `Move: ${moveIndex + 1}/${moves.length}` : ""}
      </div>
    </div>
  );
};

export default TowersOfHanoi;
