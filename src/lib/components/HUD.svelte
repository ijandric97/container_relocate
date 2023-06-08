<script lang="ts">
	import { fade } from 'svelte/transition';
	import { strings } from '../util/language';
	import { settingsStore } from '../stores/settingsStore';

	$: language = $settingsStore.language;
</script>

<div class="HUD" style="left: '10px'">
	<p>
		{strings[language].gamepage.moves}: {history.length}
	</p>
</div>

<style>
	.HUD {
		position: absolute;
		background-color: rgba(255, 255, 255, 0.75);
		top: 10px;
		border-radius: 25px;
		z-index: 50;
	}

	.HUD p {
		padding: 0 15px;
		color: black;
		display: inline-block;
		vertical-align: middle;
	}

	.HUD button {
		background-color: black;
		border: 2px solid rgba(0, 0, 0, 0.25);
		color: white;
		padding: 10px 12px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		margin: 4px 5px 4px -5px;
		border-radius: 50%;
		vertical-align: middle;
		cursor: pointer;
	}

	.HUD .history {
		background-color: #dc3545;
	}

	.HUD .solution {
		background-color: #17a2b8;
	}

	.HUD svg {
		vertical-align: middle;
	}

	.HUD button:disabled {
		background-color: gray;
		border: 2px solid darkgrey;
		cursor: default;
	}

	.blocker {
		position: absolute;
		z-index: 49;
		left: 0px;
		top: 0px;
		background: rgba(0, 0, 0, 0.5);
		opacity: 0;
	}

	.blocker button {
		width: 80px;
		display: inline-block;
		font-weight: 400;
		text-align: center;
		white-space: nowrap;
		vertical-align: middle;
		user-select: none;
		border: 1px solid transparent;
		padding: 0.375rem 0.75rem;
		font-size: 1rem;
		line-height: 1.5;
		border-radius: 0.25rem;
		transition: all 0.5s;
	}

	.blocker button:hover {
		filter: brightness(2);
		cursor: pointer;
	}

	.blocker .confirm {
		color: #fff;
		background-color: #28a745;
		border-color: #28a745;
		float: left;
	}

	.blocker .cancel {
		color: #fff;
		background-color: #dc3545;
		border-color: #dc3545;
		float: right;
	}

	.blocker svg {
		vertical-align: text-top;
	}
</style>
