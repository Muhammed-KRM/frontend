import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/public/auth.service';
import { UserManagementService, User } from '../../../../core/services/api/user-management.service';
import { MainConfigService } from '../../../../core/services/public/main-config.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-update-user-modal',
  templateUrl: './create-update-user-modal.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./user-management.component.scss']
})
export class CreateUpdateUserModalComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  modalMode: 'create' | 'update' = 'update';
  errorMessage = '';
  Message = '';
  // users: User[] = []; // Bu componente tüm kullanıcı listesi gerekmeyebilir.
  userRoleOptions: { value: number; display: string }[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private userManagementService: UserManagementService,
    private cdr: ChangeDetectorRef,
    private mainConfigService: MainConfigService
  ) {}

  ngOnInit() {
    // this.getAllUser(); // Kullanıcı listesi burada çekilmeyebilir, ana bileşende zaten var.
    this.loadUserRoleOptions(); // Rol seçeneklerini yükle

    const userSubscription = this.userManagementService.selectedUser$.subscribe(user => {
      this.currentUser = user;
      // Hata ve mesajları temizle
      this.errorMessage = '';
      this.Message = '';
      this.cdr.detectChanges(); // Değişiklikleri algıla
    });

    const modeSubscription = this.userManagementService.modalMode$.subscribe(mode => {
      this.modalMode = mode;
      // Mod değiştiğinde hata/mesajları temizle
      this.errorMessage = '';
      this.Message = '';
      this.cdr.detectChanges(); // Değişiklikleri algıla
    });

    this.subscriptions.add(userSubscription);
    this.subscriptions.add(modeSubscription);
  }

  ngOnDestroy() {
    // Component yok edildiğinde subscription'ları iptal et
    this.subscriptions.unsubscribe();
  }

  loadUserRoleOptions() {
    // Rol seçeneklerini MainConfigService'den al (örnek implementasyon)
    const roles = this.mainConfigService.getMainConfig('UserRoleinAuthorization', true);
    if (Array.isArray(roles)) {
        this.userRoleOptions = roles.map((role: any) => ({
            value: role.value,
            display: role.key // Veya role.display, config yapınıza bağlı
        }));
    } else {
        console.error("UserRoleinAuthorization config is not an array or is missing.");
        this.userRoleOptions = []; // Hata durumunda boş dizi ata
    }
    console.log("Loaded user roles:", this.userRoleOptions);
  }

  // getAllUser() { ... } // Bu metod muhtemelen artık gerekli değil

  saveUser() {
    if (!this.currentUser) return;

    // Şifre alanı kontrolü (oluşturma modunda boş olmamalı)
    if (this.modalMode === 'create' && !this.currentUser.password) {
      this.errorMessage = 'Şifre alanı boş bırakılamaz.';
      return;
    }

    // API'ye gönderilecek veri hazırlanır
    const userData: Partial<User> = {
      ...this.currentUser,
      // id create modunda gönderilmez (backend atar)
      id: this.modalMode === 'update' ? this.currentUser.id : undefined,
      // password alanı passwordHash olarak maplenmeli (backend bunu bekliyorsa)
      // Bu kısım için bir hash fonksiyonu (örn. crypto-js) veya backend'de hashleme gerekebilir
      // Şimdilik doğrudan password gönderiliyor varsayalım, backend handle etmeli
      // passwordHash: this.hashPassword(this.currentUser.password), // Örnek hashleme
    };

    // Şifre alanı sadece create modunda gönderilmeli (güncellemede boşsa değiştirilmez)
    if (this.modalMode === 'create') {
        // userData.passwordHash = this.hashPassword(userData.password);
        // delete userData.password; // Orijinal password alanını sil
    } else {
        // Güncelleme modunda şifre alanı boşsa veya gönderilmek istenmiyorsa kaldırılabilir
        delete userData.password;
        delete userData.passwordHash; // Veya backend sadece passwordHash bekliyorsa
    }

    const operation = this.modalMode === 'create'
      ? this.userManagementService.createUser(userData)
      : this.userManagementService.updateUser(userData);

    this.subscriptions.add(
      operation.subscribe({
        next: (response: any) => {
          if (response.errored) {
            this.errorMessage = response.errorMessage || 'Bir hata oluştu.';
            this.Message = '';
          } else {
            this.errorMessage = '';
            this.Message = response.message || (this.modalMode === 'create' ? 'Kullanıcı başarıyla oluşturuldu.' : 'Kullanıcı başarıyla güncellendi.');
            // Başarılı işlem sonrası kullanıcı listesini yenilemek için event emit edilebilir veya servis üzerinden tetiklenebilir.
            this.userManagementService.getAllUser().subscribe(); // Örnek: Listeyi yenile
            // Modal'ı kapatmak için data-bs-dismiss kullanılabilir veya programatik olarak kapatılabilir.
            // this.currentUser = null; // Formu temizle (opsiyonel)
          }
          this.cdr.detectChanges();
        },
        error: (error: any) => {
          this.errorMessage = String(error?.error?.errorMessage) || 'Bir sunucu hatası oluştu.';
          this.Message = '';
          this.cdr.detectChanges();
        }
      })
    );
  }

  // openUpdateModal(user: any) { ... } // Bu metod artık user-management.component.ts içinde

  // Örnek bir hash fonksiyonu (gerçek uygulamada daha güvenli bir yöntem kullanın!)
  // import * as CryptoJS from 'crypto-js'; // Gerekirse import edin
  // hashPassword(password: string | undefined): string | undefined {
  //   if (!password) return undefined;
  //   return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  // }
}
