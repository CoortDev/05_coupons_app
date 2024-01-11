import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) {}

  async showToast(message: string, duration: number = 5000) {
    const toast = await this.toastController.create({
      message,
      duration,
      position: 'bottom',
    });

    await toast.present();
  }
}
