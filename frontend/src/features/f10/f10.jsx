import React, { useState, useEffect } from 'react';
import './f10.css';

const MOCK_GAPS = [
  { dimension: "auditory", plainLanguageSentence: "Job demands frequent phone calls, candidate has profound hearing loss." },
  { dimension: "fineMotor", plainLanguageSentence: "Job demands extensive typing, candidate has limited fine motor control." }
];

export default function F10({ gaps = MOCK_GAPS }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function fetchRecommendations() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/recommendations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ gaps })
        });
        
        const text = await response.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch (parseError) {
          throw new Error(`Proxy/Server Connection Failed (Status: ${response.status}). Please make sure you have restarted 'node server.js' to run on port 3001.`);
        }
        
        if (!isMounted) return;

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch recommendations');
        }

        setRecommendations(data.suggestions || []);
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    if (gaps && gaps.length > 0) {
      fetchRecommendations();
    } else {
      setLoading(false);
    }

    return () => {
       isMounted = false;
    };
  }, [gaps]);

  if (loading) {
    return (
      <div className="f10-container">
        <h3 className="f10-heading">AI Actionable Accommodations</h3>
        <div className="f10-skeleton-grid">
          {[1, 2].map(i => (
            <div key={i} className="f10-skeleton-card">
              <div className="f10-skeleton f10-skeleton-title"></div>
              <div className="f10-skeleton f10-skeleton-text"></div>
              <div className="f10-skeleton f10-skeleton-tool"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="f10-container">
        <div className="f10-error-card">
          <div className="f10-error-icon">⚠️</div>
          <div className="f10-error-content">
            <h4>AI recommendations unavailable</h4>
            <p className="f10-error-msg">{error}</p>
            <p className="f10-error-note">Please ensure Ollama is running locally and the model is pulled.</p>
            <p className="f10-error-assurance">All other features continue to work normally.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!recommendations || !Array.isArray(recommendations) || recommendations.length === 0) {
    return (
      <div className="f10-container">
        <h3 className="f10-heading">AI Actionable Accommodations</h3>
        <p style={{ color: '#94a3b8', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
          No recommendations could be generated for these gaps, or awaiting input.
        </p>
      </div>
    );
  }

  return (
    <div className="f10-container">
      <h3 className="f10-heading">
        <span className="f10-heading-icon">✨</span>
        AI Recommendations
      </h3>
      <div className="f10-cards-grid">
        {recommendations.map((rec, index) => (
          <div key={index} className="f10-fixit-card" style={{ animationDelay: `${index * 0.15}s` }}>
            <div className="f10-card-header">
              <span className="f10-gap-badge">Target Gap</span>
              <p className="f10-gap-text">"{rec.gap}"</p>
            </div>
            
            <div className="f10-card-body">
              <p className="f10-suggestion">{rec.suggestion}</p>
              
              <a href={rec.link} target="_blank" rel="noopener noreferrer" className="f10-tool-link">
                <div className="f10-tool-info">
                  <span className="f10-tool-label">Recommended Tool</span>
                  <span className="f10-tool-name">{rec.tool}</span>
                </div>
                <div className="f10-tool-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}