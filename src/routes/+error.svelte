<script lang="ts">
	import { settingsStore } from 'lib//stores/settingsStore';
	import { strings } from 'lib//util/language';
	import { fade } from 'svelte/transition';

	$: language = $settingsStore.language;
</script>

<div in:fade class="error">
	<h1>404</h1>
	<h2>{strings[language].errorpage.title}</h2>
	<p>{strings[language].errorpage.main}</p>
	<p>
		{strings[language].errorpage.quokka[0]}
		<del>{strings[language].errorpage.quokka[1]}</del>
		{strings[language].errorpage.quokka[2]}
	</p>
	<img src="/images/RoyalQuokka.png" alt="Quokka" />
</div>

<style>
	.error {
		background: black;
		height: calc(100% - 50px);
		padding-top: 10px;
		width: 100%;
	}

	.error img {
		background-size: 100% 100%;
		width: 100%;
		height: 100%;
	}
</style>
