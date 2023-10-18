/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FeatureProviderDto } from './FeatureProviderDto';
import type { IStringValueType } from './IStringValueType';

export type FeatureDto = {
    name?: string | null;
    displayName?: string | null;
    value?: string | null;
    provider?: FeatureProviderDto;
    description?: string | null;
    valueType?: IStringValueType;
    depth?: number;
    parentName?: string | null;
};
