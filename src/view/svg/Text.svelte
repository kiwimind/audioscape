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

<text class:fadeout class:fadein
  x="50" y="47"
  alignment-baseline="central"
  text-anchor="middle"
  textLength="95%"
>{title}</text>

<style>
  text {
    font-size: 10px;
    user-select: none;
    pointer-events: none;
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
    to { opacity: 1 }
  }
</style>