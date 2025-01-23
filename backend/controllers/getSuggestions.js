import {visionClient} from "../utils/clients.js";
import { openAIClient } from "../index.js";
import fs from 'fs';

async function analyzePost(content, platform, audienceSize, hashtags, nature, imageInsights) {
    console.log(imageInsights)
    const prompt = `Analyze the following social media post and provide detailed insights in JSON format:
    {
      "tone": "positive/negative/neutral",
      "predicted_likes": number,
      "suggested_hashtags": ["list", "of", "hashtags"],
      "engagement_improvement": ["Provide a better, more engaging and specific alternative sentence or paragraph for the post content, based on: '${content}'. Avoid vague suggestions and focus on clear, impactful messaging."],
      "optimal_posting_time": "time in HH:MM AM/PM format",
      "engagement_score": number,
      "image_suggestions": ["Provide at least two specific and creative ideas for images that enhance engagement, better than '${imageInsights}'. Avoid general phrases such as 'Use bright colors' or 'Focus on relevant visuals'. Instead, describe concrete elements or concepts that can be implemented."]
    }
    Content: ${content}
    Platform: ${platform}
    Audience Size: ${audienceSize}
    Nature: ${nature}
    Hashtags: ${hashtags}
    imageInsights: ${imageInsights}
    Additional Context:
    - Predict the number of likes accurately by factoring in audience size, platform engagement trends, historical performance of similar posts, and the nature of the content.
    - For example, if the platform is Instagram and the audience size is 5000, consider typical engagement rates for that platform and adjust based on the tone and hashtags used.
    - Avoid overestimations and ensure the prediction aligns with realistic platform engagement benchmarks.
    - Avoid general phrases and ensure all outputs are specific and actionable.
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