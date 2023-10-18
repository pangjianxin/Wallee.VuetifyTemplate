/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetPermissionListResultDto } from '../models/GetPermissionListResultDto';
import type { UpdatePermissionsDto } from '../models/UpdatePermissionsDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PermissionsService {

    /**
     * @returns GetPermissionListResultDto Success
     * @throws ApiError
     */
    public static permissionsGet({
providerName,
providerKey,
}: {
providerName?: string,
providerKey?: string,
}): CancelablePromise<GetPermissionListResultDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/permission-management/permissions',
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
    public static permissionsUpdate({
providerName,
providerKey,
requestBody,
}: {
providerName?: string,
providerKey?: string,
requestBody?: UpdatePermissionsDto,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/permission-management/permissions',
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

}
