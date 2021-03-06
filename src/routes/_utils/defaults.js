export const defaults = {
  gravity: 2712,
  realTime: false,
  collisions: true,
  timeStep: 0.1,
  updatesPerFrame: 3,
  sizeRatio: 2,
  trails: true,
  disappearingTrails: false,
  trailLength: 500,
  whiteBackground: false,
  shinyBodies: true,
  shineRadius: 1,
  bodies: [
    { x: -100, y: 0, vx: 0, vy: 12.5, m: 30, h: 0, s: 100, l: 50 },
    { x: 100, y: 0, vx: 0, vy: -12.5, m: 30, h: 235, s: 100, l: 50 },
    { x: 0, y: 300, vx: -18, vy: 0, m: 2, h: 100, s: 100, l: 50 },
    { x: 0, y: -300, vx: 18, vy: 0, m: 2, h: 40, s: 100, l: 50 },
    { x: -500, y: 0, vx: 0, vy: 17, m: 10, h: 150, s: 100, l: 50 },
    { x: 500, y: 0, vx: 0, vy: -17, m: 10, h: 300, s: 100, l: 50 },
  ],
};
