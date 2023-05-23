<script lang="ts">
	import { onMount } from 'svelte';
	import ProjectItem from './ProjectItem.svelte';
	import type { UserProject } from '../data/types';
	import { getUserProjects } from '$lib/scripts/utils';

	let projects: UserProject[] = [];

	onMount(() => {
		if (!localStorage.getItem('projects')) {
			projects = [
				{
					id: 1,
					projectId: 1,
					lastOpened: new Date(),
					currentStep: 0
				}
			];
			localStorage.setItem('projects', JSON.stringify(projects));
		} else {
			projects = getUserProjects();
		}
	});
</script>

<div class="list">
	{#each projects as project}
		<ProjectItem bind:userProject={project} />
	{/each}
</div>

<style>
</style>
