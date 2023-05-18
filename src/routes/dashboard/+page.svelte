<script lang="ts">
	import ProjectList from "../../components/ProjectList.svelte";


</script>

<div class="content">
    <h1>My projects</h1>
    <div class="create-button">
        <button disabled class="button"><i class="la la-plus"></i> Create project</button>
    </div>
    <ProjectList />
</div>

<style>
    .content {
		margin: 0 auto;
		max-width: 1200px;
        margin-top: 120px;
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