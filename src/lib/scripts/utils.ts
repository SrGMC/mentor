import type { UserProject } from '../../data/types';

export function getUserProjects() {
	if (!localStorage.getItem('projects')) {
		return [];
	}

	let projects = <UserProject[]>JSON.parse(<string>localStorage.getItem('projects'));
	projects.forEach((project) => {
		project.lastOpened = new Date(project.lastOpened);
	});

	return projects;
}

export function getUserProject(id: UserProject['id']) {
	if (!localStorage.getItem('projects')) {
		return null;
	}
	const projects: UserProject[] = JSON.parse(<string>localStorage.getItem('projects'));

	return projects.find((p) => p.id == id);
}

export function setUserProjectProperty(project: UserProject, property: string, value: any) {
	// @ts-ignore
	project[property] = value;

	let projects = getUserProjects();
	projects.forEach((p) => {
		if (p.id == project.id) {
			// @ts-ignore
			p[property] = value;
		}
	});

	localStorage.setItem('projects', JSON.stringify(projects));

    return project;
}
