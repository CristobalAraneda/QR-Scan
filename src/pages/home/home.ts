import { Component } from '@angular/core';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { ToastController, Platform } from 'ionic-angular';

import {HistorialProvider} from "../../providers/historial/historial"
 


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private barcodeScanner: BarcodeScanner,
    public toastCtrl: ToastController,
    private platform: Platform,
    private _historialService: HistorialProvider ) {

  }
  scan(){
    console.log("realizando scan...");

    if(!this.platform.is('cordova')){

      this._historialService.agregar_historial("https://www.google.com/");

      return;
    }

    this.barcodeScanner.scan().then( (barcodeData) => {
      
      console.log("result", barcodeData.text);
      console.log("format", barcodeData.format);
      console.log("cancelled", barcodeData.cancelled);


      if( !barcodeData.cancelled  && barcodeData.text != null){

        this._historialService.agregar_historial(barcodeData.text);

      }

     }, ( err) => {
         console.error('Error:', err);
         this.mostrar_error("Error: "+ err );
     });
  }

  mostrar_error( mesaje:string ) {
    let toast = this.toastCtrl.create({
      message: mesaje,
      duration: 1500
    });
    toast.present();
  }
  }


