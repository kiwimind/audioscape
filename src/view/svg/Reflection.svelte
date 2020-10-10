<script>
  import { domainData, frames } from '../../logic/store';
  
  const waveQuadsAbsolute = samples => {
    const pathArray = [];
  
    for (let i = 0; i < samples.length; i++) {
      if (!isFinite(samples[i])) { samples[i] = Math.random() / 10; } 
      if (samples[i] < -1) { samples[i] = -1; }
      if (samples[i] > 1) { samples[i] = 1; }
  
      pathArray.push(` S ${Math.floor((i * 40) + 20)} ${Math.floor(-500 * samples[i])} ${Math.floor((i + 1) * 40)} 0`);
    }
  
    return 'M 0 0' + pathArray.join('');
  }
  
  let path;
  $: {
    $frames;
    path = waveQuadsAbsolute($domainData);
  };
</script>

<svg viewBox="0 -100 1200 250">
  <path class="one" fill="none" stroke-width="5" d={path}></path>
</svg>

<svg viewBox="0 -100 1200 250">
  <path class="two" fill="none" stroke-width="5" d={path}></path>
</svg>

<style>
  path.one {
    transform-origin: center;
    transform: rotateZ(-90deg) scaleY(2) translate(5%, 50%);
    overflow: hidden;
    stroke: hsla(45, 94%, 53%, 0.8);
    mix-blend-mode: overlay;
  }

  path.two {
    transform-origin: center;
    transform: rotateZ(-90deg) scaleY(2) translate(5%, 50%);
    overflow: hidden;
    stroke: hsla(45, 100%, 60%, 0.8);
    mix-blend-mode: soft-light;
  }
</style>
