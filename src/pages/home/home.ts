import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
//import { DateTimeData } from 'ionic-angular/util/datetime-util';
import { DateTime } from 'ionic-angular/components/datetime/datetime';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  picoYPlaca = [5,1,1,2,2,3,3,4,4,5];
  strPlate: String = '';
  movingDate: DateTime;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  checkPicoYPlaca(){
    var str = 'Chequeando Pico y Placa para el día '+this.movingDate;
    console.log(str);
    var alert;
    var strDate = str.substr(36, 10);
    var strTime = str.substr(47, 8)
    var auxDate = new Date(strDate+' '+strTime);
    var morningStart = new Date(strDate+' 07:00:00').getTime();
    var morningEnd = new Date(strDate+' 09:30:00').getTime();
    var eveningStart = new Date(strDate+' 16:00:00').getTime();
    var eveningEnd = new Date(strDate+' 19:30:00').getTime();
    var weekDay = auxDate.getDay();
    var actualTime = auxDate.getTime();
    var auxPlate = parseInt(this.strPlate.substr(this.strPlate.length-1, 1));
    if(this.picoYPlaca[auxPlate] == weekDay){
      if(
        (
          (actualTime >= morningStart) &&
          (actualTime <= morningEnd)
        ) || (
          (actualTime >= eveningStart) &&
          (actualTime <= eveningEnd)
        )
      ){
        alert = this.alertCtrl.create({
          title: 'No puede circular',
          subTitle: 'El vehículo está en el día y horarios correspondientes de Pico y Placa',
          buttons:['OK']
        });
      }else{
        alert = this.alertCtrl.create({
          title: 'Si puede circular',
          subTitle: 'El vehículo está en el día de Pico y Placa, pero no en el horario correspondiente',
          buttons:['OK']
        });
      }
    }else{
      alert = this.alertCtrl.create({
        title: 'Si puede circular',
        subTitle: 'El vehículo no está en el día correspondiente de Pico y Placa',
        buttons:['OK']
      });
    }
    console.log(
      'auxDate: '+ auxDate+
      '\nweekDay: '+weekDay+
      '\nactualTime:'+actualTime+
      '\nmorningStart:'+morningStart+
      '\nmorningEnd:'+morningEnd+
      '\neveningStart:'+eveningStart+
      '\neveningEnd:'+eveningEnd+
      '\nauxPlate:'+auxPlate+
      '\npicoYPlaca: '+this.picoYPlaca+
      '\npicoYPlaca[auxPlate]:'+this.picoYPlaca[auxPlate]
    );
    alert.present();
  }
}
