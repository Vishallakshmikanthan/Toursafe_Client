export interface SimulationScenario {
  user_id: string;
  location: string;
  initial_condition: string;
  emergency_type: string;
  local_authority: string;
}

export interface MobileAppUpdate {
  header_status: string;
  notification_text: string;
  action_button: string;
  geo_fencing_status: string;
  // Optional fields for incident reporting
  report_title?: string;
  report_description?: string;
  report_update_prompt?: string;
  report_update_content?: string;
}

export interface AuthorityDashboardUpdate {
  alert_type: string;
  map_view: string;
  risk_analysis?: string;
  blockchain_access?: string;
  blockchain_data_panel?: string;
  gen_ai_guidance?: string;
  documentation_status?: string;
  system_audit_log?: string;
  // Optional fields for incident reporting
  incident_details?: string;
  case_status?: string;
}

export interface SimulationPhase {
  name: string;
  event: string;
  mobile_app_update: MobileAppUpdate;
  authority_dashboard_update: AuthorityDashboardUpdate;
}