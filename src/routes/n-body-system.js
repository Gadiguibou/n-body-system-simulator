"use strict";

// Gravitational constant
const G = 2000;
const REAL_TIME = false;
const TIME_STEP = 0.01;
const UPDATES_PER_FRAME = 100;
const SIZE_RATIO = 2;
const TRAIL = true;
const DISAPPEARING_TRAIL = false;
const TRAIL_LENGTH = 500;
const TRANSPARENT_BACKGROUND = false;
const SHINE = true;
const SHINE_RADIUS = 1;

const bCanvas = document.getElementById("bodies-canvas");
const bCtx = bCanvas.getContext("2d");
const tCanvas = document.getElementById("trails-canvas");
const tCtx = tCanvas.getContext("2d", { alpha: TRANSPARENT_BACKGROUND });

// Used for generating the colors of new bodies
const ALL_COLORS = [
  "silver",
  "gray",
  "white",
  "maroon",
  "red",
  "purple",
  "fuchsia",
  "green",
  "lime",
  "olive",
  "yellow",
  "navy",
  "blue",
  "teal",
  "aqua",
  "antiquewhite",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "blanchedalmond",
  "blueviolet",
  "brown",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgreen",
  "darkgrey",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkslategrey",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dimgrey",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "greenyellow",
  "grey",
  "honeydew",
  "hotpink",
  "indianred",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lavenderblush",
  "lawngreen",
  "lemonchiffon",
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgray",
  "lightgreen",
  "lightgrey",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightslategrey",
  "lightsteelblue",
  "lightyellow",
  "limegreen",
  "linen",
  "magenta",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "mintcream",
  "mistyrose",
  "moccasin",
  "navajowhite",
  "oldlace",
  "olivedrab",
  "orangered",
  "orchid",
  "palegoldenrod",
  "palegreen",
  "paleturquoise",
  "palevioletred",
  "papayawhip",
  "peachpuff",
  "peru",
  "pink",
  "plum",
  "powderblue",
  "rosybrown",
  "royalblue",
  "saddlebrown",
  "salmon",
  "sandybrown",
  "seagreen",
  "seashell",
  "sienna",
  "skyblue",
  "slateblue",
  "slategray",
  "slategrey",
  "snow",
  "springgreen",
  "steelblue",
  "tan",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "wheat",
  "whitesmoke",
  "yellowgreen",
];

class HSLColor {
  constructor(h, s, l, a = 0.3) {
    this.h = h;
    this.s = s;
    this.l = l;
    this.hslString = `hsl(${h},${s}%,${l}%)`;
    this.hslaString = `hsla(${h},${s}%,${l}%,${a})`;
  }

  toString() {
    return this.hslString;
  }

  toStringWithAlpha() {
    return this.hslaString;
  }
}

class Body {
  constructor(x, y, vx, vy, mass, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.mass = mass;
    this.radius = Math.sqrt(this.mass) * SIZE_RATIO;
    this.color = color;
    if (TRAIL && DISAPPEARING_TRAIL) {
      this.trail = [[this.x, this.y]];
    }

    // Cache the body in an off-screen canvas for performance
    this.bodyCanvas = document.createElement("canvas");
    this.bodyCanvas.width = SHINE
      ? this.radius * 2 + SHINE_RADIUS * this.radius * 2
      : this.radius * 2;
    this.bodyCanvas.height = SHINE
      ? this.radius * 2 + SHINE_RADIUS * this.radius * 2
      : this.radius * 2;
    // Draw the body to the off-screen canvas
    const bodyContext = this.bodyCanvas.getContext("2d");
    bodyContext.fillStyle = this.color.toString();
    if (SHINE) {
      bodyContext.shadowColor = this.color.toString();
      bodyContext.shadowBlur = this.radius;
    }
    bodyContext.beginPath();
    bodyContext.arc(
      this.radius + (SHINE ? SHINE_RADIUS * this.radius : 0),
      this.radius + (SHINE ? SHINE_RADIUS * this.radius : 0),
      this.radius,
      0,
      2 * Math.PI
    );
    bodyContext.fill();

    if (TRAIL) {
      // Cache the image of a trail point in an off-screen canvas for performance
      this.trailPointCanvas = document.createElement("canvas");
      this.trailPointCanvas.width = 1;
      this.trailPointCanvas.height = 1;
      // Draw the trail point to the off-screen canvas
      const trailPointContext = this.trailPointCanvas.getContext("2d");
      trailPointContext.fillStyle = this.color.toStringWithAlpha();
      trailPointContext.beginPath();
      trailPointContext.arc(0.5, 0.5, 1, 0, 2 * Math.PI);
      trailPointContext.fill();
    }
  }

  draw() {
    if (TRAIL) {
      this.drawTrail();
    }
    this.drawBody();
  }

  drawBody() {
    bCtx.drawImage(
      this.bodyCanvas,
      this.x - (this.radius + (SHINE ? SHINE_RADIUS * this.radius : 0)),
      this.y - (this.radius + (SHINE ? SHINE_RADIUS * this.radius : 0))
    );
  }

  drawTrail() {
    if (DISAPPEARING_TRAIL) {
      for (const point of this.trail) {
        tCtx.drawImage(this.trailPointCanvas, point[0] - 0.5, point[1] - 0.5);
      }
    } else {
      tCtx.drawImage(this.trailPointCanvas, this.x, this.y);
    }
  }
}

class System {
  constructor(speed, ...bodies) {
    this.bodies = bodies;
    this.dt = speed;
    if (REAL_TIME) {
      this.previousTime = null;
    }
    this.animationFrame = null;
  }

  update(dt) {
    const nextBodies = this.bodies;
    const collisions = [];

    // Update the speed of each body
    for (let i = 0; i < this.bodies.length; i++) {
      for (let j = 0; j < this.bodies.length; j++) {
        if (i === j) {
          continue;
        }
        const body = this.bodies[i];
        const other = this.bodies[j];
        const dx = body.x - other.x;
        const dy = body.y - other.y;
        const r = Math.sqrt(dx * dx + dy * dy);
        if (r < body.radius + other.radius && i < j) {
          collisions.push([i, j]);
        }
        const acceleration = (-1 * G * other.mass) / (r * r);
        const rUnitVector = {
          x: dx / r,
          y: dy / r,
        };
        const ax = acceleration * rUnitVector.x;
        const ay = acceleration * rUnitVector.y;
        nextBodies[i].vx += ax * dt;
        nextBodies[i].vy += ay * dt;
      }
    }
    // Update the position of each body
    for (let i = 0; i < this.bodies.length; i++) {
      nextBodies[i].x += nextBodies[i].vx * dt;
      nextBodies[i].y += nextBodies[i].vy * dt;
    }

    // Handle collisions between **pairs** of bodies
    const indicesToRemove = [];
    for (const [first, second] of collisions) {
      const firstBody = nextBodies[first];
      const secondBody = nextBodies[second];

      // The position of the new body corresponds to the position of the center of mass of the two
      // bodies
      const x =
        firstBody.x +
        (secondBody.x - firstBody.x) *
          (secondBody.mass / (firstBody.mass + secondBody.mass));
      const y =
        firstBody.y +
        (secondBody.y - firstBody.y) *
          (secondBody.mass / (firstBody.mass + secondBody.mass));
      // Adding together the moment of inertia of each body to determine the new speed
      const vx =
        (firstBody.vx * firstBody.mass + secondBody.vx * secondBody.mass) /
        (firstBody.mass + secondBody.mass);
      const vy =
        (firstBody.vy * firstBody.mass + secondBody.vy * secondBody.mass) /
        (firstBody.mass + secondBody.mass);
      // Adding together the masses of the colliding objects to determine the new mass
      const mass = firstBody.mass + secondBody.mass;
      const color = new HSLColor(
        firstBody.color.h +
          (secondBody.color.h - firstBody.color.h) *
            (secondBody.mass / (firstBody.mass + secondBody.mass)),
        firstBody.color.s +
          (secondBody.color.s - firstBody.color.s) *
            (secondBody.mass / (firstBody.mass + secondBody.mass)),
        firstBody.color.l +
          (secondBody.color.l - firstBody.color.l) *
            (secondBody.mass / (firstBody.mass + secondBody.mass))
      );
      const heavierBody =
        firstBody.mass > secondBody.mass ? firstBody : secondBody;
      const trail = heavierBody.trail;

      // Create new body
      nextBodies.push(new Body(x, y, vx, vy, mass, color));
      nextBodies[nextBodies.length - 1].trail = trail;

      indicesToRemove.push(first);
      indicesToRemove.push(second);
    }
    // Remove bodies that collided
    [...new Set(indicesToRemove)]
      .sort()
      .reverse()
      .forEach((index) => nextBodies.splice(index, 1));

    // If all bodies are off the screen, stop the simulation
    // if (
    //   nextBodies.every(
    //     (body) => body.x < bCanvas.width / 2 || body.x > bCanvas.width / 2
    //   ) &&
    //   this.animationFrame
    // ) {
    //   window.cancelAnimationFrame(this.animationFrame);
    // }

    if (TRAIL && DISAPPEARING_TRAIL) {
      // Update the trail of all bodies
      for (let i = 0; i < nextBodies.length; i++) {
        nextBodies[i].trail.push([nextBodies[i].x, nextBodies[i].y]);
        if (nextBodies[i].trail.length > TRAIL_LENGTH) {
          nextBodies[i].trail.shift();
        }
      }
    }

    this.bodies = nextBodies;
  }

  draw() {
    bCtx.clearRect(
      -bCtx.canvas.width / 2,
      -bCtx.canvas.height / 2,
      bCtx.canvas.width,
      bCtx.canvas.height
    );
    if (DISAPPEARING_TRAIL) {
      tCtx.clearRect(
        -tCanvas.width / 2,
        -tCanvas.height / 2,
        tCanvas.width,
        tCanvas.height
      );
    }
    for (const body of this.bodies) {
      body.draw();
    }
  }

  animate() {
    if (REAL_TIME) {
      // "Real-time" simulation independent of the frame rate
      // This corrects for the slower renders by using a larger value of dt when approximating
      // movements
      const now = performance.now();
      let delay = 1000 / 60;
      if (this.previousTime) {
        delay = now - this.previousTime;
      }
      this.previousTime = now;
      for (let i = 0; i < UPDATES_PER_FRAME; i++) {
        this.update((this.dt * delay) / (1000 / 60));
        this.draw();
      }
    } else {
      // Frame rate dependent, "deterministic" simulation
      // This updates before each frame, so dt stays the same throughout the simulation even if this
      // slows down the frame rate of the animation
      for (let i = 0; i < UPDATES_PER_FRAME; i++) {
        this.update(this.dt);
        this.draw();
      }
    }
    this.animationFrame = window.requestAnimationFrame(this.animate.bind(this));
  }
}

const generateNewRandomBody = () => {
  const x = Math.random() * bCtx.canvas.width;
  const y = Math.random() * bCtx.canvas.height;
  const vx = Math.random() * 10 - 5;
  const vy = Math.random() * 10 - 5;
  const mass = Math.random() * 100;
  const color = new HSLColor(Math.floor(Math.random() * 360), 100, 50);
  return new Body(x, y, vx, vy, mass, color);
};

const body1 = new Body(-100, 0, 0, 12.5, 30, new HSLColor(0, 100, 50));
const body2 = new Body(100, 0, 0, -12.5, 30, new HSLColor(235, 100, 50));
const body3 = new Body(0, 300, -18, 0, 2, new HSLColor(100, 100, 50));
const body4 = new Body(0, -300, 18, 0, 2, new HSLColor(40, 100, 50));
const body5 = new Body(-500, 0, 0, 17, 10, new HSLColor(150, 100, 50));
const body6 = new Body(500, 0, 0, -17, 10, new HSLColor(300, 100, 50));

const system = new System(TIME_STEP, body1, body2, body3, body4, body5, body6);

const resizeCanvas = (context) => {
  context.canvas.width = window.innerWidth;
  context.canvas.height = window.innerHeight;
  // Center the context
  context.restore();
  context.translate(context.canvas.width / 2, context.canvas.height / 2);
};

const resizeCanvases = () => {
  resizeCanvas(bCtx);
  resizeCanvas(tCtx);
  system.draw();
};

resizeCanvases();

window.addEventListener("resize", resizeCanvases);

document.getElementById("start-and-pause-button").onclick = (ev) => {
  if (system.animationFrame) {
    window.cancelAnimationFrame(system.animationFrame);
    system.animationFrame = null;
    system.previousTime = null;
    ev.target.innerText = "Resume simulation";
  } else {
    system.animate();
    ev.target.innerText = "Pause simulation";
  }
};
