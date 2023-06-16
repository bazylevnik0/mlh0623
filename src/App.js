import "./styles.css";
import { useState } from "react";

export default function App() {
  let A, B, M;
  function init() {
    A = [];
    B = [];
    M = [];
    for (let y = 0; y < 20; y++) {
      M[y] = [];
      for (let x = 0; x < 30; x++) {
        M[y][x] = {};
      }
    }
  }
  init();
  const [Avalue, setAvalue] = useState();
  const [Bvalue, setBvalue] = useState();
  const [Acolor, setAcolor] = useState();
  const [Bcolor, setBcolor] = useState();
  function changeValue(e) {
    switch (e.target.id) {
      case "Avalue":
        setAvalue(e.target.value);
        break;
      case "Bvalue":
        setBvalue(e.target.value);
        break;
      case "Acolor":
        setAcolor(e.target.value);
        break;
      case "Bcolor":
        setBcolor(e.target.value);
        break;
    }
  }
  function set() {
    //set A
    for (let y = 0; y < 20; y++) {
      A[y] = [];
      for (let x = 0; x < 20; x++) {
        A[y][x] = { v: +Avalue };
      }
    }
    //set B
    for (let y = 0; y < 20; y++) {
      B[y] = [];
      for (let x = 0; x < 20; x++) {
        B[y][x] = { v: +Bvalue };
      }
    }
    //set M to start position
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 20; x++) {
        M[y][x].a = A[y][x];
      }
      for (let x = 10; x < 30; x++) {
        M[y][x].b = B[y][x - 10];
      }
    }
    draw();
  }
  function draw() {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 300, 200);

    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 30; x++) {
        if (M[y][x].a && M[y][x].a.v == 1) {
          ctx.fillStyle = "#" + Acolor;
          ctx.strokeStyle = "black";
          ctx.fillRect(0 + x * 10, 0 + y * 10, 10, 10);
          ctx.strokeRect(0 + x * 10, 0 + y * 10, 10, 10);
          ctx.stroke();
        }
        if (M[y][x].b && M[y][x].b.v == 1) {
          ctx.fillStyle = "#" + Bcolor;
          ctx.strokeStyle = "black";
          ctx.fillRect(0 + x * 10, 0 + y * 10, 10, 10);
          ctx.strokeRect(0 + x * 10, 0 + y * 10, 10, 10);
          ctx.stroke();
        }
      }
    }
  }
  return (
    <div className="App">
      <h1>Hello MLH</h1>
      <h2>Let's check boolean logic for polygons</h2>
      <div className="Box">
        <div className="Input">
          <label>A: </label>
          <input
            id="Avalue"
            value={Avalue}
            onChange={changeValue}
            className="InputValue"
            type="text"
            maxLength="1"
          ></input>
          <input
            id="Acolor"
            value={Acolor}
            onChange={changeValue}
            className="InputColor"
            type="text"
            maxLength="6"
          ></input>
          <label>B: </label>
          <input
            id="Bvalue"
            value={Bvalue}
            onChange={changeValue}
            className="InputValue"
            type="text"
            maxLength="1"
          ></input>
          <input
            id="Bcolor"
            value={Bcolor}
            onChange={changeValue}
            className="InputColor"
            type="text"
            maxLength="6"
          ></input>
          <br />
          <button onClick={set}>set</button>
        </div>
        <div className="Draw">
          <canvas className="Canvas" width="300" height="200"></canvas>
        </div>
        <div className="Control">
          <button>A not B</button>
          <button>B not A</button>
          <br />
          <button>A or B</button>
          <button>A and B</button>
          <button>B xor A</button>
          <br />
        </div>
        <p>
          *inputs A and B in form: value - 0,1 and color - rrggbb(16)
          <br />
          "set" button for load to canvas, buttons below for changing logic
          after
        </p>
      </div>
    </div>
  );
}
