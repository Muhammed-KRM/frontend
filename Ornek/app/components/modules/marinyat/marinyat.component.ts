import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-marinyat',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './marinyat.component.html',
  styleUrls: ['./marinyat.component.scss', '../../../../styles.scss']
})
export class MarinyatComponent {
  // Slider içeriği için veriler
  slides = [
    {
      title: 'Lüks Yat Kiralama Hizmetleri',
      description: 'Türkiye\'nin en güzel kıyılarında unutulmaz bir deniz deneyimi için üstün kalitede deniz araçları ve profesyonel hizmet.',
      primaryBtn: { text: 'Hemen Rezervasyon Yap', icon: 'fas fa-anchor' },
      secondaryBtn: { text: 'İletişime Geç', icon: 'fas fa-phone-alt' },
      imageClass: 'slide-1'
    },
    {
      title: 'Premium Yat Satış Hizmetleri',
      description: 'Dünya standartlarında yat satış hizmetlerimizle hayalinizdeki yata sahip olmanın ayrıcalığını yaşayın.',
      primaryBtn: { text: 'Satılık Yatları Görüntüle', icon: 'fas fa-ship' },
      secondaryBtn: { text: 'Fiyat Teklifi Al', icon: 'fas fa-tag' },
      imageClass: 'slide-2'
    },
    {
      title: 'Mavi Tur & Özel Rotalar',
      description: 'Kişiselleştirilmiş rota planlaması ve profesyonel ekibimizle eşsiz mavi tur deneyimi yaşayın.',
      primaryBtn: { text: 'Tur Rotalarını İncele', icon: 'fas fa-route' },
      secondaryBtn: { text: 'Özel Tur Planla', icon: 'fas fa-map-marked-alt' },
      imageClass: 'slide-3'
    }
  ];

  // Mevcut yat verileri
  yachts: any[] = [
    {
      name: 'Azimut 50',
      size: '15.2m',
      capacity: '6 kişi',
      cabins: '3 kabin',
      crew: '2 kişi',
      year: '2020',
      features: ['Fly Bridge', 'Klima', 'Jeneratör', 'Wi-Fi', 'Su Sporları Ekipmanları'],
      price: '35000',
      image: null
    },
    {
      name: 'Princess 62',
      size: '19.0m',
      capacity: '8 kişi',
      cabins: '4 kabin',
      crew: '3 kişi',
      year: '2021',
      features: ['Fly Bridge', 'Klima', 'Jeneratör', 'Wi-Fi', 'Jakuzi', 'Şef'],
      price: '50000',
      image: null
    },
    {
      name: 'Sunseeker 75',
      size: '22.8m',
      capacity: '10 kişi',
      cabins: '5 kabin',
      crew: '4 kişi',
      year: '2019',
      features: ['Fly Bridge', 'Klima', 'Jeneratör', 'Wi-Fi', 'Jakuzi', 'Şef', 'Özel Kaptan'],
      price: '75000',
      image: null
    },
    {
      name: 'Ferretti 850',
      size: '26.0m',
      capacity: '12 kişi',
      cabins: '5 kabin',
      crew: '5 kişi',
      year: '2022',
      features: ['Fly Bridge', 'Klima', 'Jeneratör', 'Wi-Fi', 'Jakuzi', 'Şef', 'Özel Kaptan', 'Su Altı Aydınlatma'],
      price: '100000',
      image: null
    }
  ];

  // Seçili yatı tutmak için değişken
  selectedYacht: any = null;

  // Modal'ı göstermek ve seçili yatı ayarlamak için fonksiyon
  showYachtDetails(yacht: any): void {
    this.selectedYacht = yacht;
    // Bootstrap 4 için jQuery kullanarak modal gösterme (eğer Angular ile entegre edilmediyse)
    // Eğer Bootstrap'in JS'i düzgün yüklenmişse data-toggle/data-target yeterli olmalı.
    // Alternatif olarak: (<any>$('#yachtDetailModal')).modal('show');
  }
} 