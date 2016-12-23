import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import {AngularFire, FirebaseListObservable} from 'angularfire2';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lista: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, af: AngularFire) {
    this.lista = af.database.list('/faefalta');
  }

  add () {
    let prompt = this.alertCtrl.create({
      title: 'Fae falta',
      message: "",
      inputs: [
        {
          name: 'nombre',
          placeholder: 'cosa a comprar'
        },
        {
          name: 'cuantos',
          placeholder: 'cuantos faen falta',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Añadir',
          handler: data => {
            this.lista.push ({
              nombre: data.nombre,
              cuantos: data.cuantos
            })
            console.log(data.nombre + '-', data.cuantos);
          }
        }
      ]
    });
    prompt.present();
  }

  borrar(cosaId: string){
    this.lista.remove(cosaId);
  }

  ver (cosaId: string, cosaNombre: string) {
    console.log (cosaNombre);
  }
}
