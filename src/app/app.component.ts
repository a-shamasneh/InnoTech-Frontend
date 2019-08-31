import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'InnoTechFrontend';
  navbarOpen = false;

constructor(private _userService:UserService){}

toggleNavbar() {
  this.navbarOpen = !this.navbarOpen;
}

isLoggedIn(){
  return this._userService.isLoggedIn();
}

logOut(){
  localStorage.clear();
  
}
}
