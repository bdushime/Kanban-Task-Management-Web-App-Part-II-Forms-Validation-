import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  template: `
    <div style="padding: 32px; color: var(--text-primary);">
      <h2>Application Settings</h2>
      <p>This is the settings page for the Kanban board.</p>
    </div>
  `
})
export class SettingsComponent {}
