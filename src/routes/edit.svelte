<script>
  "use strict";

  import { browser } from "$app/env";
  import { defaults } from "./_utils/defaults";

  // Search params
  const getSearchParamOrDefault = (paramName, fallback) => {
    if (browser) {
      const params = new URLSearchParams(window.location.search);
      if (params.has(paramName)) {
        return JSON.parse(params.get(paramName));
      }
    }
    return fallback;
  };

  let gravity = getSearchParamOrDefault("gravity", defaults.gravity);
  let realTime = getSearchParamOrDefault("realTime", defaults.realTime);
  let collisions = getSearchParamOrDefault("collisions", defaults.collisions);
  let timeStep = getSearchParamOrDefault("timeStep", defaults.timeStep);
  let updatesPerFrame = getSearchParamOrDefault(
    "updatesPerFrame",
    defaults.updatesPerFrame
  );
  let sizeRatio = getSearchParamOrDefault("sizeRatio", defaults.sizeRatio);
  let trails = getSearchParamOrDefault("trails", defaults.trails);
  let disappearingTrails = getSearchParamOrDefault(
    "disappearingTrails",
    defaults.disappearingTrails
  );
  let trailLength = getSearchParamOrDefault(
    "trailLength",
    defaults.trailLength
  );
  let whiteBackground = getSearchParamOrDefault(
    "whiteBackground",
    defaults.whiteBackground
  );
  let shinyBodies = getSearchParamOrDefault(
    "shinyBodies",
    defaults.shinyBodies
  );
  let shineRadius = getSearchParamOrDefault(
    "shineRadius",
    defaults.shineRadius
  );

  $: logTimeStep = Math.log(timeStep) / Math.log(10);

  let bodies = getSearchParamOrDefault(
    "bodies",
    // This performs a shallow copy of each item in the array
    defaults.bodies.map((body) => {
      return { ...body };
    })
  );

  const restoreDefaults = () => {
    ({
      gravity,
      realTime,
      collisions,
      timeStep,
      updatesPerFrame,
      sizeRatio,
      trails,
      disappearingTrails,
      trailLength,
      whiteBackground,
      shinyBodies,
      shineRadius,
    } = defaults);
    // This performs a shallow copy of each item in the array
    bodies = defaults.bodies.map((body) => {
      return { ...body };
    });
  };

  const generateNewRandomBody = () => {
    return {
      x: Math.round(Math.random() * 500 - 250),
      y: Math.round(Math.random() * 500 - 250),
      vx: Math.round(Math.random() * 40 - 20),
      vy: Math.round(Math.random() * 50 - 20),
      m: Math.round(Math.random() * 30 + 1),
      h: Math.floor(Math.random() * 360),
      s: 100,
      l: 50,
    };
  };

  const simulate = (e) => {
    e.preventDefault();
    const url = new URL("../", window.location.href);
    for (let [key, value] of Object.entries({
      gravity,
      realTime,
      collisions,
      timeStep,
      updatesPerFrame,
      sizeRatio,
      trails,
      disappearingTrails,
      trailLength,
      whiteBackground,
      shinyBodies,
      shineRadius,
      bodies,
    })) {
      url.searchParams.set(key, JSON.stringify(value));
    }
    window.location.assign(url.href);
  };
</script>

<svelte:head>
  <title>N-body simulation</title>
</svelte:head>

<h1>N-body system simulator</h1>
<h2>Edit the simulation's settings</h2>

<form>
  <fieldset>
    <legend>Simulation settings</legend>
    <div>
      <label for="gravity">Gravity (<i>G</i>)</label>
      <input
        type="range"
        id="gravity"
        min="0"
        max="10000"
        step="1"
        bind:value={gravity}
      />
      <input type="number" id="gravity" min="0" step="1" bind:value={gravity} />
    </div>
    <div>
      <label for="real-time">Real-time</label>
      <input type="checkbox" id="real-time" bind:checked={realTime} />
      <p>
        When "Real-time" is set, the simulation tries to correct for lag in the
        browser by adjusting the simulated time step dynamically. This ensures
        that the simulation speed does not change, but may cause trails to
        appear jittery and may result in each different run producing different
        results.
      </p>
    </div>
    <div>
      <label for="collisions">Collisions</label>
      <input type="checkbox" id="collisions" bind:checked={collisions} />
    </div>
    <div>
      <label for="time-step">Time step (<i>dt</i>)</label>
      <input
        type="range"
        id="time-step"
        min="-4"
        max="2"
        step="0.001"
        value={logTimeStep}
        on:input={(e) => (timeStep = Math.pow(10, e.currentTarget.value))}
      />
      <input
        type="number"
        id="time-step"
        min="0.0001"
        step="0.0001"
        bind:value={timeStep}
      />
      <p>
        <small>A logarithmic slider! Kind of cool, isn't it? 😉</small>
      </p>
    </div>
    <div>
      <label for="updates-per-frame">Updates per frame</label>
      <input
        type="range"
        id="updates-per-frame"
        min="1"
        max="100"
        step="1"
        bind:value={updatesPerFrame}
      />
      <input
        type="number"
        id="updates-per-frame"
        min="1"
        step="1"
        bind:value={updatesPerFrame}
      />
    </div>
    <div>
      <label for="size-ratio">Size ratio</label>
      <input
        type="range"
        id="size-ratio"
        min="0.1"
        max="10"
        step="0.1"
        bind:value={sizeRatio}
      />
      <input
        type="number"
        id="size-ratio"
        min="0.1"
        step="0.1"
        bind:value={sizeRatio}
      />
    </div>
    <div>
      <label for="trails">Trails</label>
      <input type="checkbox" id="trails" bind:checked={trails} />
    </div>
    <div>
      <label for="disappearing-trails">Disappearing trails</label>
      <input
        type="checkbox"
        id="disappearing-trails"
        bind:checked={disappearingTrails}
        disabled={!trails}
      />
      <p>
        ⚠️ Warning! Enabling "Disappearing trails" may affect performance
        dramatically.
      </p>
    </div>
    <div>
      <label for="trail-length">Trail length</label>
      <input
        type="range"
        id="trail-length"
        min="1"
        max="5000"
        step="1"
        bind:value={trailLength}
        disabled={!disappearingTrails}
      />
      <input
        type="number"
        id="trail-length"
        min="1"
        step="1"
        bind:value={trailLength}
        disabled={!disappearingTrails}
      />
    </div>
    <div>
      <label for="white-background">White background</label>
      <input
        type="checkbox"
        id="white-background"
        bind:checked={whiteBackground}
      />
    </div>
    <div>
      <label for="shiny-bodies">Shiny bodies</label>
      <input type="checkbox" id="shiny-bodies" bind:checked={shinyBodies} />
    </div>
    <div>
      <label for="shine-radius">Shine radius</label>
      <input
        type="range"
        id="shine-radius"
        min="0"
        max="5"
        step="0.1"
        bind:value={shineRadius}
        disabled={!shinyBodies}
      />
      <input
        type="number"
        id="shine-radius"
        min="0"
        step="0.1"
        bind:value={shineRadius}
        disabled={!shinyBodies}
      />
    </div>
  </fieldset>
  <fieldset>
    <legend>Bodies</legend>
    {#each bodies as body, index}
      <fieldset>
        <legend>Body {index + 1}</legend>
        <div>
          <label for="body-{index}-mass">Mass</label>
          <input
            type="range"
            id="body-{index}-mass"
            min="0.1"
            max="100"
            step="0.1"
            bind:value={body.m}
          />
          <input
            type="number"
            id="body-{index}-mass"
            min="0.1"
            step="0.1"
            bind:value={body.m}
          />
        </div>
        <div>
          <label for="body-{index}-x">X</label>
          <input
            type="range"
            id="body-{index}-x"
            min="-1000"
            max="1000"
            step="0.1"
            bind:value={body.x}
          />
          <input
            type="number"
            id="body-{index}-x"
            step="0.1"
            bind:value={body.x}
          />
        </div>
        <div>
          <label for="body-{index}-y">Y</label>
          <input
            type="range"
            id="body-{index}-y"
            min="-1000"
            max="1000"
            step="0.1"
            bind:value={body.y}
          />
          <input
            type="number"
            id="body-{index}-y"
            step="0.1"
            bind:value={body.y}
          />
        </div>
        <div>
          <label for="body-{index}-vx">Vx</label>
          <input
            type="range"
            id="body-{index}-vx"
            min="-100"
            max="100"
            step="0.1"
            bind:value={body.vx}
          />
          <input
            type="number"
            id="body-{index}-vx"
            step="0.1"
            bind:value={body.vx}
          />
        </div>
        <div>
          <label for="body-{index}-vy">Vy</label>
          <input
            type="range"
            id="body-{index}-vy"
            min="-100"
            max="100"
            step="0.1"
            bind:value={body.vy}
          />
          <input
            type="number"
            id="body-{index}-vy"
            step="0.1"
            bind:value={body.vy}
          />
        </div>
        <div>
          <fieldset>
            <legend>Color</legend>
            <div>
              <label for="body-{index}-hue">Hue</label>
              <input
                type="range"
                id="body-{index}-hue"
                min="0"
                max="359"
                step="1"
                bind:value={body.h}
              />
              <input
                type="number"
                id="body-{index}-hue"
                min="0"
                max="359"
                step="1"
                bind:value={body.h}
              />
              <span>°</span>
            </div>
            <div>
              <label for="body-{index}-saturation">Saturation</label>
              <input
                type="range"
                id="body-{index}-saturation"
                min="0"
                max="100"
                step="1"
                bind:value={body.s}
              />
              <input
                type="number"
                id="body-{index}-saturation"
                min="0"
                max="100"
                step="1"
                bind:value={body.s}
              />
              <span>%</span>
            </div>
            <div>
              <label for="body-{index}-lightness">Lightness</label>
              <input
                type="range"
                id="body-{index}-lightness"
                min="0"
                max="100"
                step="1"
                bind:value={body.l}
              />
              <input
                type="number"
                id="body-{index}-lightness"
                min="0"
                max="100"
                step="1"
                bind:value={body.l}
              />
              <span>%</span>
            </div>
            <div style="color:{`hsl(${body.h},${body.s}%,${body.l}%)`}">⬤</div>
          </fieldset>
        </div>
        <div>
          <button
            on:click|preventDefault={(e) =>
              (bodies = [
                ...bodies.slice(0, index),
                ...bodies.slice(index + 1),
              ])}>Delete body {index + 1}</button
          >
        </div>
      </fieldset>
    {/each}
    <div>
      <button
        on:click|preventDefault={() =>
          (bodies = [...bodies, generateNewRandomBody()])}
        >Create new body</button
      >
    </div>
  </fieldset>
  <div>
    <button
      on:click|preventDefault={() => {
        restoreDefaults();
      }}>Restore all simulation parameters to default</button
    >
  </div>
  <div>
    <button type="submit" on:click|preventDefault={simulate}>Simulate</button>
  </div>
</form>

<hr>


<footer>
  <a href="/about/">About this website</a>
  <p>
    <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"
      ><img
        alt="Creative Commons License"
        style="border-width:0"
        src="https://i.creativecommons.org/l/by/4.0/88x31.png"
      /></a
    ><br />This work is licensed under a
    <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"
      >Creative Commons Attribution 4.0 International License</a
    >.
  </p>
</footer>
