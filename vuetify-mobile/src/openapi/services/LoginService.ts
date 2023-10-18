/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AbpLoginResult } from '../models/AbpLoginResult';
import type { UserLoginInfo } from '../models/UserLoginInfo';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LoginService {

    /**
     * @returns AbpLoginResult Success
     * @throws ApiError
     */
    public static loginLogin({
requestBody,
}: {
requestBody?: UserLoginInfo,
}): CancelablePromise<AbpLoginResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/account/login',
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
    public static loginLogout(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/account/logout',
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
     * @returns AbpLoginResult Success
     * @throws ApiError
     */
    public static loginCheckPassword({
requestBody,
}: {
requestBody?: UserLoginInfo,
}): CancelablePromise<AbpLoginResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/account/check-password',
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
