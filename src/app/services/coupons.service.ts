import { Injectable } from '@angular/core';
import { Coupon } from '../models/coupon';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  constructor() { }

  getCoupons() {
    return fetch('./assets/data/data.json').then(async (res) => {
      const coupons: Coupon[] = await res.json() as Coupon[];
      coupons.forEach(c => c.active = false);
      return Promise.resolve(coupons);
    }).catch(err => {
      console.log(err);
      return Promise.reject([]);
    })
  }
}
