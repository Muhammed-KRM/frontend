import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss', '../../../../styles.scss']
})
export class ProjectsComponent {
  projects = [
    {
      title: 'Bodrum Marina',
      location: 'Bodrum, Muğla',
      year: '2021',
      description: 'Premium deniz manzaralı rezidans kompleksi ve yat limanı projesi.',
      status: 'Tamamlandı',
      image: 'bodrum-marina.jpg'
    },
    {
      title: 'İstanbul Yalı',
      location: 'Yeniköy, İstanbul',
      year: '2022',
      description: 'Boğaz manzaralı modern yalı konseptli lüks konut projesi.',
      status: 'Devam Ediyor',
      image: 'istanbul-yali.jpg'
    },
    {
      title: 'Fethiye Resort',
      location: 'Fethiye, Muğla',
      year: '2020',
      description: 'Denize sıfır özel iskele ve plajı bulunan lüks tatil köyü projesi.',
      status: 'Tamamlandı',
      image: 'fethiye-resort.jpg'
    },
    {
      title: 'Marmaris Marina',
      location: 'Marmaris, Muğla',
      year: '2023',
      description: 'Yat limanı genişletme ve modernizasyon projesi.',
      status: 'Planlama',
      image: 'marmaris-marina.jpg'
    }
  ];
}
