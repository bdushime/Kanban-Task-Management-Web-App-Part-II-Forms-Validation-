import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  
  if (authService.isLoggedIn) {
    return true; 
  } else {
    console.log('Access Denied! You are not logged in.');
    return false; 
  }
};
