'use client';

import { useEffect, useMemo, useState } from 'react';
import { Bookmark, CalendarDays, Check, Clock3, ExternalLink, Menu, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Story = {
  id: number;
  category: string;
  source: string;
  date: string;
  readTime: string;
  title: string;
  summary: string;
  why: string;
  url: string;
};

const categories = ['All', 'Companies & products', 'Policy', 'Research', 'Education'];

const stories: Story[] = [
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

export default function Home() {
  const [active, setActive] = useState('All');
  const [saved, setSaved] = useState<number[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem('ai-brief-saved');
    if (stored) queueMicrotask(() => setSaved(JSON.parse(stored) as number[]));
  }, []);

  const visible = useMemo(
    () => stories.filter((story) => active === 'All' || story.category === active),
    [active],
  );

  function toggleSaved(id: number) {
    setSaved((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      window.localStorage.setItem('ai-brief-saved', JSON.stringify(next));
      return next;
    });
  }

  return (
    <main id="top">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="AI News Brief home">
          <span className="brand-mark"><Sparkles size={17} /></span>
          <span>AI NEWS BRIEF</span>
        </a>
        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Primary navigation">
          <a href="#today" onClick={() => setMenuOpen(false)}>Today</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About this edition</a>
        </nav>
        <div className="header-actions">
          <span className="edition-status"><span /> Local MVP</span>
          <Button className="menu-button" variant="ghost" size="icon" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
      </header>

      <section className="dashboard-head shell">
        <div>
          <p className="overline">DAILY EDITION · SUNDAY</p>
          <h1>The AI news<br />worth your attention.</h1>
        </div>
        <div className="edition-card">
          <div><CalendarDays /><span>August 30, 2026</span></div>
          <p>Six sourced updates across products, policy, research, and education.</p>
          <span className="reading-time"><Clock3 /> About 12 minutes</span>
        </div>
      </section>

      <section id="today" className="news-shell shell">
        <div className="filter-bar">
          <fieldset className="filters" aria-label="Filter stories by category">
            {categories.map((category) => (
              <button key={category} className={active === category ? 'active' : ''} onClick={() => setActive(category)}>{category}</button>
            ))}
          </fieldset>
          <span className="result-count">{visible.length} {visible.length === 1 ? 'story' : 'stories'}</span>
        </div>

        <div className="story-list">
          {visible.map((story, index) => (
            <article className="story" key={story.id}>
              <div className="story-index">{String(index + 1).padStart(2, '0')}</div>
              <div className="story-main">
                <div className="story-meta"><span className="category">{story.category}</span><span>{story.source}</span><span>{story.date}</span><span><Clock3 /> {story.readTime}</span></div>
                <h2><a href={story.url} target="_blank" rel="noreferrer">{story.title}<ExternalLink /></a></h2>
                <p className="summary">{story.summary}</p>
                <div className="why"><span>WHY IT MATTERS</span><p>{story.why}</p></div>
                <a className="source-link" href={story.url} target="_blank" rel="noreferrer">Read the original source <ExternalLink /></a>
              </div>
              <button className={saved.includes(story.id) ? 'save saved' : 'save'} onClick={() => toggleSaved(story.id)} aria-label={saved.includes(story.id) ? `Remove ${story.title} from saved stories` : `Save ${story.title}`}>
                {saved.includes(story.id) ? <Check /> : <Bookmark />}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="about shell">
        <p className="overline">ABOUT THIS EDITION</p>
        <div><h2>Small, sourced, and designed for scanning.</h2><p>This first local version is manually curated. Every update links to its original source, separates the facts from our interpretation, and avoids a noisy infinite feed. Automated daily collection can come after the reading experience is right.</p></div>
      </section>

      <footer className="shell"><a className="brand" href="#top"><span className="brand-mark"><Sparkles size={15} /></span><span>AI NEWS BRIEF</span></a><p>Current signals. Clear context.</p><span>Local edition · 2026</span></footer>
    </main>
  );
}
