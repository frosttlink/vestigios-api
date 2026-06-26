# Vestígios API

API separada que inspeciona o canal do YouTube do **Vestígios RPG** e expõe os vídeos via endpoints REST com cache.

## Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express 5
- **Documentação:** Swagger (OpenAPI 3.0)
- **Cache:** JSON em disco + memória
- **Deploy:** Render (free tier) + cron-job.org

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/videos` | Lista todos os vídeos (cache) |
| GET | `/api/videos/latest` | Vídeo mais recente |
| GET | `/api/channel` | Dados do canal |
| GET | `/api/status` | Status do cache |
| POST | `/api/refresh` | Força atualização do YouTube |
| GET | `/api-docs` | Swagger UI |

## Setup

```bash
cp .env.example .env
# Edite .env e coloque sua YOUTUBE_API_KEY

npm install
npm run dev
```

## YouTube Data API

1. Crie um projeto em https://console.cloud.google.com
2. Ative a **YouTube Data API v3**
3. Gere uma **API Key** (sem restrição ou restrinja ao seu IP)
4. Coloque a key em `.env` como `YOUTUBE_API_KEY`

## Deploy (Render)

1. Crie um **Web Service** no Render
2. Conecte o repositório git
3. Build command: `npm run build`
4. Start command: `node dist/index.js`
5. Adicione `YOUTUBE_API_KEY` como environment variable
6. Crie um job em **cron-job.org** chamando `https://seu-app.onrender.com/api/refresh` a cada 30 minutos
