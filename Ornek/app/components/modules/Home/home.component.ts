import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../../../styles.scss']
})
export class HomeComponent {
  features = [
    {
      title: 'Yat Kiralama',
      description: 'Özel donanımlı lüks yatlarımızla benzersiz bir deniz yolculuğuna çıkın.',
      icon: 'bi bi-water fs-1'
    },
    {
      title: 'Marina Hizmetleri',
      description: 'Modern altyapı ve güvenli bağlama yerleriyle yatınız için en iyi konaklama.',
      icon: 'bi bi-life-preserver fs-1'
    },
    {
      title: 'Teknik Servis',
      description: 'Uzman ekibimizle yatınızın bakım ve onarım ihtiyaçlarını karşılıyoruz.',
      icon: 'bi bi-tools fs-1'
    }
  ];
}
