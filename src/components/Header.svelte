<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getUserProject, setUserProjectProperty } from '$lib/scripts/utils';
	import { onMount } from 'svelte';
	import type { UserProject } from '../data/types';

	onMount(() => {
		triggerNavbar();
		window.addEventListener('scroll', function () {
			triggerNavbar();
		});
	});

	function triggerNavbar() {
		var top = window.pageYOffset || document.documentElement.scrollTop;
		if (top > 100) {
			document.querySelector('.logo')?.classList.add('scrolled');
			document.querySelector('nav')?.classList.add('scrolled');
		} else {
			document.querySelector('.logo')?.classList.remove('scrolled');
			document.querySelector('nav')?.classList.remove('scrolled');
		}
	}

	function exitProject() {
		if (confirm('Do you really want to exit the project? Your progress is automatically saved.')) {
			goto('/dashboard/', { replaceState: true, invalidateAll: true });
		}
	}

	function restartProgress() {
		if (
			confirm(
				'Do you want to start the project from the begining? Your current progress will be lost'
			)
		) {
			const userProject: UserProject = <UserProject>(
				getUserProject(<number>parseInt(<string>$page.url.searchParams.get('userProjectId')))
			);
			setUserProjectProperty(userProject, 'currentStep', 0);
			window.location.reload();
		}
	}
</script>

<nav class="scrolled">
	{#if $page.url.pathname == '/project/'}
		<img alt="Mentor logo" src="https://placehold.co/64" height="64" width="64" />
	{:else}
		<a href="/" class="logo scrolled">
			<img alt="Mentor logo" src="https://placehold.co/64" height="64" width="64" />
		</a>
	{/if}
	<ul class="links">
		{#if $page.url.pathname == '/' || $page.url.pathname == '/dashboard/' || $page.url.pathname == '/link/'}
			<li>
				<a href="/#products">Products</a>
			</li>
			<li>
				<a href="/#about">About</a>
			</li>
		{/if}
		{#if $page.url.pathname == '/'}
			<li>
				<a class="button rounded" href="/dashboard/">Get started</a>
			</li>
		{/if}
		{#if $page.url.pathname == '/dashboard/' || $page.url.pathname == '/link/'}
			<li>
				<a class="button rounded" href="/dashboard/">My projects</a>
			</li>
		{/if}
		{#if $page.url.pathname == '/project/'}
			<li>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="link" on:click={restartProgress}>Restart project</div>
			</li>
			<li>
				<button class="button rounded red" on:click={exitProject}>Exit project</button>
			</li>
		{/if}
	</ul>
</nav>

<style>
	nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;

		width: 100%;
		height: 64px;

		display: flex;
		justify-content: center;

		transition: all 500ms ease-in-out;
	}

	nav.scrolled {
		background-color: var(--light-color);
		transition: all 500ms ease-in-out;
	}

	nav .logo {
		flex: 0;
		transition: all 800ms ease-in-out;
	}

	nav .logo.scrolled {
		flex: 1;
		transition: all 800ms ease-in-out;
	}

	ul.links {
		position: fixed;
		top: 0;
		right: 0;
		list-style: none;

		margin-top: 23px;
	}

	ul.links li {
		display: inline-block;
		margin: 0 10px;
	}

	ul.links li a {
		color: var(--dark-color);
	}

	ul.links li button {
		margin-top: -10px;
	}

	ul.links li a:hover {
		color: var(--dark-color-variant);
	}

	ul.links li a.button {
		color: var(--light-color);
	}

	div.link {
		text-decoration: underline;
		cursor: pointer;
	}
</style>
