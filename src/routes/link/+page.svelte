<script lang="ts">
	import { onMount } from 'svelte';
	import Spinner from '../../components/Loader.svelte';
	import { goto } from '$app/navigation';

	type BoardResponse = {
		url: string;
		response: {
			healthcheck: string;
			hostname: string;
		};
	};

	let boardId = '';
	let boardIp = '';
	let found: boolean | null = null;
    let scanning = false;

	function fetchWithTimeout(url: string, timeout: number) {
		return new Promise((resolve, reject) => {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => {
				controller.abort();
				reject();
			}, timeout);
			fetch(url, { signal: controller.signal }).then(async (response) => {
				clearTimeout(timeoutId);
				resolve({ url: url, response: await response.json() });
			});
		});
	}

	function generateAddresses(ip: string, block: number) {
		const ipAddress = ip.split('.').map(Number); // Convert IP string to an array of numbers
		const blockSize = 32 - block; // Calculate the number of bits in the host part of the address
		const numAddresses = Math.pow(2, blockSize); // Calculate the number of possible addresses

		const addresses = [];

		// Convert the IP address to a number
		let address = 0;
		for (let i = 0; i < 4; i++) {
			address += ipAddress[i] * Math.pow(256, 3 - i);
		}

		// Generate all possible addresses by incrementing the host part
		for (let i = 0; i < numAddresses; i++) {
			addresses.push([
				(address >> 24) & 255,
				(address >> 16) & 255,
				(address >> 8) & 255,
				address & 255
			]);

			address++;
		}

		// Convert the array of arrays to an array of strings
		const addressStrings = addresses.map((addr) => addr.map(String).join('.'));

		return addressStrings;
	}

	function groupArrayItems(array: any[], n: number) {
		const groups = [];
		const itemsPerGroup = n;

		for (let i = 0; i < array.length; i += itemsPerGroup) {
			const group = array.slice(i, i + itemsPerGroup);
			groups.push(group);
		}

		return groups;
	}

	async function scanAddresses(ip: string, block: number, id: string) {
		let addresses = groupArrayItems(generateAddresses(ip, block), 16);

		for (let i = 0; i < addresses.length; i++) {
			const addressBlock = addresses[i];
			const promises = [];
			for (let j = 0; j < addressBlock.length; j++) {
				const address = addressBlock[j];
				promises.push(fetchWithTimeout(`http://${address}/health`, 1000));
			}

			try {
				let result: BoardResponse = <BoardResponse>await Promise.race(promises);
				if (result.response.hostname.includes(id)) {
					return result;
				}
			} catch (err) {}
		}

		return null;
	}

	async function scanBoard() {
		if (boardId == '') {
			return;
		}

        scanning = true;

		let cidrBlocks: Array<Array<string | number>> = [
			['192.168.0.0', 24],
			['192.168.1.0', 24],
			['10.0.0.0', 24],
			['10.0.1.0', 24]
		];

		let result: BoardResponse | null = null;
		for (let i = 0; i < cidrBlocks.length; i++) {
			const block = cidrBlocks[i];
			result = await scanAddresses(<string>block[0], <number>block[1], boardId);
			if (result != null) {
				break;
			}
		}

		if (result) {
			found = true;
			boardIp = result.url.replace('http://', '').replace('/health', '');
		} else {
			found = false;
		}
        scanning = false;
	}

    function linkBoard() {
        const board = {
            "id": boardId,
            "ip": boardIp
        }
        localStorage.setItem('board', JSON.stringify(board));
        alert("Board successfully linked!");
        goto('/dashboard/');
    }

	onMount(async () => {
		// console.log("Address", await scanAddresses('192.168.1.2', 27, 'ESP-C2AF1D'));
	});
</script>

<svelte:head>
	<title>Link board | Mentor</title>
</svelte:head>

<div class="content">
	<h1>Link your board</h1>
	<div class="form">
        {#if found === null || found === false}
            <input type="text" placeholder="Board ID" bind:value={boardId} /><br />
            {#if !scanning}
                <button class="button" disabled={boardId == ''} on:click={() => {scanBoard()}}><i class="las la-search" /> Search board</button>
            {:else}
                <button class="button" disabled={true}><Spinner /> Searching</button>
            {/if}
            {#if found === false}
                <div class="error">
                    We couldn't find your board. Make sure it is on and/or your browser allows mixed content.
                </div>
            {/if}
        {:else if found === true}
            <div class="board-found">Board <b>{boardId}</b> ({boardIp}) was found in your network!</div><br />
            <button class="button" disabled={boardId == ''} on:click={() => {linkBoard()}}><i class="las la-plus" /> Link board</button>
        {/if}
		<div class="text">
			<p>
				With a Mentor board, you can enhance your project making skills with real-time indications
				on what tools to use and when.
			</p>
			<h3><i class="las la-info-circle" /> How to connect your board</h3>
			<p>In order to connect to the board, make sure that:</p>
			<ul>
				<li>The board is connected to the power and the power indicator is on</li>
				<li>
					Your browser allows mixed content to the Mentor website:
					<a
						href="https://experienceleague.adobe.com/docs/target/using/experiences/vec/troubleshoot-composer/mixed-content.html?lang=en"
					>
						How to enable mixed content in your browser
					</a>
				</li>
			</ul>
			<h3><i class="las la-info-circle" /> Where can I find the board ID?</h3>
			<p>You can find the board ID:</p>
			<ul>
				<li>Behind the board</li>
				<li>In the box your board came with</li>
			</ul>
		</div>
	</div>
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

	.form {
		text-align: center;
	}

	.form input {
		display: inline-block;
		font-size: 2rem;
		background-color: #f1f3f5;
		border-radius: var(--border-radius);
		padding: 10px 20px;
		border: none;
		margin: 15px 0;
	}

	.form .button {
        margin-top: 5px;
		margin-bottom: 20px;
	}

	.form .text {
		margin: 10px auto;
		text-align: left;
		max-width: 700px;
	}

    .form .board-found {
        font-size: 1.6rem;
    }
</style>
