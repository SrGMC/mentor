<script>
	import { page } from "$app/stores";

</script>

<svelte:head>

</svelte:head>

<div class="content">
	{#if $page.status == 404}
		<div class="empty">
			<h1>404</h1>
			<div class="title">Page not found</div>
			<div class="muted">
				Uh oh! Seems that this page does not exist.
			</div>
		</div>
	{:else if $page.status == 500}
		<div class="empty">
			<h1>500</h1>
			<div class="title">Panic</div>
			<div class="muted">
				Oh no! You shouldn't be seeing this! Something has broken.<br>
                But don't worry, we have notified our engineers.
			</div>
		</div>
	{:else}
		<h1>{$page.status}</h1>
		<div class="title">{$page.error?.message}</div>
	{/if}
    <br>
	<a href="/dashboard" class="button">Go to dashboard →</a>
</div>

<style>
	h1 {
		font-size: 5rem;
		margin-bottom: 0;
	}

    .title {
        font-size: 2rem;
        margin: 10px 0;
    }

    .content {
		margin: 0 auto;
		max-width: 1200px;
        margin-top: 120px;
	}

    .muted {
        color: var(--dark-color-variant2)
    }

    .button {
        margin-top: 20px;
    }
</style>
