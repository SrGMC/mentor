import type { Product, Tool } from './types';

export const tools: Tool[] = [
	{
		id: 'handsaw',
		name: 'Handsaw',
		image: '/assets/tools/handsaw.png'
	},
	{
		id: 'gluegun',
		name: 'Hot Glue Gun',
		image: '/assets/tools/gluegun.png'
	}
];

export const products: Product[] = [
	{
		id: 1,
		name: 'woodwork',
		price: 165.289,
		image: '/assets/woodwork.jpg',
		tools: [<Tool>getToolById('handsaw'), <Tool>getToolById('gluegun')]
	},
	{
		id: 2,
		name: 'paperwork',
		price: 165.289,
		image: '/assets/paperwork.jpg',
		tools: []
	},
	{
		id: 3,
		name: 'sewing kit',
		price: 165.289,
		image: '/assets/sewing.jpg',
		tools: []
	},
	{
		id: 4,
		name: 'electronics',
		price: 165.289,
		image: '/assets/electronics.jpg',
		tools: []
	},
	{
		id: 5,
		name: 'kitchen',
		price: 165.289,
		image: '/assets/kitchenwork.jpg',
		tools: []
	},
	{
		id: 6,
		name: 'artists',
		price: 165.289,
		image: '/assets/painting.jpg',
		tools: []
	}
];

export function getProductById(id: number) {
	return products.find((p) => p.id == id);
}

export function getProductByName(name: string) {
	return products.find((p) => p.name == name);
}

export function getToolById(id: Tool['id']) {
	return tools.find((t) => t.id == id);
}
