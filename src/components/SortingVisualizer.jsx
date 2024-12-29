import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./SortingVisualizer.module.css";

const SortingVisualizer = () => {
  const [numbers, setNumbers] = useState(Array(30).fill(""));
  const [results, setResults] = useState({});
  const [isSorting, setIsSorting] = useState(false);

  const handleNumberChange = (index, value) => {
    const newNumbers = [...numbers];
    newNumbers[index] = value.replace(/[^0-9-]/g, ""); // Allow only numbers
    setNumbers(newNumbers);
  };

  const handleSort = () => {
    setIsSorting(true);
    const numArray = numbers.map(Number);
    const results = {
      bubble: bubbleSort([...numArray]),
      insertion: insertionSort([...numArray]),
      selection: selectionSort([...numArray]),
      merge: mergeSort([...numArray]),
      quick: quickSort([...numArray]),
      heap: heapSort([...numArray]),
      shell: shellSort([...numArray]),
    };
    setResults(results);
    setIsSorting(false);
  };

  // Sorting Algorithms
  const bubbleSort = (arr) => {
    const animations = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
        animations.push([...arr]);
      }
    }
    return animations;
  };

  const insertionSort = (arr) => {
    const animations = [];
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
      animations.push([...arr]);
    }
    return animations;
  };

  const selectionSort = (arr) => {
    const animations = [];
    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIdx]) minIdx = j;
      }
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      animations.push([...arr]);
    }
    return animations;
  };

  const mergeSort = (arr) => {
    const animations = [];
    const merge = (left, right) => {
      const sorted = [];
      while (left.length && right.length) {
        if (left[0] < right[0]) {
          sorted.push(left.shift());
        } else {
          sorted.push(right.shift());
        }
        animations.push([...sorted, ...left, ...right]);
      }
      return [...sorted, ...left, ...right];
    };

    const mergeSortHelper = (arr) => {
      if (arr.length <= 1) return arr;
      const mid = Math.floor(arr.length / 2);
      const left = mergeSortHelper(arr.slice(0, mid));
      const right = mergeSortHelper(arr.slice(mid));
      return merge(left, right);
    };

    return mergeSortHelper(arr);
  };

  const quickSort = (arr) => {
    const animations = [];
    const quickSortHelper = (arr) => {
      if (arr.length <= 1) return arr;
      const pivot = arr[arr.length - 1];
      const left = [];
      const right = [];
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) left.push(arr[i]);
        else right.push(arr[i]);
      }
      animations.push([...left, pivot, ...right]);
      return [...quickSortHelper(left), pivot, ...quickSortHelper(right)];
    };
    return quickSortHelper(arr);
  };

  const heapSort = (arr) => {
    const animations = [];
    const heapify = (arr, n, i) => {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < n && arr[left] > arr[largest]) largest = left;
      if (right < n && arr[right] > arr[largest]) largest = right;

      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
      }
    };

    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
      heapify(arr, arr.length, i);
    }

    for (let i = arr.length - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      heapify(arr, i, 0);
      animations.push([...arr]);
    }
    return animations;
  };

  const shellSort = (arr) => {
    const animations = [];
    for (let gap = Math.floor(arr.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < arr.length; i++) {
        const temp = arr[i];
        let j;
        for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
          arr[j] = arr[j - gap];
        }
        arr[j] = temp;
        animations.push([...arr]);
      }
    }
    return animations;
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Sorting Visualizer</h1>
      <div className="mt-4">
        <h4>Enter 30 Numbers:</h4>
        <div className="d-flex flex-wrap">
          {numbers.map((num, index) => (
            <input
              key={index}
              type="text"
              className="form-control m-1"
              style={{ width: "60px" }}
              value={num}
              onChange={(e) => handleNumberChange(index, e.target.value)}
            />
          ))}
        </div>
      </div>
      <button
        className="btn btn-primary mt-4"
        onClick={handleSort}
        disabled={isSorting}
      >
        Sort
      </button>
      {Object.keys(results).length > 0 && (
        <div className="mt-4">
          <h4>Sorting Results:</h4>
          {Object.entries(results).map(([method, sortedArr], idx) => (
            <div key={idx} className="mt-3">
              <strong>{method.charAt(0).toUpperCase() + method.slice(1)}:</strong>
              <p>{JSON.stringify(sortedArr)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortingVisualizer;
