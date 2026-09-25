---
name: multimodal-ai-engineering
description: "Engineering multimodal AI systems: Vision LLMs (document parsing, UI-to-code, diagram analysis), image generation pipelines (FLUX, Stable Diffusion), and real-time voice synthesis/transcription (OpenAI Realtime, ElevenLabs, Whisper)."
---

# Multimodal AI Engineering Playbook

Integrating vision, image generation, speech-to-text, and real-time audio streams into digital products.

---

## 1. Vision LLM Engineering (GPT-4o, Claude 3.5 Sonnet, Gemini 1.5)

- **UI-to-Code & Wireframe Analysis**: Pass screenshots to extract layout structure, Tailwind classes, and color palettes.
- **Document & Receipt OCR**: Extract complex tabular structures and nested data into validated JSON schemas.
- **Image Token Economics**:
  - Resize high-resolution images to optimal dimensions (e.g., max 1024x1024) to minimize token consumption and latency.

---

## 2. Real-Time Audio & Voice AI

- **OpenAI Realtime API (WebSockets / WebRTC)**:
  - Direct speech-to-speech with sub-500ms latency.
  - Native interruption handling (barge-in): User speaking halts model speech immediately.
  - Server-side tool execution during active voice conversations.
- **Asynchronous Voice Pipeline**:
  - Whisper API / Deepgram (Speech-to-Text) -> LLM streaming response -> ElevenLabs / Cartesia (Text-to-Speech).

---

## 3. Image Generation Pipelines

- **FLUX.1 & Stable Diffusion 3**: Local or cloud-hosted generation for product assets, marketing banners, and avatars.
- **ControlNet & Inpainting**: Precise structural control using depth maps, edge detection (Canny), and selective regional regeneration.
