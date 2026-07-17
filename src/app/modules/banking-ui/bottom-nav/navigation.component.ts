import { Component } from '@angular/core';
import { RouterModule, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface INavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  navItems: INavItem[] = [
    { label: 'Главная', route: '/home', icon: 'home' },
    { label: 'Вклады', route: '/deposit', icon: 'account_balance' },
    { label: 'Инвестиции', route: '/invest', icon: 'trending_up' },
    { label: 'Профиль', route: '/profile', icon: 'person' },
    { label: 'Настройки', route: '/reference', icon: 'settings' },
  ];
}
