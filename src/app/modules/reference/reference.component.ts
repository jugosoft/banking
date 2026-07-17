import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IReferenceConfig } from './reference.config';

@Component({
  selector: 'banking-reference',
  standalone: false,
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.scss'],
})
export class ReferenceComponent {
  public referenceItems: IReferenceConfig[] = [
    {
      title: 'Типы сбережений',
      route: '/reference/deposit-types',
      icon: 'account_balance_wallet',
      description: 'Управление типами сбережений'
    },
    {
      title: 'Группы сбережений',
      route: '/reference/deposit-groups',
      icon: 'folder',
      description: 'Управление группами сбережений'
    },
    {
      title: 'Банки',
      route: '/reference/banks',
      icon: 'bank',
      description: 'Управление банками'
    }
  ];

  constructor(private router: Router) {}

  public navigateTo(route: string): void {
    void this.router.navigate([route]);
  }
}
