<script lang="ts">
	import { setUserProjectProperty } from '$lib/scripts/utils';
	import type { Project, UserProject } from '../../data/types';

	export let userProject: UserProject;
	export let project: Project;
	export let next = () => {};
	export let previous = () => {};

	$: percentageCompleted = (userProject.currentStep / (project.steps.length - 1)) * 100;
</script>

<div class="progressbar">
	<div class="progress" style={`width: ${percentageCompleted}%;`}></div>
</div>

<div class="statusbar">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class={`previous ${userProject.currentStep == 0 ? 'disabled' : ''}`} on:click={previous}>
		<i class="las la-angle-left" /> Previous
	</div>
	<div class="center">{userProject.currentStep + 1}/{project.steps.length}</div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	{#if userProject.currentStep < project.steps.length - 1}
		<div
			class={`next ${userProject.currentStep == project.steps.length - 1 ? 'disabled' : ''}`}
			on:click={next}
		>
			Next <i class="las la-angle-right" />
		</div>
	{:else}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="next" on:click={next}>
			<i class="las la-check-circle" />&nbsp;Finish project
		</div>
	{/if}
</div>

<style>
	.statusbar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 64px;
		max-height: 100%;
		border-top: 1px solid var(--dark-color-variant2);
	}

	.statusbar .next,
	.statusbar .previous {
		height: 64px;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 30px;
		width: 15%;
		font-size: 1.5rem;
		cursor: pointer;

		position: absolute;
		bottom: 0;
		z-index: 2;
	}

	.statusbar .next:hover,
	.statusbar .previous:hover {
		background-color: #f1f3f5;
		transition: all 0.125s ease-in-out;
	}

	.statusbar .next.disabled,
	.statusbar .previous.disabled {
		background-color: #f1f3f5;
		transition: all 0.125s ease-in-out;
		cursor: not-allowed;
	}

	.statusbar .next {
		border-left: 1px solid var(--dark-color-variant2);
		right: 0;
	}

	.statusbar .previous {
		border-right: 1px solid var(--dark-color-variant2);
		left: 0;
	}

	.statusbar .center {
		position: relative;
		height: 64px;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 30px;
		font-size: 1.5rem;
		cursor: pointer;
		text-align: center;
		width: 60%;
		margin: 0 auto;
		color: var(--dark-color-variant2);
	}

	.progressbar {
		position: fixed;
		bottom: 64px;
		left: 0;
		right: 0;
		height: 6px;
		background-color: #fff;
	}

	.progressbar .progress {
		position: absolute;
		display: inline-block;
		height: 6px;
		background: linear-gradient(90deg, rgba(255, 243, 59, 1) 0%, rgba(233, 62, 58, 1) 100%);
		width: 20%;
		margin: 0;
		padding: 0;

		transition: all 0.25s ease-in-out;
	}
</style>
