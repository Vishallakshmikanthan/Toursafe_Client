import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';
import type { SimulationPhase, SimulationScenario } from '../models/simulation.model';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private genAI: GoogleGenAI | null = null;

  constructor() {
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
        this.genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
    } else {
        console.warn("API_KEY not found. GeminiService will be disabled.");
    }
  }

  async generatePhaseSummary(
    phase: SimulationPhase,
    scenario: SimulationScenario
  ): Promise<string> {
    if (!this.genAI) {
      return Promise.resolve(
        'Gemini AI analysis is disabled. API key not configured. This is a mock summary: The current phase indicates a critical situation requiring immediate attention. The recommended action is to proceed with the standard operating procedure for this alert level.'
      );
    }
    
    const isUrbanIncident = scenario.emergency_type.includes('Theft') || scenario.emergency_type.includes('Incident');

    const prompt = `
      You are an AI assistant for a public safety authority.
      Given the following scenario and the current phase details, provide a concise, professional summary and an immediate recommended action for the coordinator.
      The scenario is a "${isUrbanIncident ? 'tourist incident report' : 'mountain rescue emergency'}". Tailor your language accordingly.
      Format the output as a single paragraph.

      **Scenario Details:**
      - User: ${scenario.user_id}
      - Location: ${scenario.location}
      - Emergency Type: ${scenario.emergency_type}
      - Authority: ${scenario.local_authority}

      **Current Phase: ${phase.name}**
      - Event: ${phase.event}
      - Mobile App Status: ${phase.mobile_app_update.header_status} - ${phase.mobile_app_update.notification_text}
      - Dashboard Alert: ${phase.authority_dashboard_update.alert_type}
      - Dashboard Details: ${phase.authority_dashboard_update.map_view}

      **Your Summary and Recommendation:**
    `;

    try {
      const response = await this.genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      return response.text;
    } catch (error) {
      console.error('Error generating summary with Gemini:', error);
      return 'Could not generate AI summary due to an API error.';
    }
  }
}