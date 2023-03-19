import {
  createApiFactory,
  createPlugin,
  discoveryApiRef,
  identityApiRef,
  createRoutableExtension
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

import { armorcodeApiRef, ArmorcodeClient } from './api';

export const armorcodePlugin = createPlugin({
  id: 'armorcode',
  apis: [
    createApiFactory({
      api: armorcodeApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
        identityApi: identityApiRef,
      },
      factory: ({ discoveryApi, identityApi }) =>
        new ArmorcodeClient({
          discoveryApi,
          identityApi,
        }),
    }),
  ],
  routes: {
    root: rootRouteRef,
  },
});

export const ArmorcodePage = armorcodePlugin.provide(
  createRoutableExtension({
    name: 'ArmorcodePage',
    component: () => 
      import('./components/ArmorcodePage').then(m => m.ArmorcodePageComponent),
    mountPoint: rootRouteRef,
  }),
);

export const ArmorcodeCard = armorcodePlugin.provide(
  createRoutableExtension({
    name: 'ArmorcodeCard',
    component: () =>
      import('./components/ArmorcodeCard').then(m => m.ArmorcodeCardComponent),
    mountPoint: rootRouteRef,
  }),
);