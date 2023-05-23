<script lang="ts">
	import { setUserProjectProperty } from '$lib/scripts/utils';
	import type { Project, UserProject } from '../../data/types';

	export let userProject: UserProject;
	export let project: Project;
	export let next = () => {};
	export let previous = () => {};
</script>

<div class="statusbar">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class={`previous ${userProject.currentStep == 0 ? 'disabled' : ''}`} on:click={previous}>
		<i class="las la-angle-left" /> Previous
	</div>
	<div class="center">{userProject.currentStep + 1}/{project.steps.length}</div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class={`next ${userProject.currentStep == project.steps.length - 1 ? 'disabled' : ''}`}
		on:click={next}
	>
		Next <i class="las la-angle-right" />
	</div>
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
</style>
