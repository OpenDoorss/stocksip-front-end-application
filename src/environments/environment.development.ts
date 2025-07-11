export const environment = {
  production: true,
  apiUrl: 'http://localhost:3000/api/v1',
  warehousesEndpointPath: '/warehouses',
  productsEndpointPath: '/products',
  reportsEndpointPath: '/reports',
  zonesEndpointPath: '/zones',
  userEndpointPath: '/users',
  profileEndpointPath: '/profiles',
  accountsEndpointPath: '/accounts',
  catalogEndpointPath: '/catalog',
  authEndpointPath: '/authentications',
  baseServerUrl: 'http://localhost:8080/api/v1',

  accountWarehousesEndpointPath: '/accounts/{accountId}/warehouses',
  accountProductsEndpointPath: '/accounts/{accountId}/products',

  plansEndpointPath: '/plans',
  accountCurrentPlanEndpointPath: '/accounts/{accountId}/subscriptions/current-plan',
  accountStatusEndpointPath: '/accounts/{accountId}/status',

  subscriptionNewEndpointPath: '/subscriptions/new',
  subscriptionCompleteEndpointPath: '/subscriptions/complete',
  subscriptionsUpgradeEndpointPath: '/subscriptions/upgrade',
  subscriptionsUpgradeCompleteEndpointPath: '/subscriptions/upgrade-complete',
};
