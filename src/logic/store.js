import { writable } from 'svelte/store';

export const audioStore = writable({
  url: '',
  status: 'not playing',
  duration: 0,
  currentTime: 0,
  timeRanges: {},
  seekedTime: 0,
});

export const domainData = writable(new Float32Array(16));
export const frames = writable(0);

export const playTrigger = writable(1);
export const playAudio = writable(false);

export const youtubeStore = writable({
  title: 'AUDIOSCAPE',
  url: undefined,
  playable: false
});
