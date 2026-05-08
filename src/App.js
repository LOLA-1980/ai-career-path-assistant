import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [goal, setGoal] = useState("");
  const [response, setResponse] = useState("");

  const genAI = new GoogleGenerativeAI(
    process.env.REACT_APP_GEMINI_API_KEY
  );

  const generateRoadmap = async () => {
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
      });

      const prompt = `
      Create a technology career roadmap for this goal:
      ${goal}

      Include:
      - skills to learn
      - certifications
      - projects
      - cloud technologies
      - AI tools
      `;

      const result = await model.generateContent(prompt);
      const text = result.response.text();

      setResponse(text);

    } catch (error) {
      console.error(error);
      setResponse("API quota exceeded or temporary error.");
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>AI Career Path Assistant</h1>

      <input
        type="text"
        placeholder="Enter your career goal..."
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        style={{ width: "400px", padding: "10px" }}
      />

      <br /><br />

      <button onClick={generateRoadmap}>
        Generate Roadmap
      </button>

      <div style={{
        marginTop: "30px",
        whiteSpace: "pre-wrap"
      }}>
        {response}
      </div>
    </div>
  );
}

export default App;