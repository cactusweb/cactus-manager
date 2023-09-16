import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ryodan-customization',
  template: `
    <div class="wrapper">
      <ryodan-header></ryodan-header>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .wrapper {
        display: grid;
        height: 100%;
        gap: 8px;
        grid-template-rows: auto 1fr;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RyodanCustomizationComponent {}
