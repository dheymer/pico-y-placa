/**
 * @name: "Pico y Placa" Algorithm
 * @description: Project made to test Ionic Framework
 * @version: 1.0
 * @author: Dheymer Leon
 *          Phone     : +593-98-7982998
 *          Email     : dheymer@gmail.com
 *          IG/TW     : @dheymer
 *          Facebook  : @dheymerleonweb
 *          Skype     : dheymer
 *          LinkedIn  : linkedin.com/in/dheymer
 *          DeviantArt: dheymer.deviantart.com
 *          Website   : dheymer.000webhostapp.com
 */
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { DateTime } from 'ionic-angular/components/datetime/datetime';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  picoYPlaca = [5,1,1,2,2,3,3,4,4,5]; // Array to define which day of the week "Pico y Placa" will be applied to each plate number
  strPlate: String = '';              // The plate number
  movingDate: DateTime;               // The date and time picker

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  /**
   * Method to check if "Pico y Placa" can be applied
   */
  checkPicoYPlaca(){
    var str = ''+this.movingDate;                         // String with the value of the date and time picker
    var alert;                                            // The alert showing the result of the check for "Pico y Placa"
    var strDate = str.substr(0, 10);                      // The date component of the DateTime string
    var strTime = str.substr(11, 8);                      // The time component of the DateTime string
    var auxDate = new Date(strDate+' '+strTime);          // The date picked as object to make the operations
    const morningStart = new Date(strDate+' 07:00:00').getTime(); // The morning starting time of "Pico y Placa"
    const morningEnd = new Date(strDate+' 09:30:00').getTime();   // The morning ending time of "Pico y Placa"
    const eveningStart = new Date(strDate+' 16:00:00').getTime(); // The evening starting time of "Pico y Placa"
    const eveningEnd = new Date(strDate+' 19:30:00').getTime();   // The evening ending time of "Pico y Placa"
    var weekDay = auxDate.getDay();                       // The day of the week in numeric format
    var actualTime = auxDate.getTime();                   // The time format for the selected date and time
    var auxPlate = parseInt(this.strPlate.substr(this.strPlate.length-1, 1)); // The last character of the plate number

    if(this.picoYPlaca[auxPlate] == weekDay){             // If the plate number is in it's corresponding day of the week for
      if(                                                 // "Pico y Placa"...
        (
          (actualTime >= morningStart) &&                 // ...check if the selected time is between the start and ending
          (actualTime <= morningEnd)                      // time for the morning or evening.
        ) || (
          (actualTime >= eveningStart) &&
          (actualTime <= eveningEnd)
        )
      ){                                                  // ... If it is, then show the alert indicating that the vehicle
        alert = this.alertCtrl.create({                   // can't road bacause it's the day and time for it's
          title: 'No puede circular',                     // "Pico y Placa" restriction...
          subTitle: 'El vehículo está en el día y horarios correspondientes de Pico y Placa',
          buttons:['OK']
        });
      }else{
        alert = this.alertCtrl.create({                   // ...otherwise, show the alert indicating that the vehicle can
          title: 'Si puede circular',                     // road because it's the day, but not the time for it's restriction.
          subTitle: 'El vehículo está en el día de Pico y Placa, pero no en el horario correspondiente',
          buttons:['OK']
        });
      }
    }else{                                                // If the plate number is not in it's corresponding day of the week
      alert = this.alertCtrl.create({                     // for "Pico y Placa", then show the alert indicating that the
        title: 'Si puede circular',                       // vehicle can road because it's out of the restriction that day.
        subTitle: 'El vehículo no está en el día correspondiente de Pico y Placa',
        buttons:['OK']
      });
    }
    console.log(                                          // Console dump of the data used (debugging purposes only)
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
    alert.present();                                      // Show the alert indicating the result.
  }
}
