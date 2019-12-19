import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { UserService } from "../user.service";
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor(private router: Router, public userservice: UserService, public formbuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.loginForm = this.formbuilder.group({
      email: ['', Validators.compose([Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i),Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  login(){
    let loginform = this.loginForm.value;
    this.userservice.login(loginform).subscribe(data =>{
      console.log(data); 
      localStorage.setItem("token", data['refreshToken']);
      localStorage.setItem("user_id", data['userid']);
      localStorage.setItem("email", data['email']);
      localStorage.setItem("username", data['username']);
      localStorage.setItem("mobile", data['mobile']);
      this.router.navigate(['dashboard']);
    })
  }

}
