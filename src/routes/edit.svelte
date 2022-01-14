<script>
  let gravity = 2000;
  let realTime = false;
  let timeStep = 0.1;
  $: logTimeStep = Math.log(timeStep) / Math.log(10);
  let updatesPerFrame = 3;
  let sizeRatio = 2;
  let trails = true;
  let disappearingTrails = false;
  let trailLength = 500;
  let whiteBackground = false;
  let shinyBodies = true;
  let shineRadius = 1;

  const simulate = (e) => {
    e.preventDefault();
    const url = new URL("/", window.location.origin);
    url.searchParams.set("gravity", gravity);
    url.searchParams.set("realTime", realTime);
    url.searchParams.set("timeStep", timeStep);
    url.searchParams.set("updatesPerFrame", updatesPerFrame);
    url.searchParams.set("sizeRatio", sizeRatio);
    url.searchParams.set("trails", trails);
    url.searchParams.set("disappearingTrails", disappearingTrails);
    url.searchParams.set("trailLength", trailLength);
    url.searchParams.set("whiteBackground", whiteBackground);
    url.searchParams.set("shinyBodies", shinyBodies);
    url.searchParams.set("shineRadius", shineRadius);
    console.log(url.href);
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
        max="10"
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
  <button on:click={simulate}>Simulate</button>
</form>
