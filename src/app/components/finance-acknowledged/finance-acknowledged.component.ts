import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FinanceComponent } from '../finance/finance.component';

@Component({
  selector: 'app-finance-acknowledged',
  standalone: true,
  imports: [CommonModule, FinanceComponent],
  template: `
    <div class="layout">
      <app-finance></app-finance>
      <main>
        <header>
          <p>Finance</p>
          <h1>Acknowledged</h1>
          <span>Requests reviewed and acknowledged by finance.</span>
        </header>

        <section class="card">
          <div class="row head">
            <b>Request</b><b>Employee</b><b>Amount</b><b>Status</b>
          </div>
          <div class="row" *ngFor="let item of requests">
            <span>{{ item.id }}</span>
            <span>{{ item.employee }}</span>
            <span>{{ item.amount }}</span>
            <span class="pill">Acknowledged</span>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .layout{min-height:100vh;background:#f9f9f9;font-family:Manrope,Arial,sans-serif;color:#171717}
    main{margin-left:260px;padding:72px 64px}
    header{margin-bottom:36px}header p{margin:0 0 8px;color:#737373;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
    h1{margin:0 0 12px;font:400 42px 'Noto Serif',Georgia,serif;color:#000}header span{color:#525252;font-size:15px}
    .card{background:#fff;border:1px solid #e5e5e5;padding:28px;box-shadow:0 12px 32px rgba(0,0,0,.04)}
    .row{display:grid;grid-template-columns:1fr 1.4fr 1fr 1fr;gap:16px;align-items:center;padding:16px 0;border-bottom:1px solid #e5e5e5;font-size:14px;color:#404040}
    .row:last-child{border-bottom:0}.head{color:#737373;font-size:12px;text-transform:uppercase;letter-spacing:.08em}
    .pill{width:max-content;background:#000;color:#fff;padding:5px 10px;font-size:12px;font-weight:700;text-transform:uppercase}
  `]
})
export class FinanceAcknowledgedComponent {
  requests = [
    { id: 'REQ-1042', employee: 'Anika Rao', amount: '$1,420.00' },
    { id: 'REQ-1038', employee: 'Dev Patel', amount: '$860.50' },
    { id: 'REQ-1027', employee: 'Sara Khan', amount: '$2,140.75' }
  ];
}
