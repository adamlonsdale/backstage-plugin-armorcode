import { Entity } from '@backstage/catalog-model';

export const ARMORCODE_PROJECT_ANNOTATION = 'armorcode/project';

export const isArmorcodeAvailable = (entity: Entity) =>
  Boolean(entity.metadata.annotations?.[ARMORCODE_PROJECT_ANNOTATION]);

export const getProjectAnnotation = (
  entity: Entity,
): {
  projectName: string;
  projectVersion: string;
} => {
  let projectName = undefined;
  let projectVersion = undefined;
  const annotation: any = entity?.metadata.annotations?.[ARMORCODE_PROJECT_ANNOTATION];
  if (annotation) {
    [projectName, projectVersion] = annotation.split('/');
  }
  return { projectName, projectVersion };
};
