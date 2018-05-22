import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  suspendedUsers=0;
  numOfUsers=0;
  activeUsers = 0;

  usersUsage = [];

  constructor(
    public appService: AppService
  ) {
    this.getCustomerUsageReports();
    this.allUsersDriveUsage();
  }

  getCustomerUsageReports(){
    this.appService.callGetService('https://gsuite-data-195507.appspot.com/admin/getCustomerUsageReports').subscribe(res => {
      let params = res['value'].usageReports[0].parameters;
      console.log(params);
      this.suspendedUsers = params[0].intValue;
      this.numOfUsers = params[1].intValue;
      this.activeUsers = this.numOfUsers - this.suspendedUsers;
    })
  }

  allUsersDriveUsage(){
    this.appService.callGetService('https://gsuite-data-195507.appspot.com/admin/allUsersDriveUsage').subscribe(res => {
      let usageReports = res['value'].usageReports;
      console.log(usageReports);

      usageReports.forEach(e => {
        this.usersUsage.push({
          "firstName": e.parameters[1].stringValue,
          "lastName" : e.parameters[3].stringValue,
          "driveUsage" : e.parameters[0].intValue,
          "gmailUsage": e.parameters[2].intValue
        })
      });

      console.log(this.usersUsage);

    })
  }
}
