import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService} from '../../authentication/services/user.service';
import { Router } from '@angular/router';

export const OrderAccessGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const profile = userService.getCurrentUserProfile();

  if (profile?.role === 'Liquor Store Owner' || profile?.role === 'Supplier') {
    return true;
  }

  router.navigate(['/unauthorized']);
  return false;
};
