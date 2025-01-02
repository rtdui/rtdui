import { IconSitemap } from "@tabler/icons-react";
import type { Mermaid, MermaidConfig } from "mermaid";
import type { Plugin, Locale } from "../../types";
import en from "../../locales/en.json";
import { appendBlock } from "../../utils/codemirror";

export interface MermaidPluginOptions extends MermaidConfig {
	locale?: Partial<Locale>;
}

const iconSize = 20;
const iconStroke = 1.5;

export default function mermaid(options: MermaidPluginOptions = {}): Plugin {
	const { locale: _locale = {}, ...mermaidConfig } = options;
	const locale = { ...en, ..._locale };
	let m: Mermaid;

	const actionItems = [
		{
			title: locale.flowchart,
			code: `graph TD
Start --> Stop`,
		},
		{
			title: locale.sequence,
			code: `sequenceDiagram
Alice->>John: Hello John, how are you?
John-->>Alice: Great!
Alice-)John: See you later!`,
		},
		{
			title: locale.class,
			code: `classDiagram
Animal <|-- Duck
Animal <|-- Fish
Animal <|-- Zebra
Animal : +int age
Animal : +String gender
Animal: +isMammal()
Animal: +mate()
class Duck{
  +String beakColor
  +swim()
  +quack()
}
class Fish{
  -int sizeInFeet
  -canEat()
}
class Zebra{
  +bool is_wild
  +run()
}`,
		},
		{
			title: locale.state,
			code: `stateDiagram-v2
[*] --> Still
Still --> [*]

Still --> Moving
Moving --> Still
Moving --> Crash
Crash --> [*]`,
		},
		{
			title: locale.er,
			code: `erDiagram
CUSTOMER ||--o{ ORDER : places
ORDER ||--|{ LINE-ITEM : contains
CUSTOMER }|..|{ DELIVERY-ADDRESS : uses`,
		},
		{
			title: locale.uj,
			code: `journey
title My working day
section Go to work
Make tea: 5: Me
Go upstairs: 3: Me
Do work: 1: Me, Cat
section Go home
Go downstairs: 5: Me
Sit down: 5: Me`,
		},
		{
			title: locale.gantt,
			code: `gantt
title A Gantt Diagram
dateFormat  YYYY-MM-DD
section Section
A task           :a1, 2014-01-01, 30d
Another task     :after a1  , 20d
section Another
Task in sec      :2014-01-12  , 12d
another task      : 24d`,
		},
		{
			title: locale.pie,
			code: `pie title Pets adopted by volunteers
"Dogs" : 386
"Cats" : 85
"Rats" : 15`,
		},
		{
			title: locale.mindmap,
			code: `mindmap
Root
    A
      B
      C`,
		},
		{
			title: locale.timeline,
			code: `timeline
title History of Social Media Platform
2002 : LinkedIn
2004 : Facebook
     : Google
2005 : Youtube
2006 : Twitter`,
		},
	];

	return {
		viewerEffect: ({ markdownBody }) => {
			async function renderMermaid() {
				if (!m) {
					m = await import("mermaid").then((d) => d.default);
					if (mermaidConfig) {
						m.initialize({
							...{
								startOnLoad: false,
								// theme: "base",
								themeVariables: {
									textColor: "#6b7280",
									lineColor: "#6b7280",
									noteTextColor: "#6b7280",
									tertiaryTextColor: "#6b7280",
									pieTitleTextColor: "#6b7280",
									pieLegendTextColor: "#6b7280",
								},
							},
							...mermaidConfig,
						});
					}
				}

				const nodes = markdownBody.querySelectorAll<HTMLElement>(
					'pre[class*="language-mermaid"]:not([data-processed="true"])',
				);
				nodes.forEach((d) => {
					d.innerHTML = d.innerText;
				});

				m.run({ nodes });
			}
			renderMermaid();
		},
		toolbar: [
			{
				type: "multiple",
				title: locale.mermaid,
				icon: <IconSitemap size={iconSize} stroke={iconStroke} />,
				actions: actionItems.map(({ title, code }) => ({
					title,
					click(e, { editor }) {
						appendBlock(editor, `\`\`\`mermaid\n${code}\n\`\`\``);
					},
				})),
			},
		],
	};
}
