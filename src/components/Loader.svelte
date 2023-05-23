<div class="loader">
    <span class="dot">•</span>
    <span class="dot">•</span>
    <span class="dot">•</span>
</div>

<style>
    .loader,
	.loader .dot {
        display: inline-block;
        letter-spacing: -0.1rem;
    }

    .loader .dot:last-child {
        margin-right: 2px;
    }

    .loader .dot:nth-child(1) {
        animation: load 1s ease-in-out 0.25s infinite;
    }

    .loader .dot:nth-child(2) {
        animation: load 1s ease-in-out 0.5s infinite;
    }

    .loader .dot:nth-child(3) {
        animation: load 1s ease-in-out 0.75s infinite;
    }

	@keyframes load {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}
</style>
