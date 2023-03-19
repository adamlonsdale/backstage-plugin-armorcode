import { createApiRef } from '@backstage/core-plugin-api';

/** @public */
export const armorcodeApiRef = createApiRef<ArmorcodeApi>({
  id: 'plugin.armorcode.service',
});

/** @public */
export interface ArmorcodeApi {
  getVulnerabilities(projectName: string, projectVersion: string): Promise<any>;
  getProjects(): Promise<any>;
};