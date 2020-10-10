<script>
  import { youtubeStore } from '../../logic/store';
  let fadeout = false;
  let fadein = false;
  let title = 'AUDIOSCAPE';

  $: if ($youtubeStore.title !== 'AUDIOSCAPE') {
       fadeout = true;
       setTimeout(()=> fadein = true, 500);
       title = $youtubeStore.title;
     }
</script>

<defs>
  <clipPath id="invertedTextClip">
    <rect x="0" y="0" width="100" height="50" />
  </clipPath>
</defs>

<text class:fadeout class:fadein
  style="clip-path: url(#invertedTextClip)"
  x="50" y="47"
  alignment-baseline="central"
  text-anchor="middle"
  textLength="95%"
  transform="scale(1,-1) translate(0, -100)"
>{title}</text>

<style>
  text {
    font-size: 10px;
    opacity: 0.5;
  }

  text.fadeout {
    animation: fadeout 0.5s;
  }
  text.fadein {
    animation: fadein 0.5s;
  }

  @keyframes fadeout {
    to { opacity: 0 }
  }
  @keyframes fadeout {
    to { opacity: 0.5 }
  }
</style>