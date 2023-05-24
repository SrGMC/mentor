export type Product = {
	id: number;
	name: string;
	price: number;
	image: string;
	tools: Tool[];
};

export type Project = {
	id: number;
	name: string;
	board: Product['id'];
	steps: ProjectStep[];
};

export type ProjectStep = {
	content: string;
	tool?: Tool;
};

export type Tool = {
	id: string;
	name: string;
	image: string;
};

export type UserProject = {
	id: number;
	projectId: Project['id'];
	lastOpened: Date;
	currentStep: number;
};

export class Board {
	board: Product;
	address: string;
	id: string;

	constructor(address: string, id: string, board: Product) {
		this.board = board;
		this.address = address;
		this.id = id;
	}

	on() {
		return fetch(`http://${this.address}/on`);
	}

	off() {
		return fetch(`http://${this.address}/off`);
	}

	toggle() {
		return fetch(`http://${this.address}/toggle`);
	}

	async status() {
		return await (await fetch(`http://${this.address}/status`)).json();
	}
}
