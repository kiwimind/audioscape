<script>
	import Play from './logic/Play.svelte';
	import Input from './view/Input.svelte';
	import Scene from './view/Scene.svelte';
	import { playAudio, playTrigger } from './logic/store';

	const handleKeydown = event => {
		if (event.code === 'Space') {
			$playAudio = true;
			$playTrigger *= -1;
		}
	}

	console.log('🦆');
</script>

<svelte:window on:keydown={handleKeydown}/>

<Play />
<Input />

<div class="scene">
	<Scene />
</div>

<style>
	.scene {
		--size: 95vmin;
		width: var(--size);
		height: var(--size);
		padding: 0;
		margin: 0;
		border-radius: 50%;
		box-shadow: 0 0 1em .5em rgba(194, 119, 57, 90%),
								inset 0 0 2em 1em rgba(194, 119, 57);
		overflow: hidden;
	}
</style>