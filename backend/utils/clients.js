import OpenAI from 'openai';
import vision from '@google-cloud/vision';

// OpenAI client configuration
const openAIClient = new OpenAI({
    apiKey: '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',
});
  
  // Google Vision API configuration
const visionClient = new vision.ImageAnnotatorClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

export {openAIClient, visionClient}

