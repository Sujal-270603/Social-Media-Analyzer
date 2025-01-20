import OpenAI from 'openai';
import vision from '@google-cloud/vision';

// OpenAI client configuration
const openAIClient = new OpenAI({
    apiKey: 'process.env.OpenAI_API_Key',
});
  
  // Google Vision API configuration
const visionClient = new vision.ImageAnnotatorClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

export {openAIClient, visionClient}

