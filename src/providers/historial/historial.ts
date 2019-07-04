import { Injectable } from '@angular/core';
import { ScanData } from '../../models/scan-data.model';
//plugins
import { InAppBrowser } from '@ionic-native/in-app-browser';



/*
  Generated class for the HistorialProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HistorialProvider {

  private _historial: ScanData[]=[];

  constructor( private iab: InAppBrowser ) {
    
  }

  agregar_historial( texto: string){

    let data = new ScanData(texto);

    this._historial.unshift( data );

    console.log(this._historial);

    this.abrir_scan(0);
    
  }

  abrir_scan( index: number){

    let ScanData = this._historial[index];
    console.log( ScanData );

    switch( ScanData.tipo ){

      case "http":
        this.iab.create( ScanData.info, "_system");
      break

      default:
        console.log("Tipo no soportado");
    }
  }

  cargar_historial(){

    return this._historial;
  }

}
