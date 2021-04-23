import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/interfaces';
import { Router } from '@angular/router';
import { SnackBarService } from '../../shared/services/snack-bar.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  get email(): any {
    return this.loginForm.get('email');
  }

  get password(): any {
    return this.loginForm.get('password');
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBarServise: SnackBarService
  ) {

  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
       return;
     } else {

      const user: User = {
        email: this.email.value,
        password: this.password.value
      };

      this.auth.login(user)
        .subscribe(() => {
          this.router.navigate(['admin']);
        },
          (res) => {
          console.log(res.error);
          this.snackBarServise.openSnackBar(res.error.error.message);
          });
    }
  }
}
