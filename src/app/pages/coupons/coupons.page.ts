import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { NavController, NavParams } from '@ionic/angular';
import { Coupon } from 'src/app/models/coupon';
import { CouponsService } from 'src/app/services/coupons.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.page.html',
  styleUrls: ['./coupons.page.scss'],
})
export class CouponsPage implements OnInit {
  couponsActive: boolean = false;
  /* showCamera: boolean = false; */
  coupons: Coupon[] = [];
  barcodes: Barcode[] = [];
  isSupported = false;

  constructor(
    private couponsService: CouponsService,
    private navParams: NavParams,
    private navCtrl: NavController,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.couponsService.getCoupons().then((c: Coupon[]) => {
      this.coupons = c;
      /* console.log(this.coupons); */
    });
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    })
  }

  changeActive(coupon: Coupon) {
    coupon.active = !coupon.active;
    this.couponsActive = this.coupons.some((c) => c.active);
  }

  goToCard() {
    this.navParams.data['coupons'] = this.coupons.filter(
      (c) => c.active == true
    );
    this.navCtrl.navigateForward('card-coupon');
  }

  async startCamera() {
    /* this.showCamera = true; */
    this.barcodes = [];
    const granted = await this.requestPermissions();
    if (!granted) {
      this.toastService.showToast('Permisos denegados');
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    /* this.barcodes.push(...barcodes); */
    this.coupons.push(JSON.parse(barcodes[0].rawValue));
  }

  async requestPermissions(): Promise<boolean> {
    const {camera} = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  closeCamera() {
    /* this.showCamera = false; */
  }
}
