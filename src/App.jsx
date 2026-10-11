import { useState, useMemo } from 'react';

const filters = ['All', 'News', 'Images', 'Videos', 'Maps', 'Shopping'];

const trendingTopics = [
  'AI search engine 2024',
  'Machine learning trends',
  'Dark mode UI design',
  'Web development tips',
  'React best practices',
  'Frontend performance',
  'AI capabilities'
];

const querySeed = {
  ai: {
    title: 'How AI Search Works',
    answer: 'AI search engines combine natural language processing, semantic understanding, and ranking algorithms to deliver the most relevant results. Unlike traditional keyword matching, AI understands user intent and context.',
    bullets: [
      { label: 'NLP', value: 'Natural Language Processing for understanding' },
      { label: 'Ranking', value: 'Advanced algorithms for result ordering' },
      { label: 'Context', value: 'Understanding user intent and context' }
    ]
  },
  design: {
    title: 'Premium Dark Mode Design',
    answer: 'Dark interfaces reduce eye strain, use less power, and create a premium feel. The key is maintaining contrast for readability while using subtle gradients and layered depths.',
    bullets: [
      { label: 'Contrast', value: 'High readability with balanced surfaces' },
      { label: 'Depth', value: 'Layered shadows and visual hierarchy' },
      { label: 'Polish', value: 'Smooth transitions and animations' }
    ]
  },
  default: {
    title: 'What is Nexus Search?',
    answer: 'Nexus is a premium AI-powered search engine with a beautiful dark mode interface. It combines powerful search capabilities with an intuitive user experience.',
    bullets: [
      { label: 'AI', value: 'Artificial intelligence powered results' },
      { label: 'Dark', value: 'Premium dark mode theme' },
      { label: 'Fast', value: 'Lightning fast search performance' }
    ]
  }
};

const resultTemplates = [
  {
    title: 'Understanding AI-Powered Search Engines in 2024',
    url: 'nexus.ai/insights/ai-search',
    snippet: 'Explore how modern AI search engines use machine learning and NLP to understand user queries beyond keywords.',
    type: 'Featured'
  },
  {
    title: 'The Complete Guide to Dark Mode UI Design',
    url: 'designjournal.com/dark-mode-guide',
    snippet: 'Learn best practices for creating premium dark mode interfaces that are both beautiful and accessible.',
    type: 'Guide'
  },
  {
    title: 'React Performance Optimization Tips',
    url: 'devblog.com/react-performance',
    snippet: 'Master React optimization techniques to build faster, more efficient applications.',
    type: 'Tutorial'
  },
  {
    title: 'Semantic Search vs Keyword Search',
    url: 'searchtech.io/semantic-search',
    snippet: 'Understand the differences between semantic and traditional keyword-based search methods.',
    type: 'Article'
  },
  {
    title: 'Web Typography for Dark Interfaces',
    url: 'typographymagazine.com/dark-type',
    snippet: 'Best practices for selecting and sizing fonts in dark mode designs.',
    type: 'Resource'
  }
];

function generateAIAnswer(query) {
  const normalized = query.toLowerCase();
  if (normalized.includes('ai') || normalized.includes('search')) return querySeed.ai;
  if (normalized.includes('design') || normalized.includes('dark') || normalized.includes('ui')) return querySeed.design;
  return querySeed.default;
}

function buildResults(query) {
  if (!query.trim()) return resultTemplates;
  return resultTemplates.map((result, index) => ({
    ...result,
    snippet: index % 2 === 0 ? `Search results for "${query}" - ranked by relevance and quality.` : result.snippet
  }));
}

export default function App() {
  const [query, setQuery] = useState('AI search engine');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isAiMode, setIsAiMode] = useState(true);

  const aiOverview = useMemo(() => generateAIAnswer(query), [query]);
  const results = useMemo(() => buildResults(query), [query]);

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
    }
  };

  const handleSuggestion = (topic) => {
    setQuery(topic);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">N</div>
            <span className="logo-text">Nexus</span>
            <span className="logo-badge">AI</span>
          </div>
          <nav className="nav">
            <a href="#">Discover</a>
            <a href="#">News</a>
            <a href="#">Images</a>
            <a href="#">Maps</a>
          </nav>
          <div className="header-actions">
            <button className="btn-secondary">Settings</button>
            <button className="btn-primary">Sign In</button>
          </div>
        </div>
      </header>

      {/* Main Search Section */}
      <main className="main">
        <div className="search-section">
          <div className="search-container">
            <div className="search-input-wrapper">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search anything..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleSearch}
              />
              <button 
                className={`ai-toggle ${isAiMode ? 'active' : ''}`}
                onClick={() => setIsAiMode(!isAiMode)}
              >
                ✨ {isAiMode ? 'AI' : 'Classic'}
              </button>
              <button className="search-btn" onClick={handleSearch}>Search</button>
            </div>

            {/* Filters */}
            <div className="filters">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={`filter-btn ${filter === activeFilter ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Trending Topics */}
            <div className="trending">
              {trendingTopics.map((topic) => (
                <button
                  key={topic}
                  className="trend-btn"
                  onClick={() => handleSuggestion(topic)}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="results-section">
          <div className="results-main">
            {/* AI Overview */}
            <div className="ai-overview">
              <div className="overview-badge">AI Overview</div>
              <h2>{aiOverview.title}</h2>
              <p>{aiOverview.answer}</p>
              <div className="facts-grid">
                {aiOverview.bullets.map((item) => (
                  <div key={item.label} className="fact-card">
                    <div className="fact-label">{item.label}</div>
                    <div className="fact-value">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Search Results */}
            <div className="results-header">
              <h3>Top Results</h3>
              <span className="results-meta">Updated moments ago</span>
            </div>
            <div className="results-list">
              {results.map((result, index) => (
                <article key={index} className="result-card">
                  <div className="result-meta">
                    <span className="result-type">{result.type}</span>
                    <span className="result-url">{result.url}</span>
                  </div>
                  <h3 className="result-title">{result.title}</h3>
                  <p className="result-snippet">{result.snippet}</p>
                  <div className="result-stats">
                    <span>Relevance: {95 - index * 5}%</span>
                    <span>Trust: {98 - index * 3}%</span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="sidebar">
            <div className="sidebar-card">
              <div className="card-badge">Insights</div>
              <h4>Search Quality</h4>
              <div className="stats">
                <div className="stat-row">
                  <span>Intent Match</span>
                  <strong>94%</strong>
                </div>
                <div className="stat-row">
                  <span>Source Quality</span>
                  <strong>91%</strong>
                </div>
                <div className="stat-row">
                  <span>Freshness</span>
                  <strong>96%</strong>
                </div>
              </div>
            </div>

            <div className="sidebar-card">
              <div className="card-badge">People Also Ask</div>
              <ul className="faq-list">
                <li>What is semantic search?</li>
                <li>How does AI improve search?</li>
                <li>Why use dark mode?</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Nexus</h4>
            <a href="#">About</a>
            <a href="#">Blog</a>
            <a href="#">Privacy</a>
          </div>
          <div className="footer-section">
            <h4>Product</h4>
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <a href="#">Security</a>
          </div>
          <div className="footer-section">
            <h4>Developers</h4>
            <a href="#">API</a>
            <a href="#">Docs</a>
            <a href="#">Support</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Nexus AI Search. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
