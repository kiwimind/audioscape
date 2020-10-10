<script>
import { audioStore, domainData, frames, playAudio, playTrigger, youtubeStore } from "../logic/store";

const audio = new Audio();
audio.crossOrigin = 'anonymous';
audio.preload = 'auto';

const context = new (window.AudioContext || window.webkitAudioContext)();
const analyser = context.createAnalyser();
const sourceElement = context.createMediaElementSource(audio);
let sourceFetch;

// const getAudio = function(url) {
//   fetch(url)
//   .then(res => res.arrayBuffer())
//   .then(arrayBuffer => context.decodeAudioData(arrayBuffer))

//   .then(audioBuffer => {
//     sourceFetch = context.createBufferSource();
//     sourceFetch.buffer = audioBuffer;
//   })
//   .catch(err => console.error(err))
// }

sourceElement.connect(analyser);
analyser.connect(context.destination);

analyser.fftSize = 32;
let delta;

const analyse = () => {
  requestAnimationFrame(analyse);

  if (performance.now() - delta < 40 || $audioStore.status !== 'playing') return;

  analyser.getFloatTimeDomainData($domainData);

  $frames++;  
  delta = performance.now();
};

analyse();

audio.addEventListener('timeupdate', e => {
  $audioStore.currentTime = audio.currentTime;
  $audioStore.timeRanges = audio.buffered;
});
audio.addEventListener('durationchange', e => $audioStore.duration = audio.duration);
audio.addEventListener('progress', e => {
  $audioStore.timeRanges = audio.buffered;
});
audio.addEventListener('playing', e => {
  if (audio.currentTime > -1 && !audio.paused && !audio.ended) {
    $audioStore.status = 'playing';
  }
});
audio.addEventListener('pause', e => $audioStore.status = 'not playing');

const startAudio = ()=> {
  if ($audioStore.currentTime <= 0) {
    audio.src = $youtubeStore.url;
    // getAudio($audioStore.url);
  }

  audio.play();
}

const pauseAudio = ()=> audio.pause();

$: {
  $playTrigger;

  if ($playAudio && $youtubeStore.playable) {
    if ($audioStore.status === 'playing') {
      pauseAudio();
    } else {
      startAudio();
    }
  }

  $playAudio = false;
}
</script>
