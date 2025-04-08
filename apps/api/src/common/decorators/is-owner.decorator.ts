import { SetMetadata } from '@nestjs/common';

export const RESOURCE_OWNER_KEY = 'owner';

export interface IsOwnerMeta {
  model: string;
  ownerField: string;
  routeParam?: string;
}

export const IsOwner = (
  model: string,
  ownerField: string,
  routeParam: string = 'id',
) => SetMetadata(RESOURCE_OWNER_KEY, { model, ownerField, routeParam });
