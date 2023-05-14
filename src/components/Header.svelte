<script lang="ts">
	import { onMount } from 'svelte';

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
</script>

<nav class="scrolled">
	<a href="/" class="logo scrolled">
		<img alt="Mentor logo" src="https://placehold.co/64" height="64" width="64" />
	</a>
	<ul class="links">
		<li>
			<a href="#products">Products</a>
		</li>
		<li>
			<a href="#about">About</a>
		</li>
		<li>
			<a class="button rounded" href="/">Get started</a>
		</li>
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

	ul.links li a:hover {
		color: var(--dark-color-variant);
	}

	ul.links li a.button {
		color: var(--light-color);
	}
</style>
