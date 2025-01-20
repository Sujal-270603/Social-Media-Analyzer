
import vision from '@google-cloud/vision';

// OpenAI client configuration
  
  // Google Vision API configuration
const visionClient = new vision.ImageAnnotatorClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

export { visionClient}

