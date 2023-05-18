<script lang="ts">
	import { onMount } from 'svelte';
	import ProjectItem from './ProjectItem.svelte';

	let projects: any[] = [];

	onMount(() => {
		if (!localStorage.getItem('projects')) {
			projects = [
				{
                    id: 1,
					title: 'My project',
					type: 'woodwork',
					lastOpened: new Date(),
					percentCompleted: 10,
					image: '/assets/woodwork.jpg'
				}
			];
		} else {
			projects = JSON.parse(<string>localStorage.getItem('projects'));
		}
	});
</script>

<div class="list">
	{#each projects as project}
		<ProjectItem
            id={project.id}
			title={project.title}
			type={project.type}
			lastOpened={project.lastOpened.toLocaleDateString()}
			percentCompleted={project.percentCompleted}
			image={project.image}
		/>
	{/each}
</div>

<style>
</style>
