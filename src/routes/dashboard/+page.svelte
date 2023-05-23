<script lang="ts">
	import { browser } from "$app/environment";
    import ProjectList from "../../components/ProjectList.svelte";
</script>

<svelte:head>
	<title>My projects | Mentor</title>
</svelte:head>

<div class="content">
    <h1>My projects</h1>
    <div class="create-button">
        {#if browser && !localStorage.getItem('board')}
            <a href="/link/" class="button"><i class="las la-link"></i> Link board</a>
        {/if}
        <button disabled class="button"><i class="la la-plus"></i> Create project</button>
    </div>
    <ProjectList />
</div>

<style>
    .content {
		margin: 0 auto;
		max-width: 1200px;
        margin-top: 120px;
        padding: 0 10px;
	}
    h1 {
        font-size: 3rem;
        text-align: center;
        margin-bottom: 50px;
        font-weight: normal;
    }

    .create-button {
        text-align: right;
        margin: 15px;
    }
</style>