<script lang="ts">
	import type { ProblemStore } from '../stores/problemStore';

	export let num: number;
	export let problem: ProblemStore;

	$: width = 300 / problem.col_size;
	$: height = 300 / problem.row_size;
	$: data = problem.data;

	const getStyle = (i: number, j: number): string => {
		const value = data[i][j];
		const bottom = (data[i].length - 1 - j) * height;
		const left = i * width;
		// Width and Height -2 Because of the border 1px on each side
		const style = `
			width: ${width - 2}px; 
			height: ${height - 2}px;
			bottom: ${bottom}px;
			left: ${left}px;
			background-image: url(${
				value === problem.current ? '/images/Container_Blue.png' : '/images/Container_Green.png'
			});
		`;
		return style;
	};
</script>

<div class="problem">
	<div class="label">Problem #{num}</div>
	<div class={`table`}>
		{#each data as _, i}
			{#each data[i] as _, j (`${i}.${j}`)}
				<div class="cell" style={getStyle(i, j)}>
					<p>{data[i][j]}</p>
				</div>
			{/each}
		{/each}
	</div>
</div>

<style>
	.problem {
		background: linear-gradient(to bottom, #262626, black);
		border: 4px solid #262626;
		border-radius: 5px;
		padding: 10px;
		transition: all 0.5s;
	}

	.problem:hover {
		filter: brightness(2);
		cursor: pointer;
	}

	.problem .label {
		margin-bottom: 10px;
	}

	.problem .table {
		background: transparent;
		position: relative;
		width: 300px;
		height: 300px;
		border: 1px groove darkcyan;
	}

	.problem .cell {
		font-family: 'Impact';
		font-size: 32px;
		border: 1px solid black;
		position: absolute;
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	.problem .cell p {
		margin: 0px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
