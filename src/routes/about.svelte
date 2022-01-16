<svelte:head>
    <title>About this website</title>
</svelte:head>

<h1>About this website</h1>
<h2>What is an <i>n</i>-body system?</h2>

<p>The term "<i>n</i>-body problem" generally refers to the problem of trying to predict the motion of planets, stars, moons, asteroids, or, more generally, <strong>celestial bodies</strong>. Although there's no known general analytical solution to this problem<sup>[<a id="footnote-1-ref" href="#footnote-1">1</a>]</sup>, it's easy to simulate the movement of those bodies approximately using <a target="_blank" href="https://en.wikipedia.org/wiki/Newton%27s_law_of_universal_gravitation">Newton's law of universal gravitation</a>.</p>

<h2>What is this website?</h2>

<p>It's a <a href=#how-was-this-made>simple</a> interactive n-body simulation that allows anyone to play with the initial parameters to see how it affects the bodies' orbits. Hopefully, somebody finds it as fascinating as I do to discover how simple changes in the initial parameters can lead to wildly different outcomes.</p>

<h2>Whenever I change the parameters of the simulation, the planets just crash into each other or are ejected outside of the screen, never to be seen again...</h2>

<p>It's pretty hard to get a system with anything above to 2 bodies to reach a stable state. In fact, it's so hard that mathematicians and scientists have been scratching their heads over this for <a target="_blank" href="https://en.wikipedia.org/wiki/N-body_problem#History">decades</a>. Here are a few interesting orbits that I managed to come up with (or stole from math papers) to help you get started:</p>

<ul>
    <li><a target="_blank" href="https://n-body.glcrx.com/?gravity=5000&realTime=false&timeStep=0.1&updatesPerFrame=3&sizeRatio=2&trails=true&disappearingTrails=false&trailLength=500&whiteBackground=false&shinyBodies=true&shineRadius=1&bodies=%5B%7B%22x%22%3A200%2C%22y%22%3A0%2C%22vx%22%3A0%2C%22vy%22%3A-17.66%2C%22m%22%3A50%2C%22h%22%3A0%2C%22s%22%3A100%2C%22l%22%3A50%7D%2C%7B%22x%22%3A-200%2C%22y%22%3A0%2C%22vx%22%3A0%2C%22vy%22%3A17.66%2C%22m%22%3A50%2C%22h%22%3A226%2C%22s%22%3A100%2C%22l%22%3A50%7D%5D">2 bodies with the same mass in a single circular orbit</a></li>
    <li><a target="_blank" href="https://n-body.glcrx.com/?gravity=2000&realTime=false&timeStep=0.1&updatesPerFrame=3&sizeRatio=2&trails=true&disappearingTrails=false&trailLength=500&whiteBackground=false&shinyBodies=true&shineRadius=1&bodies=%5B%7B%22x%22%3A-200%2C%22y%22%3A0%2C%22vx%22%3A0%2C%22vy%22%3A-6%2C%22m%22%3A20%2C%22h%22%3A255%2C%22s%22%3A100%2C%22l%22%3A50%7D%2C%7B%22x%22%3A240%2C%22y%22%3A-120%2C%22vx%22%3A-12%2C%22vy%22%3A3%2C%22m%22%3A20%2C%22h%22%3A19%2C%22s%22%3A100%2C%22l%22%3A50%7D%2C%7B%22x%22%3A240%2C%22y%22%3A120%2C%22vx%22%3A12%2C%22vy%22%3A3%2C%22m%22%3A20%2C%22h%22%3A116%2C%22s%22%3A100%2C%22l%22%3A50%7D%5D">A 3-body system that almost seems stable (but might not be)</a></li>
    <li><a target="_blank" href="https://n-body.glcrx.com/?gravity=500000&realTime=false&timeStep=0.01&updatesPerFrame=3&sizeRatio=2&trails=true&disappearingTrails=false&trailLength=500&whiteBackground=false&shinyBodies=true&shineRadius=1&bodies=%5B%7B%22x%22%3A-485.00218%2C%22y%22%3A121.543765%2C%22vx%22%3A46.6203685%2C%22vy%22%3A43.236573%2C%22m%22%3A10%2C%22h%22%3A240%2C%22s%22%3A100%2C%22l%22%3A50%7D%2C%7B%22x%22%3A485.00218%2C%22y%22%3A-121.543765%2C%22vx%22%3A46.6203685%2C%22vy%22%3A43.236573%2C%22m%22%3A10%2C%22h%22%3A0%2C%22s%22%3A100%2C%22l%22%3A50%7D%2C%7B%22x%22%3A0%2C%22y%22%3A0%2C%22vx%22%3A-93.240737%2C%22vy%22%3A-86.473146%2C%22m%22%3A10%2C%22h%22%3A120%2C%22s%22%3A100%2C%22l%22%3A50%7D%5D">The well-known stable figure 8 3-body system</a></li>
</ul>

<p>To discover more interesting and stable 3-body system configurations, <a target="_blank" href="https://observablehq.com/@rreusser/periodic-planar-three-body-orbits">this website</a> catalogued known stable configurations of planar 3-body system in a really neat way.</p>

<h2 id="how-was-this-made">How was this made? What technologies does it use?</h2>

<p>This website uses almost exclusively vanilla HTML and Javascript with a few lines of CSS and is served as a static website using <a target="_blank" href="https://pages.cloudflare.com/">Cloudflare Pages</a>. The graphics for the simulation use the <code><a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas">&lt;canvas&gt;</a></code> HTML element and the <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D"><code>CanvasRenderingContext2D</code></a> interface for rendering. I also used <a target="_blank" href="https://svelte.dev/">Svelte</a> to make the form for editing simulation parameters reactive. The entire source for this website is available <a target="_blank" href="https://github.com/Gadiguibou/n-body-system-simulator">here</a>.</p>

<h2>Why?</h2>

<p>The complex patterns that appear out of seemingly simple initial parameters fascinate me and I have a passion for programming and learning more about pretty much anything. Therefore, making this simulator seemed like the perfect opportunity to learn more about the Canvas API. I ended up having so much fun with it, that I decided to add a form to make it easier for non-techy people around me to play with it and experience the same awe at the emerging patterns in the motion of the planets.</p>

<h2>Who are you?</h2>

<p>I'm a second year software engineering student at McGill University with a passion for math, science and learning. You can find more of my projects on my <a target="_blank" href="https://github.com/Gadiguibou">GitHub profile</a>. I also have a small <a target="_blank" href="https://www.gabriellacroix.com/">website</a> that I don't maintain actively. This looks like the perfect opportunity to mention that I'm looking for an internship in software development and related fields for the summer of 2022. To learn more about my education and work experience or to contact me regarding this, please see my <a target="_blank" href="https://www.linkedin.com/in/lacroixgabriel/">LinkedIn profile</a>.</p>

<h2>Can I use this for <i>X</i>? Modify it? Sell it?</h2>

<p>Yes. I'm not sure what use this could have to others, but to make sure this doesn't get forgotten in a corner of my hard drive if it is useful to anyone else, this website, its source code, and all its content is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">CC-BY Creative Commons Attribution 4.0 International License</a>.</p>

<button onclick="window.location.assign('/')">Go back to the simulation</button>

<p id="footnote-1"><sup>[1]</sup> As of <time datetime="2022-01-16">2022-01-16</time>, to the best of my knowledge. Note that there is are solutions for the specific case of <i>n</i> = 2 and to a restricted version of the 3-body problem. <a target="_blank" href="https://en.wikipedia.org/wiki/N-body_problem">Relevant Wikipedia article</a>. <a href="#footnote-1-ref">↩</a></p>

<footer>
    <p>
        <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
    </p>
</footer>
