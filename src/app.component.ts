import { Component, ChangeDetectionStrategy, signal, computed, effect, inject } from '@angular/core';

import { MobileAppComponent } from './components/mobile-app/mobile-app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SimulationService } from './services/simulation.service';
import { GeminiService } from './services/gemini.service';
import type { SimulationPhase, SimulationScenario } from './models/simulation.model';

type ScenarioType = 'mountain_rescue' | 'urban_incident' | 'harassment_report';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [MobileAppComponent, DashboardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private simulationService = inject(SimulationService);
  private geminiService = inject(GeminiService);

  currentScenario = signal<ScenarioType>('mountain_rescue');

  simulationScenario = computed<SimulationScenario>(() => {
    switch (this.currentScenario()) {
      case 'mountain_rescue':
        return this.simulationService.getMountainRescueScenarioData();
      case 'urban_incident':
        return this.simulationService.getUrbanIncidentScenarioData();
      case 'harassment_report':
        return this.simulationService.getHarassmentScenarioData();
    }
  });

  simulationPhases = computed<SimulationPhase[]>(() => {
    switch (this.currentScenario()) {
      case 'mountain_rescue':
        return this.simulationService.getMountainRescuePhases();
      case 'urban_incident':
        return this.simulationService.getUrbanIncidentPhases();
      case 'harassment_report':
        return this.simulationService.getHarassmentPhases();
    }
  });
  
  currentPhaseIndex = signal(0);
  
  currentPhase = computed(() => this.simulationPhases()[this.currentPhaseIndex()]);
  mobileAppData = computed(() => this.currentPhase().mobile_app_update);

  aiSummary = signal<string>('');
  isLoadingAiSummary = signal<boolean>(true);

  constructor() {
    effect(() => {
      this.isLoadingAiSummary.set(true);
      this.aiSummary.set('');
      const phase = this.currentPhase();
      const scenario = this.simulationScenario();
      
      this.geminiService.generatePhaseSummary(phase, scenario).then(summary => {
          this.aiSummary.set(summary);
          this.isLoadingAiSummary.set(false);
      });
      
    }, { allowSignalWrites: true });
  }

  setScenario(scenario: ScenarioType): void {
    if (this.currentScenario() !== scenario) {
      this.currentScenario.set(scenario);
      this.currentPhaseIndex.set(0); // Reset to first phase on scenario change
    }
  }

  goToPhase(index: number): void {
    if (index >= 0 && index < this.simulationPhases().length) {
      this.currentPhaseIndex.set(index);
    }
  }

  nextPhase(): void {
    this.currentPhaseIndex.update(i => (i + 1) % this.simulationPhases().length);
  }
}