import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asmaev',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asmaev.component.html',
  styleUrls: ['./asmaev.component.scss', '../../../../styles.scss']
})
export class AsmaevComponent {
  features = [
    {
      title: 'Özel İskele',
      description: 'Teknenizle doğrudan bağ evine ulaşabilir, kendi özel iskelenizden eve geçiş yapabilirsiniz.',
      icon: 'bi bi-water'
    },
    {
      title: 'Bahçe',
      description: 'Geniş ve bakımlı bahçede deniz manzarası eşliğinde dinlenebilir, özel etkinlikler düzenleyebilirsiniz.',
      icon: 'bi bi-tree'
    },
    {
      title: 'Konfor',
      description: '4 yatak odası, geniş salon ve tam donanımlı mutfak ile aileniz ve misafirleriniz için lüks konaklama.',
      icon: 'bi bi-house-heart'
    },
    {
      title: 'Havuz',
      description: 'Deniz manzaralı sonsuzluk havuzu ile dinlenme ve eğlence bir arada.',
      icon: 'bi bi-droplet'
    },
    {
      title: 'Güvenlik',
      description: '7/24 güvenlik hizmeti ve kapalı devre kamera sistemi ile huzurlu bir tatil.',
      icon: 'bi bi-shield-check'
    },
    {
      title: 'Concierge',
      description: 'Özel şef, temizlik ve transfer hizmetleri ile konaklamanızı kolaylaştırın.',
      icon: 'bi bi-person-check'
    }
  ];
} 