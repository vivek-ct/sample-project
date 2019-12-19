import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { UserService } from "../user.service";
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  constructor(private  router:  Router, public userservice : UserService, public formBuilder : FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i),Validators.required])],
      country_code: ['',  [Validators.required]],
      password: ['', Validators.compose([Validators.required])],
      mobile: ['', Validators.compose([Validators.required])],
     
       });
  }

  register(){
    let register = this.registerForm.value;
    this.userservice.userregister(this.registerForm.value).subscribe(data =>{
      this.router.navigate(['login']);
    })
  }

}
