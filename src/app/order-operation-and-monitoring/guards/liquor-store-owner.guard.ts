import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../authentication/services/user.service';

export const LiquorStoreOwnerGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const profile = userService.getCurrentUserProfile();

  if (profile?.role === 'Liquor Store Owner') {
    return true;
  }

  router.navigate(['/unauthorized']);
  return false;
};
