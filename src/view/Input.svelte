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

  // MP4 because Apple still doesn't support all the good stuff
  const getHighestAudioMP4URL = formats => {
    return formats
           .filter(format => format.mimeType.includes('audio/mp4'))
           .sort((a, b) => a.audioBitrate - b.audioBitrate)[0].url;
  }

  const changeURL = async event => {
    const inputString = event.target.value;

    if (isValidYoutubeString(inputString)) {
      searching = true;
      const meta = await fetchYoutubeMeta(inputString);
      console.log(meta);

      if (meta.status === 'OK') {
        // $audioStore.url = inputString;
        $youtubeStore.url = 'https://corsno.herokuapp.com/' + getHighestAudioMP4URL(meta.formats);
        $youtubeStore.playable = true;
        $youtubeStore.title = meta.channelName;
      }

      searching = false;
    } else if ($audioStore.status !== 'playing') {
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
    placeholder="YouTube URL or ID"
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
