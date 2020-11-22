import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth_service/auth.service';

@Component({
  selector: 'app-headers',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }
  /* User Logout */
  logout() {
     this.authService.logout();
  }

}
