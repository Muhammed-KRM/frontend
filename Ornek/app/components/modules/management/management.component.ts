import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss', '../../../../styles.scss']
})
export class ManagementComponent {
  boardMembers = [
    {
      name: 'Ali Yılmaz',
      position: 'Yönetim Kurulu Başkanı',
      bio: 'Denizcilik sektöründe 30 yıllık deneyim sahibidir. İşletme alanında yüksek lisans derecesine sahiptir ve çeşitli uluslararası denizcilik organizasyonlarında görev almıştır.',
    },
    {
      name: 'Zeynep Kaya',
      position: 'Yönetim Kurulu Başkan Yardımcısı',
      bio: 'Finans ve yatırım alanında uzmanlaşmış deneyimli bir profesyoneldir. Şirketimizin finansal stratejilerini yönetmektedir.',
    },
    {
      name: 'Osman Demir',
      position: 'Yönetim Kurulu Üyesi',
      bio: 'Emlak ve turizm sektöründe 20 yılı aşkın tecrübesiyle marina projelerinin geliştirilmesine katkıda bulunmaktadır.',
    },
    {
      name: 'Ayşe Şahin',
      position: 'Yönetim Kurulu Üyesi',
      bio: 'Pazarlama ve marka yönetimi konusunda uzman olan Ayşe Hanım, şirketimizin markalaşma stratejilerini yönetmektedir.',
    },
    {
      name: 'Mehmet Öztürk',
      position: 'Yönetim Kurulu Üyesi',
      bio: 'Hukuk danışmanımız olarak yasal süreçleri yöneten tecrübeli bir avukattır. Denizcilik hukuku alanında uzmanlaşmıştır.',
    },
  ];
} 