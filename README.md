# Vestígios API

API separada que inspeciona o canal do YouTube do **Vestígios RPG** e expõe os vídeos via endpoints REST com cache.

## Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Fastify 5
- **Validação:** Zod (schemas + runtime)
- **Documentação:** Swagger (OpenAPI 3.0, gerado automaticamente das schemas Zod)
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

## Deploy (Render — free tier)

### 1. Conectar no Render

Este projeto já inclui um `render.yaml` (Render Blueprint). Ao conectar o repositório, o Render detecta automaticamente e configura o Web Service.

1. Crie conta em https://dashboard.render.com
2. **New +** → **Blueprint** (recomendado) ou **Web Service**
3. Conecte o repositório `frosttlink/vestigios-api`
4. Se for Blueprint, Render lerá o `render.yaml` auto configurar tudo
5. **Única variável manual:** `YOUTUBE_API_KEY` — o Render vai pedir pra você digitar (sync: false)
6. Clique em **Deploy Blueprint** e aguarde

URL gerada: `https://vestigios-api.onrender.com`

### 2. Ajustar frontend na Vercel

No painel da Vercel (`https://vercel.com`), vá em **Settings → Environment Variables** do projeto `vestigios-rpg` e adicione:

```
NEXT_PUBLIC_YOUTUBE_API_URL = https://vestigios-api.onrender.com
```

Depois faça um novo deploy (ou push no git que a Vercel detecta).

### 3. Manter acordado com cron-job.org

O free tier do Render hiberna após 15 min sem tráfego. Crie dois jobs em https://cron-job.org:

| Job | URL | Frequência |
|-----|-----|-----------|
| Keep Alive | `https://vestigios-api.onrender.com/api/status` | A cada 5 min |
| Refresh Cache | `https://vestigios-api.onrender.com/api/refresh` | A cada 30 min |

### 4. Verificar

- `https://vestigios-api.onrender.com/api/status` → JSON com status do cache
- `https://vestigios-api.onrender.com/api/videos` → lista de vídeos
- `https://vestigios-api.onrender.com/api-docs` → Swagger UI
