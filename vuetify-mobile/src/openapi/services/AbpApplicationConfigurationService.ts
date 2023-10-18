/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplicationConfigurationDto } from '../models/ApplicationConfigurationDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AbpApplicationConfigurationService {

    /**
     * @returns ApplicationConfigurationDto Success
     * @throws ApiError
     */
    public static abpApplicationConfigurationGet({
includeLocalizationResources,
}: {
includeLocalizationResources?: boolean,
}): CancelablePromise<ApplicationConfigurationDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/abp/application-configuration',
            query: {
                'IncludeLocalizationResources': includeLocalizationResources,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }

}
