import { createApiRef } from '@backstage/core-plugin-api';

/** @public */
export const armorcodeApiRef = createApiRef<ArmorcodeApi>({
  id: 'plugin.armorcode.service',
});

/** @public */
export interface ArmorcodeApi {
  getCriticalProductFindings(productId: number): Promise<any>;
  getProducts(): Promise<any>;
};