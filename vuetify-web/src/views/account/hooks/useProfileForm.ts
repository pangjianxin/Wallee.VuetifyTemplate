import { UpdateProfileDto, ProfileService, ProfileDto } from "@/openapi";
import { SubmitEventPromise } from "vuetify";
import { useGlobalStore } from "@/store/globalStore";

export const useProfileForm = () => {
  const profileFormValid = ref(false);
  const profileForm: UpdateProfileDto = reactive({
    userName: "",
    email: "",
    name: "",
    phoneNumber: "",
    concurrencyStamp: "",
  });

  const profileFormRules = {
    userName: [(value: string) => !!value || `登录用户名必填`],
    email: [
      (value: string) => !!value || `邮箱必填`,
      (value: string) => {
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          return true;
        }
        return `邮箱格式不正确`;
      },
    ],
    name: [(value: string) => !!value || `用户名称必填`],
    phoneNumber: [],
  };

  const initProfileInfo = (v: ProfileDto) => {
    profileForm.concurrencyStamp = v.concurrencyStamp;
    profileForm.email = v.email;
    profileForm.name = v.name;
    profileForm.phoneNumber = v.phoneNumber;
    profileForm.userName = v.userName;
    profileForm.surname = v.surname;
  };

  const submitUpdateProfile = async (e: SubmitEventPromise) => {
    profileFormValid.value = (await e).valid;
    if (profileFormValid.value === true) {
      const { setLoading, setSnackbarText } = useGlobalStore();
      try {
        setLoading(true);
        await ProfileService.profileUpdate({ requestBody: profileForm });
      } finally {
        setLoading(false);
        setSnackbarText("操作成功");
      }
    }
  };

  return {
    profileFormValid,
    profileForm,
    profileFormRules,
    initProfileInfo,
    submitUpdateProfile,
  };
};
