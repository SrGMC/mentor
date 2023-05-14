<script lang="ts">
	import { fade } from 'svelte/transition';

	export let items: any[] = [];
	let open = false;

	$: itemsInCart = items.filter((i) => i.inCart);
	$: totalBeforeTax =
		itemsInCart.length > 0
			? itemsInCart
					.map((i) => i.price)
					.reduce((accumulator, currentValue) => {
						console.log(accumulator, currentValue);
						return accumulator + currentValue;
					})
			: 0;
</script>

{#if open}
	<div class="cart-content" transition:fade={{ duration: 150 }}>
		<h2>Shopping cart</h2>
		{#each items.filter((i) => i.inCart) as item}
			<div class="item">
				<div class="row">
					<div class="col col-80">
						<div class="title">{item.name}</div>
						<div class="price">{(item.price * 1.21).toFixed(2)} €</div>
					</div>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						class="col col-20 remove"
						on:click={() => {
							item.inCart = false;
						}}
					>
						<i class="la la-trash" />
					</div>
				</div>
			</div>
		{/each}

		<div class="total">
			<div class="total-before-tax">Total: {totalBeforeTax.toFixed(2)} €</div>
			<div class="tax">Tax: {(totalBeforeTax * 0.21).toFixed(2)} €</div>
			<div class="total-after-tax">Total: {(totalBeforeTax * 1.21).toFixed(2)} €</div>
			<button class="button rounded checkout">
				<i class="las la-money-check" /> Checkout
			</button>
		</div>
	</div>
{/if}

{#if open}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="cart-button open"
		on:click={() => {
			open = false;
		}}
		transition:fade={{ duration: 150 }}
	>
		<i class="la la-times" />
	</div>
{:else}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="cart-button"
		on:click={() => {
			open = true;
		}}
		transition:fade={{ duration: 150 }}
	>
		<i class="la la-shopping-cart" />
	</div>
{/if}

<style>
	.cart-button {
		display: flex;
		justify-content: center;
		align-items: center;

		position: fixed;
		bottom: 0;
		right: 0;
		z-index: 200;

		height: 4rem;
		width: 4rem;

		background-color: var(--dark-color);
		color: var(--light-color);
		font-size: 2rem;

		margin: 15px;

		border-radius: 50px;

		cursor: pointer;
	}

	.cart-button.open {
		background-color: var(--red-color);
	}

	.cart-content {
		position: fixed;
		bottom: 0;
		right: 0;
		z-index: 150;

		background-color: var(--light-color);
		color: var(--dark-color);
		font-size: 18px;

		margin: 35px;
		padding: 15px;

		width: 100%;
		min-width: 150px;
		max-width: 300px;
		min-width: 100px;

		border-radius: var(--border-radius);

		box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.25);
	}

	h2 {
		margin-top: 5px;
	}

    .item {
        margin: 10px 0;
    }
        
	.item .remove {
		font-size: 1.5rem;
		margin-top: 7px;
		color: var(--red-color);
		text-align: right;
		padding-right: 10px;

		cursor: pointer;
	}

	.item .title {
		font-size: 1.2rem;
	}

	.item .price {
		color: var(--dark-color-variant2);
	}

	.total {
		margin-top: 20px;
	}

	.total-before-tax,
	.tax {
		color: var(--dark-color-variant2);
		font-size: 16px;
	}

	.total-after-tax {
		font-size: 24px;
		font-weight: bold;
	}

	.checkout {
		margin-top: 10px;
	}
</style>
