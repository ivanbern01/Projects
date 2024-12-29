import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./BinaryTree.module.css";

const BinaryTree = () => {
  const [levels, setLevels] = useState(0);
  const [values, setValues] = useState([]);
  const [traversals, setTraversals] = useState({ LRT: "", TLR: "", LTR: "" });

  const handleLevelsChange = (e) => {
    const value = Math.min(Math.max(1, parseInt(e.target.value) || 1), 5);
    setLevels(value);
    setValues(Array(2 ** value - 1).fill(""));
    setTraversals({ LRT: "", TLR: "", LTR: "" });
  };

  const handleValueChange = (index, value) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  const traverseTree = (index, order) => {
    if (index >= values.length || !values[index]) {
      return [];
    }
    const left = traverseTree(2 * index + 1, order);
    const right = traverseTree(2 * index + 2, order);

    if (order === "LRT") return [...left, ...right, values[index]]; // Post-order
    if (order === "TLR") return [values[index], ...left, ...right]; // Pre-order
    if (order === "LTR") return [...left, values[index], ...right]; // In-order

    return [];
  };

  const handleTraversal = () => {
    setTraversals({
      LRT: traverseTree(0, "LRT").join(", "),
      TLR: traverseTree(0, "TLR").join(", "),
      LTR: traverseTree(0, "LTR").join(", "),
    });
  };

  const renderTree = (index = 0) => {
    if (index >= values.length || !values[index]) {
      return null;
    }
    return (
      <div className={styles.node}>
        <div className={styles.circle}>{values[index]}</div>
        <div className={styles.children}>
          {renderTree(2 * index + 1)} {/* Left Child */}
          {renderTree(2 * index + 2)} {/* Right Child */}
        </div>
      </div>
    );
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Binary Tree Visualization</h1>
      <div className="form-group mt-4">
        <label>Enter Levels (1 to 5):</label>
        <input
          type="number"
          className="form-control"
          value={levels}
          onChange={handleLevelsChange}
        />
      </div>
      <div className="mt-4">
        <h4>Enter Node Values:</h4>
        <div className="d-flex flex-wrap">
          {values.map((value, index) => (
            <input
              key={index}
              type="text"
              className="form-control m-1"
              style={{ width: "60px" }}
              value={value}
              onChange={(e) => handleValueChange(index, e.target.value)}
            />
          ))}
        </div>
      </div>
      <div className={styles.tree}>{renderTree()}</div>
      <button className="btn btn-primary mt-4" onClick={handleTraversal}>
        Perform Traversals
      </button>
      <div className="mt-4">
        <h4>Traversal Results:</h4>
        <p>
          <strong>LRT (Post-order):</strong> {traversals.LRT}
        </p>
        <p>
          <strong>TLR (Pre-order):</strong> {traversals.TLR}
        </p>
        <p>
          <strong>LTR (In-order):</strong> {traversals.LTR}
        </p>
      </div>
    </div>
  );
};

export default BinaryTree;
