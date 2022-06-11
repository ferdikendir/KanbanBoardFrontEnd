import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { MessageService } from "primeng/api";
import { LoginService } from "../login.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    providers: [MessageService]
})

export class LoginComponent {
    loginForm: FormGroup;
    constructor(
      private fb: FormBuilder,
      private loginService: LoginService,
      private spinner: NgxSpinnerService,
      private messageService: MessageService
      ) {  
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required,, Validators.minLength(6)]],
      });
    }
  
    onSubmit(): void {
      if (this.loginForm.valid) {
        this.spinner.show();
        this.loginService.login(this.loginForm.value).subscribe(response =>{
          this.spinner.hide();
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Login Successful', life: 3000});
        }, error =>{
          this.spinner.hide();
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Login Failed'});
        });
      } else {
        let temp = this.loginForm.controls['name'];
        console.log('the controls', this.loginForm.controls);
        console.log('name form', temp);
        Object.keys(this.loginForm.controls).forEach(key => {
          this.loginForm.get(key)?.markAsTouched();
        });
      }
  
    }
    onReset(): void {
      this.loginForm.reset();
    }
}