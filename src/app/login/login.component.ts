import { Component, OnInit } from '@angular/core';
import { UserCredentials } from '../models/user-credentials';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credential:UserCredentials= new UserCredentials();
  isvalid: boolean = true;
  constructor(private _userService:UserService,private router: Router) {

   }

  ngOnInit() {
  if(this._userService.isLoggedIn){
    this.router.navigateByUrl("/home");
  }
    
  }

login(){
  this._userService.loginUser(this.credential).subscribe((data:any)=>{
console.log(data);
localStorage.setItem('token', data['token']);
this.router.navigateByUrl("/home");
  },error=>{
    console.log(error);
  });
}

validInput(){
return (this.credential.UserName !=null && this.credential.UserName!=''
&& this.credential.Password !=null && this.credential.Password!='')
}


}
