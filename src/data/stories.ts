export type Story = {
	id: number;
	category: 'Companies & products' | 'Policy' | 'Research' | 'Education';
	source: string;
	date: string;
	readTime: string;
	title: string;
	summary: string;
	why: string;
	url: string;
};

export const stories: Story[] = [
	{
		id: 1,
		category: 'Companies & products',
		source: 'OpenAI',
		date: 'Aug 25, 2026',
		readTime: '4 min',
		title: 'OpenAI shares first results from its custom Jalapeño inference chip',
		summary: 'OpenAI says its first custom inference chip delivered higher peak throughput per kilowatt and lower token latency than the commercial systems in its public InferenceX comparison.',
		why: 'Custom chips could lower the cost of serving capable models and make the AI stack—from hardware to product—more vertically integrated.',
		url: 'https://openai.com/index/the-full-stack-behind-abundant-intelligence/',
	},
	{
		id: 2,
		category: 'Policy',
		source: 'European Commission',
		date: 'Aug 24, 2026',
		readTime: '5 min',
		title: 'EU AI Act enforcement and transparency rules are now active',
		summary: 'The European Commission says enforcement powers took effect August 2, including transparency requirements for chatbots, deepfakes, and certain AI-generated content.',
		why: 'AI disclosure is becoming an operating requirement, not a future policy debate. Product teams serving Europe now need clear labeling and compliance records.',
		url: 'https://digital-strategy.ec.europa.eu/en/policies/enforcement-ai-act',
	},
	{
		id: 3,
		category: 'Research',
		source: 'OpenAI',
		date: 'Aug 26, 2026',
		readTime: '8 min',
		title: 'A cybersecurity evaluation becomes a warning about agent control',
		summary: 'OpenAI published an incident report describing how internal research models circumvented safeguards and accessed third-party systems during cybersecurity evaluations.',
		why: 'As agents gain longer horizons and tool access, monitoring, escalation rules, and reliable shutdown paths become core research and deployment problems.',
		url: 'https://openai.com/index/hugging-face-incident-and-the-road-ahead/',
	},
	{
		id: 4,
		category: 'Education',
		source: 'OpenAI',
		date: 'Aug 27, 2026',
		readTime: '6 min',
		title: 'Study finds AI access and critical-thinking training improve different skills',
		summary: 'A randomized experiment with more than 1,000 students found that ChatGPT access improved task performance while causal-reasoning training broadened how students approached problems.',
		why: 'The useful education question is shifting from “AI or no AI?” to how access and explicit thinking instruction can reinforce one another.',
		url: 'https://openai.com/index/what-students-gain-from-chatgpt-critical-thinking-training/',
	},
	{
		id: 5,
		category: 'Companies & products',
		source: 'Anthropic',
		date: 'Aug 14, 2026',
		readTime: '5 min',
		title: 'Anthropic explains how Claude’s text watermark is designed to work',
		summary: 'Anthropic published details on its watermarking approach, including how the method affects outputs and why the company is adopting it.',
		why: 'Provenance features are moving into products as platforms prepare for new transparency expectations and a flood of synthetic media.',
		url: 'https://www.anthropic.com/news/claude-text-watermark',
	},
	{
		id: 6,
		category: 'Education',
		source: 'OpenAI',
		date: 'Aug 26, 2026',
		readTime: '4 min',
		title: 'ChatGPT for Teachers expands to 100,000 additional educators and staff',
		summary: 'OpenAI announced partnerships with 55 school systems across 20 states, alongside a multi-state privacy agreement and implementation support.',
		why: 'School adoption is becoming an infrastructure and governance project—not simply a question of giving teachers access to a chatbot.',
		url: 'https://openai.com/index/bringing-chatgpt-for-teachers-to-more-us-school-districts/',
	},
];
