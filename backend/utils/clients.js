
import vision from '@google-cloud/vision';

// OpenAI client configuration
  
  // Google Vision API configuration
const visionClient = new vision.ImageAnnotatorClient({
    keyFilename: './acquired-subset-448012-u1-1c0418faf63f.json',
});

export { visionClient}

