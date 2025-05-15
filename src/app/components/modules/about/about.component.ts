import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  team = [
    {
      name: 'Ahmet Yılmaz',
      position: 'Kurucu ve CEO',
      image: 'assets/images/team/team-1.jpg',
      bio: 'Zeytin yetiştiriciliği konusunda 20 yıllık deneyime sahip olan Ahmet Bey, şirketimizin kurucusudur. Kaliteli zeytinyağı üretimi konusunda uzmandır.'
    },
    {
      name: 'Ayşe Kaya',
      position: 'Üretim Müdürü',
      image: 'assets/images/team/team-2.jpg',
      bio: 'Gıda mühendisi olan Ayşe Hanım, üretim süreçlerinin hijyen ve kalite standartlarına uygun şekilde yürütülmesinden sorumludur.'
    },
    {
      name: 'Mehmet Demir',
      position: 'Tarım Uzmanı',
      image: 'assets/images/team/team-3.jpg',
      bio: 'Ziraat mühendisi olan Mehmet Bey, zeytin bahçelerimizin bakımı ve organik tarım prensiplerine uygun yetiştirilmesini sağlar.'
    },
    {
      name: 'Zeynep Aydın',
      position: 'Pazarlama Müdürü',
      image: 'assets/images/team/team-4.jpg',
      bio: 'Pazarlama uzmanı olan Zeynep Hanım, markamızın tanıtımı ve müşteri ilişkilerinin yönetiminden sorumludur.'
    }
  ];
  
  milestones = [
    {
      year: '1998',
      title: 'İlk Adım',
      description: 'Ayvalık\'ta ilk zeytin bahçelerimizi satın alarak yolculuğumuza başladık.'
    },
    {
      year: '2003',
      title: 'İlk Üretim Tesisi',
      description: 'Modern teknoloji ile donatılmış ilk zeytinyağı üretim tesisimizi kurduk.'
    },
    {
      year: '2010',
      title: 'Organik Sertifikası',
      description: 'Tüm üretimimizi organik standartlara uygun hale getirerek sertifikamızı aldık.'
    },
    {
      year: '2015',
      title: 'İhracata Başlangıç',
      description: 'Ürünlerimizi Avrupa ve Amerika pazarına ihraç etmeye başladık.'
    },
    {
      year: '2020',
      title: 'Dijital Dönüşüm',
      description: 'E-ticaret platformumuz ile doğrudan tüketiciye ulaşmaya başladık.'
    }
  ];
  
  values = [
    {
      icon: 'fas fa-leaf',
      title: 'Doğallık',
      description: 'Ürünlerimizde hiçbir katkı maddesi veya koruyucu kullanmıyor, doğanın bize sunduğu doğal lezzeti sizlere ulaştırıyoruz.'
    },
    {
      icon: 'fas fa-heart',
      title: 'Kalite',
      description: 'Her zeytini özenle seçiyor, en iyi zeytinyağını üretmek için geleneksel yöntemlerle modern teknolojiyi bir araya getiriyoruz.'
    },
    {
      icon: 'fas fa-globe',
      title: 'Sürdürülebilirlik',
      description: 'Çevreye saygılı üretim yapıyor, gelecek nesillere sağlıklı bir dünya bırakmak için çalışıyoruz.'
    },
    {
      icon: 'fas fa-users',
      title: 'Toplumsal Sorumluluk',
      description: 'Yerel üreticileri destekliyor, bölge ekonomisine katkı sağlamayı önemsiyoruz.'
    }
  ];
}
