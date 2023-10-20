import {
  IndicatorService,
  CreateIndicatorDto,
  IndicatorCategory,
} from "@/openapi";
import { SubmitEventPromise } from "vuetify";
import { useGlobalStore } from "@/store/globalStore";
export const useCreateIndicatorForm = () => {
  const createFormValid = ref(false);
  const createForm = reactive<CreateIndicatorDto>({
    category: IndicatorCategory.对公线上,
    name: null,
    description: null,
    factor: 0,
  });

  const createFormRules = {
    category: [
      (value: string) => {
        if (/[0-9]/.test(value)) return true;
        return "请选择一个类别";
      },
    ],
    name: [(value: string) => !!value || `请填写名称`],
    description: [],
    factor: [
      (value: number) => {
        if (value <= 0) {
          return `系数不能小于0`;
        }
        return true;
      },
    ],
  };

  const submitCreateIndicator = async (e: SubmitEventPromise) => {
    createFormValid.value = (await e).valid;
    if (createFormValid.value === true) {
      const { setLoading, setSnackbarText } = useGlobalStore();
      try {
        setLoading(true);
        await IndicatorService.indicatorCreate({ requestBody: createForm });
      } finally {
        setLoading(false);
        setSnackbarText("创建成功");
      }
    }
  };

  return {
    createFormValid,
    createForm,
    createFormRules,
    submitCreateIndicator,
  };
};
