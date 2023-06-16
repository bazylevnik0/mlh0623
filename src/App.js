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
  const [Acolor, setAcolor] = useState();
  const [Bcolor, setBcolor] = useState();
  function changeValue(e) {
    switch (e.target.id) {
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
        A[y][x] = { v: 1 };
      }
    }
    //set B
    for (let y = 0; y < 20; y++) {
      B[y] = [];
      for (let x = 0; x < 20; x++) {
        B[y][x] = { v: 1 };
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
  function fAnotB() {
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 30; x++) {
        if (M[y][x].a) M[y][x].a.v = 1;
        if (M[y][x].b) M[y][x].b.v = 0;
        if (M[y][x].a && M[y][x].b) {
          M[y][x].a.v = 0;
          M[y][x].b.v = 0;
        }
      }
    }
    draw();
  }
  function fBnotA() {
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 30; x++) {
        if (M[y][x].a) M[y][x].a.v = 0;
        if (M[y][x].b) M[y][x].b.v = 1;
        if (M[y][x].a && M[y][x].b) {
          M[y][x].a.v = 0;
          M[y][x].b.v = 0;
        }
      }
    }
    draw();
  }
  function fAorB() {
    let step = 0;
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 30; x++) {
        if (M[y][x].a) M[y][x].a.v = 1;
        if (M[y][x].b) M[y][x].b.v = 1;
        if (M[y][x].a && M[y][x].b) {
          if (step % 2) {
            M[y][x].a.v = 1;
            M[y][x].b.v = 0;
          } else {
            M[y][x].a.v = 0;
            M[y][x].b.v = 1;
          }
          step++;
        }
      }
    }
    draw();
  }
  function fAandB() {
    let step = 0;
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 30; x++) {
        if (M[y][x].a) M[y][x].a.v = 0;
        if (M[y][x].b) M[y][x].b.v = 0;
        if (M[y][x].a && M[y][x].b) {
          if (step % 2) {
            M[y][x].a.v = 1;
            M[y][x].b.v = 0;
          } else {
            M[y][x].a.v = 0;
            M[y][x].b.v = 1;
          }
          step++;
        }
      }
    }
    draw();
  }
  function fAxorB() {
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 30; x++) {
        if (M[y][x].a) M[y][x].a.v = 1;
        if (M[y][x].b) M[y][x].b.v = 1;
        if (M[y][x].a && M[y][x].b) {
          M[y][x].a.v = 0;
          M[y][x].b.v = 0;
        }
      }
    }
    draw();
  }
  return (
    <div className="App">
      <h1>Hello MLH</h1>
      <h2>Let's check boolean logic for polygons</h2>
      <div className="Box">
        <div className="Input">
          <label>A: </label>
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
          <button onClick={fAnotB}>A not B</button>
          <button onClick={fBnotA}>B not A</button>
          <br />
          <button onClick={fAorB}>A or B</button>
          <button onClick={fAandB}>A and B</button>
          <button onClick={fAxorB}>B xor A</button>
          <br />
        </div>
        <p>
          *inputs A and B colors in hex(16) - rrggbb
          <br />
          "set" button for load to canvas, buttons below for changing logic
          after
        </p>
      </div>
    </div>
  );
}
