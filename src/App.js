import "./styles.css";

export default function App() {
  function draw() {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, 10, 10);
  }
  return (
    <div className="App">
      <h1>Hello MLH</h1>
      <h2>Let's check boolean logic for polygons</h2>
      <div className="Box">
        <div className="Input">
          <label>A: </label>
          <input className="InputValue" type="text" maxlength="1"></input>
          <input className="InputColor" type="text" maxlength="6"></input>
          <label>B: </label>
          <input className="InputValue" type="text" maxlength="1"></input>
          <input className="InputColor" type="text" maxlength="6"></input>
          <br />
          <button>set</button>
        </div>
        <br />
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
