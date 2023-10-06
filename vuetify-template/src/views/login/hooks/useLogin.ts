import { CancelablePromise } from "@/openapi";
import { request as __request } from "@/openapi/core/request";
import { OpenAPI } from "@/openapi/core/OpenAPI";

export interface PasswordLogin {
  username: string;
  password: string;
  grant_type: string;
  client_id: string;
  scope: string;
}

export interface PhoneNumberLogin {
  phone_number: string;
  phone_verify_code: string;
  grant_type: string;
  client_id: string;
  scope: string;
}

export const useLogin = () => {
  const passwordLoginForm = reactive<PasswordLogin>({
    username: "",
    password: "",
    grant_type: import.meta.env["VITE_OIDC_GRANT_TYPE"],
    client_id: import.meta.env["VITE_OIDC_CLIENT_ID"],
    scope: import.meta.env["VITE_OIDC_SCOPE"],
  });

  const passwordLoginFormRules = reactive({
    username: [
      (value: string) => {
        if (!value) {
          return false;
        }
        return `请输入你的用户名`;
      },
    ],
    password: [
      {
        type: "string",
        required: true,
        message: "请输入你的密码",
        trigger: "change",
      },
    ],
  });

  function passwordLogin(requestBody: PasswordLogin): CancelablePromise<{
    access_token: string;
    token_type: string;
    id_token: string;
    expires_in: number;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/connect/token",
      body: requestBody,
      mediaType: "application/x-www-form-urlencoded",
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
  function phoneNumberLogin(requestBody: PhoneNumberLogin): CancelablePromise<{
    access_token: string;
    token_type: string;
    expires_in: number;
    id_token: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/connect/token",
      body: requestBody,
      mediaType: "application/x-www-form-urlencoded",
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

  function getUserInfo() {
    return __request(OpenAPI, {
      method: "GET",
      url: "/connect/userinfo",
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

  return {
    passwordLoginForm,
    passwordLoginFormRules,
    phoneNumberLogin,
    passwordLogin,
    getUserInfo,
  };
};
