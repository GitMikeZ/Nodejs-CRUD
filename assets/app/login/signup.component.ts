import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from "./auth.service";
import { User } from "./user.model";

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

	myForm: FormGroup;

	constructor(private authService: AuthService) {}

	onSubmit() {
		const user = new User(
				this.myForm.value.email,
				this.myForm.value.password,
				this.myForm.value.username
		);
		this.authService.signup(user)
				.subscribe(
						data => console.log(data),
						error => console.log(error)
				);
		this.myForm.reset();
	}

	ngOnInit() {
		this.myForm = new FormGroup({
				username: new FormGroup(null, Validators.required),
				email: new FormControl(null, [
						Validators.required,
						Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
				]),
				password: new FormGroup(null, Validators.required)
		})
	}
}
