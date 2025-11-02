import { Component, ChangeDetectionStrategy, input, computed, signal, effect } from '@angular/core';
import type { SimulationPhase, SimulationScenario } from '../../models/simulation.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  phase = input.required<SimulationPhase>();
  scenario = input.required<SimulationScenario>();
  verificationProgress = signal<'initial' | 'querying' | 'verifying' | 'unlocked' | 'complete'>('initial');

  constructor() {
    effect(() => {
      const currentPhaseName = this.phase().name;
      this.verificationProgress.set('initial');

      if (currentPhaseName.includes('Phase 2')) {
        setTimeout(() => {
          if (this.phase().name.includes('Phase 2')) this.verificationProgress.set('querying');
        }, 100);
        setTimeout(() => {
          if (this.phase().name.includes('Phase 2')) this.verificationProgress.set('verifying');
        }, 1000);
        setTimeout(() => {
          if (this.phase().name.includes('Phase 2')) this.verificationProgress.set('unlocked');
        }, 2000);
        setTimeout(() => {
          if (this.phase().name.includes('Phase 2')) this.verificationProgress.set('complete');
        }, 2800);
      }
    }, { allowSignalWrites: true });
  }

  isMountainRescueScenario = computed(() => this.scenario().emergency_type.includes('Trauma'));

  riskScore = computed<{ value: number; text: string } | null>(() => {
    const alertType = this.phase().authority_dashboard_update.alert_type;
    const match = alertType.match(/Risk Score: (\d+)\/100/);
    if (match && match[1]) {
      return {
        value: parseInt(match[1], 10),
        text: alertType.split('(')[0].trim(),
      };
    }
    // For phases with no score
    const textOnly = alertType.split('(')[0].trim();
    if(this.isMountainRescueScenario()){
        return { value: 0, text: textOnly };
    }
    return null;
  });

  gaugeAttributes = computed(() => {
    const score = this.riskScore()?.value ?? 0;
    const radius = 42;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    let color = 'rgb(59 130 246)'; // text-blue-500 for resolution phase
    if (score >= 75) color = 'rgb(248 113 113)'; // text-red-400
    else if (score >= 50) color = 'rgb(250 204 21)'; // text-yellow-400
    
    return { circumference, offset, color };
  });

  showRescueAsset = computed(() => {
    return this.phase().authority_dashboard_update.map_view.includes('Helicopter');
  });

  geoFenceState = computed(() => {
    if (!this.isMountainRescueScenario()) return null;

    const mobileStatus = this.phase().mobile_app_update.geo_fencing_status;
    const dashboardStatus = this.phase().authority_dashboard_update.map_view;

    if (mobileStatus.includes('breached') || dashboardStatus.includes('Violation Confirmed')) {
        return {
            status: 'breached',
            strokeClass: 'stroke-red-500 animate-pulse',
            textClass: 'text-red-500',
            label: 'BREACHED'
        };
    }
    if (mobileStatus.includes('approaching')) {
        return {
            status: 'approaching',
            strokeClass: 'stroke-yellow-400',
            textClass: 'text-yellow-400',
            label: 'WARNING ZONE'
        };
    }
    if (mobileStatus.includes('entering')) {
        return {
            status: 'monitoring',
            strokeClass: 'stroke-blue-400 opacity-75',
            textClass: 'text-blue-400',
            label: 'RESCUE ZONE'
        };
    }

    return null;
  });

  showTouristCluster = computed(() => {
    return this.phase().authority_dashboard_update.map_view.includes('Cluster Density');
  });
}