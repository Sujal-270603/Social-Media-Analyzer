import express from 'express';
import { upload } from './utils/handleMulter.js';
import { getSuggestions } from './controllers/getSuggestions.js';
import dotenv from 'dotenv';
import cors from 'cors';
import OpenAI from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 9000;

dotenv.config({ path: './.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});
app.post('/analyze', upload.array('images', 10), getSuggestions);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const openAIClient = new OpenAI({
    apiKey: process.env.OpenAI_API_Key,
});

export {openAIClient}
