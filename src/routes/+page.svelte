<script lang="ts">
	import { settingsStore } from 'lib//stores/settingsStore';
	import fBase from 'lib//util/firebase';
	import { strings } from 'lib//util/language';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let problems = 0;
	let solved = 0;

	$: language = $settingsStore.language;

	onMount(() => {
		fBase.getStatistic((value) => {
			problems = value.problem_count;
			solved = value.solved_count;
		});
	});
</script>

<div in:fade>
	<h1 class="title">{strings[language].homepage.title}</h1>
	<div>
		<div class="flex">
			<img src="/images/Pic1.png" alt="Game example" />
			<div class="content">
				<h2>{strings[language].homepage.what[0]}</h2>
				<p>{strings[language].homepage.what[1]}</p>
				<p>
					{strings[language].homepage.what[2]}
					<b>{problems}</b>
					{strings[language].homepage.what[3]}
					<b>{solved}</b>
					{strings[language].homepage.what[4]}
				</p>
				<p>{strings[language].homepage.what[5]}</p>
			</div>
		</div>
	</div>
</div>

<style>
	.title {
		margin-bottom: 50px;
	}

	.flex {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	img {
		width: 350px;
		margin: 10px;
		border-radius: 5px;
		transition: all 0.5s;
		border: 0 25px;
	}

	.content {
		width: 350px;
		margin: 10px 25px;
		border-radius: 5px;
		padding: 10px;
		transition: all 0.5s;
		text-align: justify;
	}

	.content h2 {
		margin-top: 0px;
	}
</style>
