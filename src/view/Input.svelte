<script>
  import { audioStore, youtubeStore, playAudio, playTrigger } from '../logic/store';
  import { fade } from 'svelte/transition';

  $:url = $audioStore.url;
  let searching = false;

  const fetchYoutubeMeta = async id => {
    const res = await fetch('https://youtube-meta-fetch.vercel.app/api/get?id=' + id);
    return await res.json();
  }

  const isValidYoutubeString = string => {
    if (string.length === 11) {
      const match = string.match(/^([-\w\d])+$/);
      return match != null ? match[0] : false;
    } else {
      const match = string.match(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/);
      return match != null ? match[0] : false;
    }
  }

  const changeURL = async event => {
    const inputString = event.target.value;

    if (isValidYoutubeString(inputString)) {
      searching = true;
      const meta = await fetchYoutubeMeta(inputString);

      if (meta.status === 'OK') {
        console.log(meta);
        // $youtubeStore.playable = true;
        // $youtubeStore.title = meta.title;
      }

      $youtubeStore.playable = true; // TEMPORARY PLACEHOLDER
      $audioStore.url = 'jazz.mp3'; // TEMPORARY PLACEHOLDER
      searching = false;
    } else if ($audioStore.status !== 'playing'){
      $youtubeStore.playable = false;
    }
  };

  const enterSubmit = event => {
    if (event.key === 'Enter') {
      $playAudio = true;
      $playTrigger *= -1;
    }
  }
</script>

{#if $audioStore.status !== 'playing'}
  <input
    class:searching
    on:input={changeURL}
    on:keydown|stopPropagation={enterSubmit}
    type="text"
    placeholder="YouTube video URL or ID"
    value={url}
    transition:fade
  >
{/if}

<style>
  input {
    position: absolute;
    width: calc(95vmin * 0.7);
    height: 6%;
    top: calc(50% + 15vmin);
    padding-bottom: 0.65em;
    z-index: 2;
    border: none;
    border-radius: 5px;
    font-size: clamp(0.7em, 6vmin, 2em);
    box-shadow: 0px 5px 2px 0.1px black;
    background: hsl(39, 65%, 50%);
    outline: none;
  }

  input::placeholder {
    text-align: center;
    color: black;
  }

  input.searching {
    animation: searching 1s ease-in alternate infinite;
  }

  @keyframes searching {
    from {
      box-shadow: 0 0 0.1em 0.1em hsla(51, 100%, 50%, 90%);
    }
    to {
      box-shadow: 0 0 2em 0.5em hsla(51, 100%, 70%, 90%);
    }
  }
</style>
