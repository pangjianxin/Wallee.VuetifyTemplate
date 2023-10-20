import { defineStore } from "pinia";
import {
  ApplicationConfigurationDto,
  ApplicationLocalizationConfigurationDto,
  ApplicationAuthConfigurationDto,
  ApplicationSettingConfigurationDto,
  CurrentUserDto,
  CurrentTenantDto,
  AbpApplicationConfigurationService,
} from "@/openapi/index";

export const useServerConfigStore = defineStore(
  "app-config",
  () => {
    const state = reactive<ApplicationConfigurationDto>({
      localization: undefined,
      auth: undefined,
      setting: undefined,
      currentUser: undefined,
      multiTenancy: undefined,
      currentTenant: undefined,
      timing: undefined,
      clock: undefined,
    });
    const getLocalization = computed<
      ApplicationLocalizationConfigurationDto | undefined
    >(() => state.localization);
    const getAuth = computed<ApplicationAuthConfigurationDto | undefined>(
      () => state.auth
    );
    const getSetting = computed<ApplicationSettingConfigurationDto | undefined>(
      () => state.setting
    );
    const getCurrentUser = computed<CurrentUserDto | undefined>(
      () => state.currentUser
    );
    const getCUrrentUserName = computed<string | null | undefined>(
      () => state.currentUser?.name
    );
    const isAuthenticated = computed<boolean | undefined>(
      () => state.currentUser?.isAuthenticated
    );
    const getCurrentTenant = computed<CurrentTenantDto | undefined>(
      () => state.currentTenant
    );

    const initConfig = async () => {
      const config =
        await AbpApplicationConfigurationService.abpApplicationConfigurationGet(
          { includeLocalizationResources: false }
        );
      if (config) {
        state.localization = config.localization;
        state.auth = config.auth;
        state.setting = config.setting;
        state.currentUser = config.currentUser;
        state.currentTenant = config.currentTenant;
      }
    };

    return {
      state,
      getLocalization,
      getAuth,
      getSetting,
      getCurrentTenant,
      getCurrentUser,
      getCUrrentUserName,
      isAuthenticated,
      initConfig,
    };
  },
  {
    persist: {
      storage: localStorage,
      paths: [
        "state.localization",
        "state.auth",
        "state.setting",
        "state.currentUser",
        "state.currentTenant",
      ],
      key: "app-config",
    },
  }
);
