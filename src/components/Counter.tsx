import { JSX, useState, useEffect } from "react";
import "./Counter.css";

export default function Counter(): JSX.Element {
  const [count, setCount] = useState<number>(() => {
    return Number(localStorage.getItem("count") || 0);
  });

  const [incrementValue, setIncrementValue] = useState(0);

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("count", count.toString());
  }, [count]);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  // ✅ Keyboard Shortcuts: Listen for key presses
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        setCount((prev) => prev + incrementValue); // Increase count
      } else if (event.key === "ArrowDown") {
        setCount((prev) => Math.max(prev - incrementValue, 0)); // Decrease but not below 0
      } else if (event.key === "r" || event.key === "R") {
        setCount(0); // Reset when "r" is pressed
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [incrementValue]); // Re-run when incrementValue changes

  return (
    <div className={`counter-container ${darkMode ? "dark" : "light"}`}>
      <div className="buttons">
        <button
          className="button-minus"
          onClick={() => setCount(Math.max(0, count - incrementValue))}
        >
          -
        </button>
        <span className="count-display">{count}</span>
        <button
          className="button-plus"
          onClick={() => setCount(count + incrementValue)}
        >
          +
        </button>
      </div>

      <button className="button-reset" onClick={() => setCount(0)}>
        RESET
      </button>
      <div className="set-increment-container">
        <label>Increment Value</label>
        <input
          className="increment-value"
          type="number"
          value={incrementValue}
          onChange={(e) => setIncrementValue(Number(e.target.value) || 0)}
          placeholder="Set Increment value"
        />
      </div>

      <button
        className={`toggle-theme-dark ${darkMode}`}
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
}
