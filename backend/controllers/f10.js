const fs = require('fs');
const path = require('path');

exports.getRecommendations = async (req, res) => {
  try {
    // 1. Validate incoming data
    const { gaps } = req.body;
    if (!gaps || !Array.isArray(gaps) || gaps.length === 0) {
       return res.status(400).json({ error: 'A valid gaps array is required' });
    }

    // 2. Assemble Prompt
    const gapsList = gaps.map(g => `- ${g.plainLanguageSentence || JSON.stringify(g)}`).join('\n');
    let prompt = `A candidate has these gaps vs. a job's requirements:
${gapsList}

For each gap, provide one specific workplace accommodation.
Respond ONLY as a valid JSON array, containing objects with these exact keys:
[
  { 
    "gap": "Description of the gap being addressed", 
    "suggestion": "Specific, actionable accommodation suggestion", 
    "tool": "Name of a real assistive tool or software to help", 
    "link": "https://link-to-tool-or-resource.com" 
  }
]
Do not include markdown formatting or conversational text. Return only the raw JSON string array.`;

    // 3. API Request using Local Ollama (using /api/generate)
    const response = await fetch(`http://127.0.0.1:11434/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.OLLAMA_MODEL || "llama3.2",
        system: "You are a precise workplace accessibility expert that only outputs JSON data.",
        prompt: prompt,
        stream: false
      })
    });

    if (!response.ok) {
       let errorMsg = response.statusText;
       try {
          const errData = await response.json();
          if (errData.error) errorMsg = errData.error;
       } catch (e) {}
       return res.status(500).json({ error: `Ollama error: ${errorMsg}` });
    }

    const data = await response.json();
    
    if (data.error) {
       console.error('Ollama API Error:', data.error);
       return res.status(500).json({ error: data.error || 'Ollama provider error' });
    }

    try {
       if (!data.response) {
           throw new Error('Ollama returned no content response');
       }
       let textResponse = data.response;
       console.log("--- RAW LLAma3.2 RESPONSE ---", textResponse);
       
       let suggestions = [];
       // Fallback JSON extraction regex incase the model talks around the JSON payload
       const arrayMatch = textResponse.match(/\[\s*\{[\s\S]*\}\s*\]/);
       if (arrayMatch) {
           suggestions = JSON.parse(arrayMatch[0]);
       } else {
           // Attempt full parse just in case it's an object or unformatted
           textResponse = textResponse.replace(/^```[a-z]*\s*/i, '').replace(/```$/s, '').trim();
           suggestions = JSON.parse(textResponse);
           
           if (!Array.isArray(suggestions)) {
               if (suggestions.suggestions) {
                   suggestions = suggestions.suggestions;
               } else {
                   suggestions = [suggestions];
               }
           }
       }
       
       return res.json({ suggestions });
    } catch (parseErr) {
       console.error("Failed to parse AI response:", parseErr);
       return res.status(500).json({ error: 'Failed to parse JSON response from the local AI model.' });
    }

  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ error: 'Connection to local Ollama refused. Is Ollama running on port 11434?' });
    }
    console.error('F10 Recommendation Internal Error:', error);
    res.status(500).json({ error: 'Failed to retrieve recommendations correctly.' });
  }
};
