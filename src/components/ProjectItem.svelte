<script lang="ts">
	import { goto } from "$app/navigation";

	export let id = 1;
	export let title = 'Project title';
	export let type = 'Type';
	export let lastOpened = new Date().toLocaleDateString();
	export let percentCompleted = 20;
	export let image = '/assets/electronics.jpg';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="item"
	on:click={() => {
		goto(`/project?id=${id}`);
	}}
>
	<div class="row">
		<div class="col col-20 image" style={`background-image: url('${image}')`}>.</div>
		<div class="col col-80 content">
			<div class="row">
				<div class="col col-85">
					<div class="title">{title}</div>
					<div class="type">{type}</div>
				</div>
				<div class="col col-15 open-button">
					<a href={`/project?id=${id}`} class="button">Open →</a>
				</div>
			</div>

			<div class="last-opened">Last opened: {lastOpened}</div>
			<div class="progress-bar">
				<div class="bar" style={`width: ${percentCompleted}%;`} />
			</div>
			<div class="percent-completed">{percentCompleted}% completed</div>
		</div>
	</div>
</div>

<style>
	.item {
		border: 2px solid #dee2e6;
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
		border: 1px solid var(--dark-color-variant2);
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
