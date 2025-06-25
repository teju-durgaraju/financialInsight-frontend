import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface InsightItem {
  id: number;
  text: string;
  value?: string;
  iconClass?: string; // e.g., for Font Awesome or Bootstrap Icons
  imageUrl?: string;
  trend?: 'up' | 'down' | 'neutral'; // For styling trend indicators
}

@Component({
  selector: 'app-scrolling-insights-ticker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scrolling-insights-ticker.component.html',
  styleUrls: ['./scrolling-insights-ticker.component.scss']
})
export class ScrollingInsightsTickerComponent implements OnInit {
  insightItems: InsightItem[] = [];

  ngOnInit(): void {
    this.insightItems = [
      { id: 1, text: 'Market Index', value: '+0.5%', iconClass: 'bi bi-graph-up-arrow', trend: 'up' },
      { id: 2, text: 'Portfolio Value', value: '$123,456', iconClass: 'bi bi-briefcase-fill' },
      { id: 3, text: 'Bitcoin (BTC)', value: '$65,000', imageUrl: 'https://via.placeholder.com/24/FF9900/000000?Text=BTC', trend: 'down' },
      { id: 4, text: 'Ethereum (ETH)', value: '$3,500', imageUrl: 'https://via.placeholder.com/24/CCCCCC/000000?Text=ETH', trend: 'up' },
      { id: 5, text: 'Savings Rate', value: '15%', iconClass: 'bi bi-piggy-bank-fill' },
      { id: 6, text: 'Next Bill Due', value: 'July 15th', iconClass: 'bi bi-calendar-event-fill', trend: 'neutral' },
      { id: 7, text: 'NASDAQ', value: '-0.2%', iconClass: 'bi bi-graph-down-arrow', trend: 'down' },
      { id: 8, text: 'Gold (XAU)', value: '$2,300/oz', imageUrl: 'https://via.placeholder.com/24/FFD700/000000?Text=G', trend: 'neutral' }
    ];
  }
}
