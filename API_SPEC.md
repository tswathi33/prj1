
# API Specification (v1)

## Base URL: `https://api.collegecompanion.edu/v1`
**Auth**: Bearer JWT in `Authorization` header.

### Authentication
- `POST /auth/login`: `{email, password}` -> `{token, user}`
- `POST /auth/register`: `{name, email, role, password}` -> `{user}`

### Academics
- `GET /timetable`: Returns user-specific schedule.
- `GET /attendance`: Returns subject-wise statistics.
- `POST /attendance/mark`: Faculty endpoint to upload attendance.

### AI Endpoints (Proxy to Gemini)
- `POST /ai/chat`: `{message, history, useThinking: bool}`
- `POST /ai/analyze`: Multi-part upload (image/pdf/audio) for summarization.
- `POST /ai/generate-image`: `{prompt, size: "1K"|"2K"|"4K"}`

### Campus
- `GET /notices`: List filtered by category.
- `GET /map/locations`: GeoJSON of campus buildings.
