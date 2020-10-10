<script>
import { tweened } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';
import { youtubeStore } from '../../logic/store';

const gradientPosition = tweened(-0.4, {
  duration: 1500,
  easing: cubicOut
})

$: if ($youtubeStore.playable) {
     gradientPosition.set(0);
   } else {
     gradientPosition.set(-0.4);
   }
</script>

<defs>
  <rect id="water" x="0" y="50" width="100" height="50" />
  <radialGradient id="waterGradient" cx="0.5" cy={$gradientPosition} r="4">
    <stop offset="0%" stop-color="#ff7220" />
    <stop offset="10%" stop-color="#331046" />
  </radialGradient >
</defs>

<use x="0" y="0" xlink:href="#water" fill="url('#waterGradient')" />
