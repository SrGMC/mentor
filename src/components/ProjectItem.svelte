<script lang="ts">
	import { goto } from '$app/navigation';
	import { getProductById } from '../data/products';
	import { getProjectById } from '../data/projects';
	import type { Product, Project, UserProject } from '../data/types';

	export let userProject: UserProject;
	let project = <Project>getProjectById(userProject.projectId);
	let board = <Product>getProductById(project?.board);
	let percentageCompleted = (userProject.currentStep / (project.steps.length - 1)) * 100;
	console.log(percentageCompleted)
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="item"
	on:click={() => {
		goto(`/project?userProjectId=${userProject.id}&projectId=${project?.id}`);
	}}
>
	<div class="row">
		<div class="col col-20 image" style={`background-image: url('${board.image}')`}>.</div>
		<div class="col col-80 content">
			<div class="row">
				<div class="col col-85">
					<div class="title">{project.name}</div>
					<div class="type">{board.name}</div>
				</div>
				<div class="col col-15 open-button">
					<a
						href={`/project?userProjectId=${userProject.id}&projectId=${project?.id}`}
						class="button">Open →</a
					>
				</div>
			</div>

			<div class="last-opened">Last opened: {userProject.lastOpened.toLocaleDateString()}</div>
			<div class="progress-bar">
				<div class="bar" style={`width: ${percentageCompleted}%;`} />
			</div>
			<div class="percent-completed">{percentageCompleted.toFixed(0)}% completed</div>
		</div>
	</div>
</div>

<style>
	.item {
		/* border: 2px solid #dee2e6; */
		border-radius: var(--border-radius);
		background-color: #f1f3f5;
		color: var(--dark-color);
		cursor: pointer;
	}

	.item:hover {
		opacity: 0.8;
	}

	.item .image {
		color: transparent;
		border-top-left-radius: var(--border-radius);
		border-bottom-left-radius: var(--border-radius);
		background-size: cover;
		background-position: center;
		height: 100%;
		font-size: 12rem;
	}

	.item .content {
		padding: 20px 20px;
	}

	.item .content .open-button {
		margin-top: 17px;
		text-align: left;
	}

	.item .content .open-button .button {
		display: inline-block;
	}

	.item .content .title {
		font-size: 2rem;
		font-weight: bold;
		margin: 5px 0;
	}
	.item .content .type {
		font-size: 1.6rem;
		color: var(--dark-color-variant);
		margin: 5px 0;
	}

	.item .content .last-opened,
	.item .content .percent-completed {
		color: var(--dark-color-variant2);
	}

	.item .progress-bar {
		background-color: #dee2e6;
		/* border: 1px solid var(--dark-color-variant2); */
		border-radius: var(--border-radius);
		width: 100%;
		height: 28px;
		margin: 20px 0;
		margin-bottom: 10px;
	}

	.item .progress-bar .bar {
		background: rgb(255, 243, 59);
		border-radius: var(--border-radius);
		background: linear-gradient(90deg, rgba(255, 243, 59, 1) 0%, rgba(233, 62, 58, 1) 100%);
		height: 28px;
	}
</style>
