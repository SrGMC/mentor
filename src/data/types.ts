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
