import { useState, useEffect } from "react";
import "./f14.css";

export default function F14() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  // Check if browser supports speech synthesis
  useEffect(() => {
    if (!window.speechSynthesis) {
      setSpeechSupported(false);
    }
  }, []);

  // Function to get all readable text from the page
  const getPageText = () => {
    // Get main content area
    const mainContent = document.querySelector("main") || document.body;
    const text = mainContent.innerText || mainContent.textContent;
    return text.trim();
  };

  // Start reading
  const handleRead = () => {
    if (!speechSupported) {
      alert("Text-to-Speech not supported in this browser");
      return;
    }

    // If already speaking and paused, resume
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Get text to read
    const text = getPageText();

    if (!text) {
      alert("No text found on page");
      return;
    }

    // Create speech utterance
    const utterance = new SpeechSynthesisUtterance(text);

    // Configure speech
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Event handlers
    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = (event) => {
      console.error("Speech error:", event);
      setIsSpeaking(false);
      setIsPaused(false);
    };

    // Start speaking
    window.speechSynthesis.speak(utterance);
  };

  // Pause reading
  const handlePause = () => {
    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  // Stop reading
  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  if (!speechSupported) {
    return (
      <div className="f14-container">
        <div className="f14-error">
          <h2>Text-to-Speech Not Supported</h2>
          <p>Your browser doesn't support the Web Speech API.</p>
          <p>Try using Chrome, Edge, or Safari.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="f14-container">
      <div className="f14-header">
        <h1>🔊 Text-to-Speech Reader</h1>
        <p>Listen to page content read aloud - perfect for accessibility!</p>
      </div>

      <div className="f14-controls">
        {!isSpeaking && !isPaused && (
          <button onClick={handleRead} className="f14-btn f14-btn-primary">
            ▶️ Read Page
          </button>
        )}

        {isSpeaking && !isPaused && (
          <>
            <button onClick={handlePause} className="f14-btn f14-btn-warning">
              ⏸️ Pause
            </button>
            <button onClick={handleStop} className="f14-btn f14-btn-danger">
              ⏹️ Stop
            </button>
          </>
        )}

        {isPaused && (
          <>
            <button onClick={handleRead} className="f14-btn f14-btn-primary">
              ▶️ Resume
            </button>
            <button onClick={handleStop} className="f14-btn f14-btn-danger">
              ⏹️ Stop
            </button>
          </>
        )}
      </div>

      <div className="f14-info">
        <h3>How to Use:</h3>
        <ol>
          <li>Click "Read Page" to start</li>
          <li>Use "Pause" to temporarily stop</li>
          <li>Use "Stop" to end completely</li>
          <li>Navigate to any page and use this feature!</li>
        </ol>

        <h3>Accessibility Benefits:</h3>
        <ul>
          <li>✅ Helps visually impaired users</li>
          <li>✅ Assists users with reading difficulties</li>
          <li>✅ Reduces eye strain</li>
          <li>✅ Enables hands-free browsing</li>
        </ul>
      </div>

      <div className="f14-demo">
        <h3>Demo Text (Try reading this!):</h3>
        <p>
          SenseHire is revolutionizing accessible hiring. Instead of forcing
          candidates with disabilities to navigate a world built for the
          able-bodied, we use technology to match people to roles based on their
          actual abilities.
        </p>
        <p>
          Our AI-powered matching engine compares ability vectors against job
          demand vectors, producing compatibility scores and suggesting
          workplace accommodations automatically.
        </p>
      </div>
    </div>
  );
}
