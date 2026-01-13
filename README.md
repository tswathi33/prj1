
# College Companion - Digital Brain Starter

## Getting Started
1. **API Key**: Ensure `process.env.API_KEY` is set with your Google AI Studio key.
2. **Install**: `npm install`
3. **Run**: `npm start`

## Project Structure
- `services/geminiService.ts`: Central hub for all AI logic.
- `components/AIChatbot.tsx`: The primary Gemini 3 Pro multimodal assistant.
- `components/AILab.tsx`: Specialized tools for image generation and paper analysis.

## Extending AI Features
- **Prompt Engineering**: System instructions are in `geminiService.ts`. Update them to change the assistant's behavior.
- **Multimodal**: The `getSmartResponse` function handles base64 media. Add support for new mime-types as needed.
- **Thinking Mode**: Use `useThinking: true` in requests for logic-heavy tasks (Math, Code, Reasoning).

## Deployment
This app is designed for deployment on **Vercel** or **AWS Amplify**. 
Environment Variables needed:
- `API_KEY`: Google GenAI API Key.
