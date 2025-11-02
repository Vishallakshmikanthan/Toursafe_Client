import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import type { MobileAppUpdate } from '../../models/simulation.model';

@Component({
  selector: 'app-mobile-app',
  templateUrl: './mobile-app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileAppComponent {
  data = input.required<MobileAppUpdate>();

  isIncidentReport = computed(() => {
    const status = this.data().header_status;
    return status.includes('REPORT') || status.includes('RECEIVED') || status.includes('DOCUMENTED') || status.includes('CASE');
  });

  getHeaderClass(): string {
    const status = this.data().header_status;
    if (status.includes('SOS ACTIVATED')) {
      return 'bg-red-700';
    }
    if (status.includes('SAFETY WARNING')) {
      return 'bg-yellow-600';
    }
    if (status.includes('RESCUE EN ROUTE')) {
      return 'bg-blue-600';
    }
    if (status.includes('UPDATE RECEIVED')) {
      return 'bg-blue-600';
    }
    if (status.includes('FILING') || status.includes('RECEIVED')) {
      return 'bg-orange-600';
    }
     if (status.includes('DOCUMENTED')) {
      return 'bg-green-600';
    }
    return 'bg-gray-700';
  }

  shouldPulse(): boolean {
    return this.data().header_status.includes('SOS');
  }
}