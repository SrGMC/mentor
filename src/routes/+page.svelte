<script lang="ts">
	import '$lib/styles/style.css';
	import '$lib/styles/grid.css';
	import 'line-awesome/dist/line-awesome/css/line-awesome.min.css';

	import Header from '../components/Header.svelte';
	import Cart from '../components/Cart.svelte';

	let products = [
		{
			id: 1,
			name: 'woodwork',
			price: 165.289,
			inCart: false,
			image: '/assets/woodwork.jpg'
		},
		{
			id: 2,
			name: 'paperwork',
			price: 165.289,
			inCart: false,
			image: '/assets/paperwork.jpg'
		},
		{
			id: 3,
			name: 'sewing kit',
			price: 165.289,
			inCart: false,
			image: '/assets/sewing.jpg'
		},
		{
			id: 4,
			name: 'electronics',
			price: 165.289,
			inCart: false,
			image: '/assets/electronics.jpg'
		},
		{
			id: 5,
			name: 'kitchen',
			price: 165.289,
			inCart: false,
			image: '/assets/kitchenwork.jpg'
		},
		{
			id: 6,
			name: 'artists',
			price: 165.289,
			inCart: false,
			image: '/assets/painting.jpg'
		}
	];
</script>

<svelte:head />

<Header />

<div class="jumbotron">
	<div class="header">
		<div>
			<div class="title">
				<h1>Let's get our hands dirty!</h1>
			</div>
			<br />
			<div>
				<a class="button rounded" href="/login/">Get started →</a>
			</div>
		</div>
	</div>
</div>

<div class="content">
	<section id="about">
		<h1>what's mentor?</h1>
		<p>
			Mentor is an <b>innovative project system</b> that uses an LED-punched board and a digital
			application to help you complete build and explore new projects in a more efficient and
			organized manner.
			<br /><br />
			With Mentor, you can see in real time the steps needed to complete your project, receive notifications
			of tools needed, and get an overview of your progress.
			<br /><br />
			Whether you are a beginner or an expert at completing projects,
			<b>Mentor will guide you along the way</b>
			to achieving your goals more efficiently and successfully.
		</p>
		<div class="row">
			<div class="col col-33">
				<div class="highlight" style={`background: url('/assets/painting.jpg');`}>
					<div class="text">Lorem ipsum dolor sit amet</div>
				</div>
			</div>
			<div class="col col-33">
				<div class="highlight" style={`background: url('/assets/woodwork.jpg');`}>
					<div class="text">Lorem ipsum dolor sit amet</div>
				</div>
			</div>
			<div class="col col-33">
				<div class="highlight" style={`background: url('/assets/sewing.jpg');`}>
					<div class="text">Lorem ipsum dolor sit amet</div>
				</div>
			</div>
		</div>
	</section>

	<section>
		<h1>what's in the box?</h1>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Et malesuada fames ac turpis egestas. Elementum curabitur vitae
			nunc sed velit dignissim sodales. Purus in massa tempor nec feugiat nisl pretium.
		</p>
	</section>

	<section id="products">
		<h1>our products</h1>

		<div class="product-list">
			{#each products as product}
				<div class="item col col-33">
					<div class="image" style={`background: url('${product.image}')`} />
					<div class="title">{product.name}</div>
					<div class="price">{(product.price * 1.21).toFixed(2)} €</div>
					<div class="cart-button">
						{#if !product.inCart}
							<button
								class="button rounded"
								on:click={() => {
									product.inCart = true;
								}}
							>
								<i class="la la-shopping-cart" /> Add to cart
							</button>
						{:else}
							<button
								class="button red rounded"
								on:click={() => {
									product.inCart = false;
								}}
							>
								<i class="la la-times" /> Remove from cart
							</button>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section id="team">
		<h1>meet the team</h1>
		<div class="row">
			<div class="member col col-33">
				<div class="image" style={`background: url('/assets/painting.jpg');`} />
				<div class="title">Álvaro Galisteo</div>
				<div class="description">Developer</div>
			</div>
			<div class="member col col-33">
				<div class="image" style={`background: url('/assets/painting.jpg');`} />
				<div class="title">Sarah Galisteo</div>
				<div class="description">UI Designer</div>
			</div>
			<div class="member col col-33">
				<div class="image" style={`background: url('/assets/painting.jpg');`} />
				<div class="title">Berta</div>
				<div class="description">Dog</div>
			</div>
		</div>
	</section>
</div>

{#if products.filter((p) => p.inCart).length > 0}
	<Cart bind:items={products} />
{/if}

<style>
	.jumbotron {
		height: 100%;
		width: 100%;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.jumbotron .header {
		display: flex;
		justify-content: center;
		align-items: center;

		background: url('/assets/jumbotron.background.jpg');
		background-position: center;
		background-size: cover;

		border-radius: var(--border-radius);

		color: var(--light-color);
		font-size: 1.8rem;
		text-align: center;
		text-shadow: 0 0 20px var(--dark-color);

		max-width: 80%;
		max-height: 80%;
		min-width: 70%;
		min-height: 70%;

		margin: 15px;
		padding: 20px;
	}

	.jumbotron .header div {
		display: inline-block;
	}

	.jumbotron .header .button {
		font-size: 1.5rem;
	}

	.content {
		margin: 0 auto;
		max-width: 80%;
		text-align: center;
	}

	section {
		padding: 20px 0;
		display: inline-block;
		text-align: left;
		max-width: 1200px;
		width: 100%;

        font-size: 20px;
	}

	section h1 {
		font-size: 2rem;
		margin-bottom: 0;
	}

	section#about .highlight {
		margin: 15px;
		aspect-ratio: 1;
		background-position: center !important;
		background-size: cover !important;

		border-radius: var(--border-radius);
		display: flex;
		justify-content: center;
		align-items: center;

		transition: all 0.125s ease-in-out;
	}

	section#about .highlight .text {
		display: flex;
		justify-content: center;
		align-items: center;

		height: 100%;
		width: 100%;

		padding: 15px;

		background-color: rgba(0, 0, 0, 0.5);
		color: var(--light-color);
		border-radius: var(--border-radius);

		opacity: 0;
		transition: opacity 0.125s ease-in-out;
	}

	section#about .highlight:hover .text {
		opacity: 1;
		transition: opacity 0.125s ease-in-out;
	}

	section#about .row .col,
	section#team .row .col {
		padding: 15px;
		text-align: center;
	}

	section#products .col {
		padding: 10px 30px;
	}

	section#products {
		text-align: center;
	}

	section#products h1 {
		text-align: left;
	}

	section#products .product-list {
		max-width: 1000px;
		display: inline-block;
		width: 100%;
	}

	section#products .item {
		text-align: center;
		margin: 10px 0;
	}

	section#products .item .image {
		margin: 15px;
		aspect-ratio: 1;
		background-position: center !important;
		background-size: cover !important;

		border-radius: var(--border-radius);
		display: flex;
		justify-content: center;
		align-items: center;

		transition: all 0.125s ease-in-out;
	}

	section#products .item .title {
		font-size: 20px;
	}

	section#products .item .price {
		font-size: 20px;
		color: var(--dark-color-variant2);
	}

	section#products .item .cart-button {
		margin-top: 20px;
		margin-bottom: 5px;
	}

	section#team .member {
		text-align: center;
		margin: 20px 0;
	}

	section#team .member .image {
		margin: 15px;
		aspect-ratio: 1;
		background-position: center !important;
		background-size: cover !important;

		height: 200px;
		width: 200px;

		border-radius: 100%;
		display: inline-block;

		transition: all 0.125s ease-in-out;
	}

	section#team .member .title {
		font-size: 20px;
	}

	section#team .member .description {
		color: var(--dark-color-variant2);
	}
</style>