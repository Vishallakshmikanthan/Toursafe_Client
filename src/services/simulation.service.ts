import { Injectable } from '@angular/core';
import type { SimulationPhase, SimulationScenario } from '../models/simulation.model';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {
  getMountainRescueScenarioData(): SimulationScenario {
    return {
      "user_id": "TSX-IN-78A (Tourist: Priya Sharma)",
      "location": "N30.345, E79.567 (Roopkund Trek - Uttarakhand)",
      "initial_condition": "User has been tracking for 4 hours. No manual SOS initiated yet.",
      "emergency_type": "Trauma/Incapacitation (Simulated)",
      "local_authority": "SDRF Uttarakhand"
    };
  }

  getUrbanIncidentScenarioData(): SimulationScenario {
    return {
        "user_id": "TSX-IN-112B (Tourist: Rohan Verma)",
        "location": "28.632, 77.219 (Connaught Place, New Delhi)",
        "initial_condition": "User wishes to file a report for a stolen item.",
        "emergency_type": "Theft (Minor)",
        "local_authority": "Delhi Police"
    };
  }
  
  getHarassmentScenarioData(): SimulationScenario {
    return {
        "user_id": "TSX-IN-99C (Tourist: Anjali Rao)",
        "location": "18.922, 72.834 (Gateway of India, Mumbai)",
        "initial_condition": "User wishes to file a report for public harassment.",
        "emergency_type": "Harassment (Public Order)",
        "local_authority": "Mumbai Police"
    };
  }

  getMountainRescuePhases(): SimulationPhase[] {
    return [
      {
        "name": "Phase 1: AI Anomaly Detection & Geo-Fencing Alert",
        "event": "AI detects anomaly.",
        "mobile_app_update": {
          "header_status": "SAFETY WARNING - PROCEED WITH CAUTION",
          "notification_text": "AI detected a high-risk change (rapid vertical drop). Geo-Fencing: 150m from Restricted Zone boundary.",
          "action_button": "Is everything OK? (Tap to clear warning / Shake to alert SDRF)",
          "geo_fencing_status": "Active: Restricted Zone Z-4 approaching."
        },
        "authority_dashboard_update": {
          "alert_type": "PREDICTIVE ANOMALY (Risk Score: 75/100)",
          "map_view": "Tourist (ID 78A) shows 45m vertical drop followed by high-speed horizontal movement. Cluster Density: LOW.",
          "risk_analysis": "Flagged for potential accident or rapid evacuation need. Manual intervention recommended.",
          "blockchain_access": "Verification Check: PENDING"
        }
      },
      {
        "name": "Phase 2: SOS Trigger & Blockchain ID Verification",
        "event": "Tourist triggers SOS (via 'Shake-to-Alert').",
        "mobile_app_update": {
          "header_status": "SOS ACTIVATED - RESCUE INITIATED",
          "notification_text": "SDRF Uttarakhand notified. Real-time location feed secured. Blockchain ID transmission IN PROGRESS.",
          "action_button": "HOLD FOR VOICE COMMUNICATION",
          "geo_fencing_status": "Geo-Fencing breached. Alert sent to local authorities about violation."
        },
        "authority_dashboard_update": {
          "alert_type": "CRITICAL SOS (Risk Score: 100/100)",
          "map_view": "Tourist location locked. Nearest SDRF unit ETA 25 min (Air). Geo-Fencing Violation Confirmed.",
          "blockchain_data_panel": "STATUS: VERIFIED. Critical Medical Data: Allergies: Penicillin. Contact: John Doe (+44).",
          "gen_ai_guidance": "Gen AI suggests immediate dispatch of air assets. Language Barrier: HIGH. Activate multilingual comms."
        }
      },
      {
        "name": "Phase 3: Coordinated Rescue & e-FIR Generation",
        "event": "Rescue Team mobilizes and system generates post-event documentation.",
        "mobile_app_update": {
          "header_status": "RESCUE EN ROUTE - STAY PUT",
          "notification_text": "Rescue team visual confirmation: 5 minutes away. Multilingual support (Hindi/English) is active.",
          "action_button": "RESCUE ARRIVED (Tap to confirm safety)",
          "geo_fencing_status": "Rescue team is entering the Geo-Fenced zone."
        },
        "authority_dashboard_update": {
          "alert_type": "RESOLUTION PHASE",
          "map_view": "Rescue asset (SDRF Helicopter) position confirmed. Tourist is secured.",
          "blockchain_data_panel": "STATUS: VERIFIED. Critical Medical Data: Allergies: Penicillin. Contact: John Doe (+44).",
          "documentation_status": "Automated e-FIR (Case 2024-TSX-78A) generated: 90% complete. Requires officer sign-off for Geo-Violation.",
          "system_audit_log": "Blockchain Access Logged. AI Anomaly Report filed. Response time: 28 minutes."
        }
      }
    ];
  }

  getUrbanIncidentPhases(): SimulationPhase[] {
    return [
      {
        "name": "Phase 1: Incident Report Filed by Tourist",
        "event": "User initiates a non-emergency report via the mobile app.",
        "mobile_app_update": {
            "header_status": "FILING NEW INCIDENT REPORT",
            "notification_text": "Please provide details about the incident below. This will be sent to Delhi Police.",
            "report_title": "Report: Theft of Personal Item",
            "report_description": "My handbag was stolen near a shop in the Inner Circle. It contained my wallet and phone.",
            "action_button": "SUBMIT REPORT TO DELHI POLICE",
            "geo_fencing_status": "Location Tagged: Connaught Place"
        },
        "authority_dashboard_update": {
            "alert_type": "NEW INCIDENT REPORT (Priority: Low)",
            "map_view": "Report filed from user's last known location. No active tracking.",
            "incident_details": "User reports theft of a handbag containing a wallet and phone.",
            "blockchain_access": "Verification Check: PENDING"
        }
      },
      {
        "name": "Phase 2: Report Acknowledged & e-FIR Initiated",
        "event": "Authorities acknowledge the report and begin documentation.",
        "mobile_app_update": {
            "header_status": "REPORT RECEIVED BY AUTHORITIES",
            "notification_text": "Your report has been received and assigned Case #DP-2024-12C. Your Blockchain ID is being used to pre-fill the official e-FIR.",
            "action_button": "AWAITING FURTHER INSTRUCTIONS",
            "geo_fencing_status": "Location Tagged: Connaught Place"
        },
        "authority_dashboard_update": {
            "alert_type": "CASE ACTIVE (Priority: Medium)",
            "map_view": "Location of incident is logged. No active user tracking.",
            "case_status": "e-FIR generation in progress. Verifying user identity via Blockchain.",
            "blockchain_data_panel": "STATUS: VERIFIED. ID Details: Rohan Verma (Indian Citizen). Emergency Contact: Provided.",
            "gen_ai_guidance": "Gen AI suggests checking CCTV feeds from nearby shops and advising the user to block their cards."
        }
      },
      {
        "name": "Phase 3: Case Documented & Closed",
        "event": "The electronic First Information Report (e-FIR) is generated and logged.",
        "mobile_app_update": {
            "header_status": "CASE DOCUMENTED",
            "notification_text": "Your e-FIR (Case #DP-2024-12C) has been successfully filed. A copy has been sent to your registered email.",
            "action_button": "CLOSE REPORT",
            "geo_fencing_status": "Location Tagged: Connaught Place"
        },
        "authority_dashboard_update": {
            "alert_type": "CASE CLOSED",
            "map_view": "Incident location archived.",
            "documentation_status": "Automated e-FIR (Case #DP-2024-12C) generated and filed. Awaiting further action.",
            "blockchain_data_panel": "STATUS: VERIFIED. ID Details: Rohan Verma (Indian Citizen). Emergency Contact: Provided.",
            "system_audit_log": "Blockchain Access for e-FIR logged. Incident report archived. User notified."
        }
      }
    ];
  }

  getHarassmentPhases(): SimulationPhase[] {
    return [
      {
        "name": "Phase 1: Harassment Report Filed",
        "event": "User files an urgent but non-life-threatening harassment report.",
        "mobile_app_update": {
            "header_status": "FILING HARASSMENT REPORT",
            "notification_text": "Your safety is important. Please provide details of the incident. This will be logged with the Mumbai Police.",
            "report_title": "Report: Public Harassment",
            "report_description": "An individual was being aggressive and making unwanted comments near the ferry point.",
            "action_button": "SUBMIT URGENT REPORT",
            "geo_fencing_status": "Location Tagged: Gateway of India"
        },
        "authority_dashboard_update": {
            "alert_type": "NEW HARASSMENT REPORT (Priority: Medium)",
            "map_view": "Report geo-tagged to user's current location. Active tracking initiated for safety.",
            "incident_details": "User reports public harassment near the Gateway of India ferry point.",
            "blockchain_access": "Verification Check: PENDING"
        }
      },
      {
        "name": "Phase 2: Case Acknowledged & Update Requested",
        "event": "Mumbai Police acknowledges the report and requests any further details.",
        "mobile_app_update": {
            "header_status": "REPORT RECEIVED - CASE #MP-2024-88A",
            "notification_text": "Your report is received. Officers are monitoring the area. Can you provide any more details about the individual?",
            "report_update_prompt": "e.g., clothing, distinguishing features...",
            "action_button": "ADD UPDATE TO CASE",
            "geo_fencing_status": "Location Monitored: Gateway of India"
        },
        "authority_dashboard_update": {
            "alert_type": "CASE ACTIVE (Priority: High)",
            "map_view": "User's location is being actively monitored. Nearest patrol unit is 4 minutes away.",
            "case_status": "Awaiting further details from user to aid identification. Patrol unit on standby.",
            "blockchain_data_panel": "STATUS: VERIFIED. ID Details: Anjali Rao (Indian Citizen). Profile flagged for follow-up.",
            "gen_ai_guidance": "Gen AI recommends advising the user to move towards the police kiosk near the entrance and to not engage with the individual."
        }
      },
      {
        "name": "Phase 3: Update Received & Case Logged",
        "event": "User submits an update, which is appended to the e-FIR.",
        "mobile_app_update": {
            "header_status": "UPDATE RECEIVED",
            "notification_text": "Thank you. Your update has been added to Case #MP-2024-88A. Officers have been briefed. Please stay in a safe location.",
            "report_update_content": "Update: The person was wearing a blue shirt and jeans.",
            "action_button": "AWAITING INSTRUCTIONS",
            "geo_fencing_status": "Location Monitored: Gateway of India"
        },
        "authority_dashboard_update": {
            "alert_type": "CASE UPDATED",
            "map_view": "Patrol unit has the updated description. User is confirmed to be in a safe, public area.",
            "documentation_status": "e-FIR (Case #MP-2024-88A) updated with new details. Report forwarded to local patrol.",
            "blockchain_data_panel": "STATUS: VERIFIED. ID Details: Anjali Rao (Indian Citizen). Profile flagged for follow-up.",
            "system_audit_log": "User-submitted update logged via secure channel. Blockchain identity used for verification."
        }
      }
    ];
  }
}