import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../login/login.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['header.component.css']
})

export class HeaderComponent {

	constructor(private loginService: LoginService, private router: Router) {}

	isLoggedIn() {
		return localStorage.getItem('token') !== null;
	}

	onLogout() {
		this.loginService.logout();
	}
}
