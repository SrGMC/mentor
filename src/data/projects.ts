import { getProductByName, getToolById } from './products';
import type { Project, Tool } from './types';

const projects: Project[] = [
	{
		id: 1,
		name: 'Small wooden window frame',
		board: <number>getProductByName('woodwork')?.id,
		steps: [
			{
				content:
					'<h1 id=initial-materials>Initial materials</h1><p>Gather the following materials before starting the project:<ul><li>2x1cm cross-section wooden strips<li>3mm thick plexiglass</ul><p>As well as the following additional tools<ul><li>Hot silicone glue bars<li>A pencil<li>Alcohol-based marker</ul>'
			},
			{
				content:
					'<div class=row><div class="col col-50"><p>First, draw the vertical measurements (x) twice.<p>Then, mark the horizontal measurements (y) twice as well.</div><div class="col col-50"><img src=/assets/projects/1/step2.png></div></div>'
			},
			{
				content:
					'<div class=row><div class="col col-50"><p>Cut the four strips with the handsaw</p></div><div class="col col-50"><img src=/assets/projects/1/step3.png></div></div>',
				tool: <Tool>getToolById('handsaw')
			},
			{
				content:
					'<div class=row><div class="col col-50"><p>With the alcohol-based marker, mark the vertical and horizontal measurements on the protective plastic of the plexiglass.</p></div><div class="col col-50"><img src=/assets/projects/1/step4.png></div></div>',
				tool: <Tool>getToolById('handsaw')
			},
			{
				content:
					'<div class=row><div class="col col-50"><p>Cut the plexiglass along the marks you made.</p></div><div class="col col-50"><img src=/assets/projects/1/step3.png></div></div>',
				tool: <Tool>getToolById('handsaw')
			},
			{
				content:
					'<div class=row><div class="col col-50"><p>Place the wooden strips and the plexiglass in a rectangle-like shape, with the plexiglass in the center.</p></div><div class="col col-50"><img src=/assets/projects/1/step5.jpeg></div></div>'
			},
			{
				content:
					'<div class=row><div class="col col-50"><p>Apply glue evenly along one edge of the plexiglass, following the order on the diagram.</p></div><div class="col col-50"><img src=/assets/projects/1/step6.png></div></div>',
				tool: <Tool>getToolById('gluegun')
			},
			{
				content:
					'<div class=row><div class="col col-50"><p>Remove the protective film from the acrylic plexiglass.</p></div><div class="col col-50"><img src=/assets/projects/1/step7.jpeg></div></div>'
			}
		]
	}
];

export function getProjectById(id: number) {
	return projects.find((p) => p.id == id);
}
