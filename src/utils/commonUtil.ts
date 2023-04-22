import { Entity } from '@backstage/catalog-model';

export const ARMORCODE_PRODUCT_ANNOTATION = 'armorcode/product';

export const isArmorcodeAvailable = (entity: Entity) =>
  Boolean(entity.metadata.annotations?.[ARMORCODE_PRODUCT_ANNOTATION]);

export const getProductAnnotation = (
  entity: Entity
): {
  productId: number;
} => {
  let productId = undefined;
  const annotation: any = entity?.metadata.annotations?.[ARMORCODE_PRODUCT_ANNOTATION];
  if (annotation) {
    [productId] = annotation.split('/');
  }
  return { productId };
};
