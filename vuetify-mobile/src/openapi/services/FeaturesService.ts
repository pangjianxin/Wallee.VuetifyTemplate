/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetFeatureListResultDto } from '../models/GetFeatureListResultDto';
import type { UpdateFeaturesDto } from '../models/UpdateFeaturesDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FeaturesService {

    /**
     * @returns GetFeatureListResultDto Success
     * @throws ApiError
     */
    public static featuresGet({
providerName,
providerKey,
}: {
providerName?: string,
providerKey?: string,
}): CancelablePromise<GetFeatureListResultDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/feature-management/features',
            query: {
                'providerName': providerName,
                'providerKey': providerKey,
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

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static featuresUpdate({
providerName,
providerKey,
requestBody,
}: {
providerName?: string,
providerKey?: string,
requestBody?: UpdateFeaturesDto,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/feature-management/features',
            query: {
                'providerName': providerName,
                'providerKey': providerKey,
            },
            body: requestBody,
            mediaType: 'application/json',
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

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static featuresDelete({
providerName,
providerKey,
}: {
providerName?: string,
providerKey?: string,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/feature-management/features',
            query: {
                'providerName': providerName,
                'providerKey': providerKey,
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
