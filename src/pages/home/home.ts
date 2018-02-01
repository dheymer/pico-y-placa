import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DateTime } from 'ionic-angular/components/datetime/datetime';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  picoYPlaca = [5,1,1,2,2,3,3,4,4,5];
  strPlate: String = '';
  movingDate: DateTime;

  constructor(public navCtrl: NavController) {

  }

  checkPicoYPlaca(plate: String, movDate: DateTime){
    var auxDate = new Date(this.movingDate.doneText);
    //var firstHour = auxDate; firstHour.s
    var weekDay = auxDate.getDay();
    var actualTime = auxDate.getTime();
    var auxplate = parseInt(plate.substr(plate.length-1, 1));
    if(this.picoYPlaca[auxplate] == weekDay){
      if(((actualTime >= new Date().getTime()))){

      }
    }
  }

}
