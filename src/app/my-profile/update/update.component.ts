import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { LoginService } from 'src/app/login-screen/login.service';
import { MyProfileService } from '../my-profile.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  providers: [MessageService]
})
export class UpdateComponent implements OnInit {

  user: FormGroup;

  constructor(
    private myProfileService: MyProfileService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.createForm();
    delete this.loginService.currentUserValue.password;
    this.user.patchValue(this.loginService.currentUserValue);
  }

  updateProfile(profile: any) {
    console.log(profile);
    if(profile.password === profile.confirmPassword){
      delete profile.confirmPassword;
      this.sendToService(profile);
    }else{
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Password does not match', life: 3000});
    }
  }

  sendToService(profile){
    this.spinner.show();
    this.myProfileService.updateProfile(profile).pipe(finalize(() =>{
      this.spinner.hide();
    })).subscribe(response =>{
      this.loginService.saveUser(response);
      this.user.patchValue(this.loginService.currentUserValue);
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Update Successful', life: 3000});
    })
  }

  createForm(){
    this.user = this.formBuilder.group({
      id: [0],
      name: [''],
      surname: [''],
      email: [''],
      password: [''],
      confirmPassword: ['']
    });
  }

}
