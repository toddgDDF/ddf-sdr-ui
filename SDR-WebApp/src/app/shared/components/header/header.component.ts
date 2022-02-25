import { Component, OnInit } from '@angular/core';
import { MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { DialogService } from '../../services/communication.service';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private ds: DialogService, private authService: MsalService) {}
  refreshStatus = false;
  ngOnInit(): void {
    this.ds.dialogObservable.subscribe((dialogState) => {
      //add your logic here!! for now I'm just gonna console log the sate of the dialog
      console.log(dialogState);
      this.refreshStatus = dialogState !== 'Not Clicked';
    });
  }
  async logout() {
    //this.authService.logoutRedirect();
    let homeAccountId:any = localStorage.getItem('homeAccountId');
    const currentAccount:any = this.authService.instance.getAccountByHomeId(
      homeAccountId
    );
    await this.authService.instance.logout({ logoutHint: currentAccount?.idTokenClaims.login_hint});
  }

 
}
