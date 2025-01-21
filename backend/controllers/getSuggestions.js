import {visionClient} from "../utils/clients.js";
import { openAIClient } from "../index.js";
import fs from 'fs';

async function analyzePost(content, platform, audienceSize, hashtags, nature, imageInsights) {
    console.log(imageInsights)
    const prompt = `Analyze the following social media post and provide insights in JSON format:
      {
        "tone": "positive/negative/neutral",
        "predicted_likes": number,
        "suggested_hashtags": ["list", "of", "hashtags"],
        "engagement_improvement": ["list of suggestions for improvement"],
        "optimal_posting_time": "time in HH:MM AM/PM format",
        "engagement_score": number,
        "image_suggestions": ["List at least two suggestions on images for better engagement better than ${imageInsights}"]
      }
      Content: ${content}
      Platform: ${platform}
      Audience Size: ${audienceSize}
      Nature: ${nature}
      Hashtags: ${hashtags}
      imageInsights: ${imageInsights}
      STRICTLY RETURN ONLY JSON.`;
  
    try {
      const response = await openAIClient.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
        temperature: 0,
      });
  
      const rawAnalysis = response.choices[0].message.content;
  
      // Validate JSON format
      return JSON.parse(rawAnalysis);
    } catch (error) {
      console.error('Error analyzing post:', error.message);
      throw new Error('Failed to generate a valid JSON response from OpenAI.');
    }
}



const getSuggestions = async (req, res) => {
    const filesToDelete = [];
      try {
        const { content, platform, audienceSize, nature } = req.body;
    
        if (!content || !platform || !audienceSize || !nature) {
          return res.status(400).json({ error: 'Missing required fields: content, platform, audienceSize, or nature.' });
        }
    
        // Extract hashtags
        const hashtags = content.match(/#\w+/g) || [];
    
        // Analyze images
        let imageInsights = '';
        if (req.files && req.files.length > 0) {
    
          for (const file of req.files) {
            try {
              //console.log(file)
              const [result] = await visionClient.labelDetection(file.path);
              const labels = result.labelAnnotations.map((label) => label.description).join(', ');
              imageInsights += `${labels}\n`;
              filesToDelete.push(file.path);
            } catch (err) {
              console.error(`Error processing image ${file.originalname}:`, err.message);
            }
          }
        }
    
        // Generate analysis
        const analysis = await analyzePost(content, platform, audienceSize, hashtags, nature, imageInsights);
        //console.log(analysis);
        return res.status(200).json({
          success: true,
          ...analysis,
          message: 'Analysis completed successfully.',
        });
      } catch (error) {
        console.error('Error processing request:', error.message);
        return res.status(500).json({ error: error.message || 'Failed to analyze the post.' });
      } finally {
        // Clean up uploaded files
        filesToDelete.forEach((filePath) => {
          fs.unlink(filePath, (err) => {
            if (err) console.error(`Error deleting file ${filePath}:`, err.message);
          });
        });
      }
}

export {getSuggestions}