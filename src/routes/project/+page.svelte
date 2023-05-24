<script lang="ts">
	import { getProjectById } from '../../data/projects';
	import { getUserProject as getUserProjectById, setUserProjectProperty } from '$lib/scripts/utils';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import StatusBar from './StatusBar.svelte';
	import { Board, type Product, type Project, type Tool, type UserProject } from '../../data/types';
	import Popup from '../../components/Popup.svelte';
	import { getProductByName } from '../../data/products';

	let userProjectId = parseInt(<string>$page.url.searchParams.get('userProjectId'));
	let projectId = parseInt(<string>$page.url.searchParams.get('projectId'));

	let popupOpen = false;
	let finished = false;

	$: userProject = <UserProject>getUserProjectById(<UserProject['id']>userProjectId);
	$: project = <Project>getProjectById(<Project['id']>projectId);

	let currentTool: Tool | undefined = undefined;
	let resuming: boolean;
	let direction: 'forward' | 'backward' = 'forward';

	let board: Board;

	onMount(() => {
		if (!userProject || !project) {
			alert('Project not found');
			goto('/dashboard/');
		}

		if (localStorage.getItem('board')) {
			const linkedBoard = JSON.parse(<string>localStorage.getItem('board'));
			board = new Board(linkedBoard.ip, linkedBoard.id, <Product>getProductByName('woodwork'));
		}

		resuming = userProject.currentStep != 0;
		currentTool = project.steps[userProject.currentStep].tool;

		if (userProject.currentStep == project.steps.length - 1) {
			finished = true;
			return;
		}

		if (currentTool) {
			userProject.currentStep--;
			popupOpen = true;
		}
	});

	function next() {
		direction = 'forward';
		const nextTool = project.steps[userProject.currentStep + 1]?.tool;
		if ((!currentTool && nextTool) || (currentTool && !nextTool)) {
			popupOpen = true;
			if (board) {
				board.on();
			}
			return;
		}
		if (userProject.currentStep < project.steps.length - 1) {
			userProject = setUserProjectProperty(userProject, 'currentStep', userProject.currentStep + 1);
		} else {
			finished = true;
		}
	}

	function previous() {
		direction = 'backward';
		finished = false;
		const previousTool = project.steps[userProject.currentStep - 1].tool;

		console.log('Called previous()', previousTool, currentTool, direction);

		if ((!currentTool && previousTool) || (currentTool && !previousTool)) {
			popupOpen = true;
			if (board) {
				board.on();
			}
			return;
		}

		if (userProject.currentStep > 0) {
			userProject = setUserProjectProperty(userProject, 'currentStep', userProject.currentStep - 1);
		}
	}

	function pickUpTool() {
		currentTool =
			direction == 'forward'
				? project.steps[userProject.currentStep + 1].tool
				: project.steps[userProject.currentStep - 1].tool;
		if (userProject.currentStep >= 0 && userProject.currentStep <= project.steps.length - 1) {
			userProject = setUserProjectProperty(
				userProject,
				'currentStep',
				direction == 'forward' ? userProject.currentStep + 1 : userProject.currentStep - 1
			);
		}
		popupOpen = false;
	}

	function placeBackTool() {
		currentTool = undefined;
		if (userProject.currentStep >= 0 && userProject.currentStep <= project.steps.length - 1) {
			userProject = setUserProjectProperty(
				userProject,
				'currentStep',
				direction == 'forward' ? userProject.currentStep + 1 : userProject.currentStep - 1
			);

			if (board) {
				board.off();
			}
		}
		popupOpen = false;
	}
</script>

<svelte:head>
	{#if project}
		<title>{project.name} | Mentor</title>
	{:else}
		<title>Project not found | Mentor</title>
	{/if}
</svelte:head>

<Popup confetti={true} open={finished}>
	<div class="popup">
		<div class="tick">
			<i class="las la-check-circle" />
		</div>
		<h1>You have completed this project!</h1>
		<a class="button rounded" href="/dashboard/">Exit project</a><br /><br />
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="link"
			style="color: var(--red-color)"
			on:click={() => {
				finished = false;
				setUserProjectProperty(userProject, 'currentStep', 0);
				window.location.reload();
			}}
		>
			Restart project
		</div>
	</div>
</Popup>

<Popup open={popupOpen}>
	<div class="popup">
		{#if resuming}
			<!-- svelte-ignore a11y-missing-attribute -->
			<img src={currentTool?.image} />
			<p class="tool-description">
				To continue, please pick up the {currentTool?.name} from the board.
			</p>
			<button
				class="button"
				on:click={() => {
					pickUpTool();
					resuming = false;
				}}>I have picked up the tool</button
			>
		{:else if direction == 'forward'}
			{#if !currentTool && project.steps[userProject.currentStep + 1].tool}
				<!-- svelte-ignore a11y-missing-attribute -->
				<img src={project.steps[userProject.currentStep + 1].tool?.image} />
				<p class="tool-description">
					To continue, please pick up the {project.steps[userProject.currentStep + 1].tool?.name} from
					the board.
				</p>
				<button class="button" on:click={pickUpTool}>I have picked up the tool</button>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="link"
					on:click={() => {
						popupOpen = false;
					}}
				>
					← Keep me in this step
				</div>
			{:else}
				<!-- svelte-ignore a11y-missing-attribute -->
				<img src={currentTool?.image} />
				<p class="tool-description">
					To continue, please place the {currentTool?.name} back to the board.
				</p>
				<button class="button" on:click={placeBackTool}>I have placed back the tool</button>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="link"
					on:click={() => {
						popupOpen = false;
					}}
				>
					← Keep me in this step
				</div>
			{/if}
		{:else if direction == 'backward'}
			{#if !currentTool && project.steps[userProject.currentStep - 1].tool}
				<!-- svelte-ignore a11y-missing-attribute -->
				<img src={project.steps[userProject.currentStep - 1].tool?.image} />
				<p class="tool-description">
					To continue, please pick up the {project.steps[userProject.currentStep - 1].tool?.name} from
					the board.
				</p>
				<button class="button" on:click={pickUpTool}>I have picked up the tool</button>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="link"
					on:click={() => {
						popupOpen = false;
					}}
				>
					← Keep me in this step
				</div>
			{:else}
				<!-- svelte-ignore a11y-missing-attribute -->
				<img src={currentTool?.image} />
				<p class="tool-description">
					To continue, please place the {currentTool?.name} back to the board.
				</p>
				<button class="button" on:click={placeBackTool}>I have placed back the tool</button>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="link"
					on:click={() => {
						popupOpen = false;
					}}
				>
					← Keep me in this step
				</div>
			{/if}
		{/if}
	</div>
</Popup>

<div class="step">
	<div style="width: calc(100% - 200px);">
		{@html project.steps[userProject.currentStep].content}
	</div>
</div>

<StatusBar bind:userProject bind:project {next} {previous} />

<style>
	.step {
		padding-left: 120px;
		display: flex;
		align-items: center;
		position: relative;
		top: 64px;
		bottom: 64px;
		left: 0;
		right: 0;
		height: calc(100% - 64px - 64px);
		width: calc(100% - 80px);
		overflow: hidden;
		flex-shrink: 0;
		margin: 0;
	}

	.popup .tool-description {
		font-size: 1.5rem;
	}

	.popup .link {
		cursor: pointer;
		text-decoration: underline;
		margin-top: 10px;
	}

	.popup img {
		height: 200px;
	}

	.popup .tick {
		color: #40c057;
		font-size: 10rem;
	}
</style>
