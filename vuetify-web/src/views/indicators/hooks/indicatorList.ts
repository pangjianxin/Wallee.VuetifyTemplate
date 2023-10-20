import { IndicatorDto, IndicatorService } from "@/openapi";
import { watchDebounced } from "@vueuse/core";

export const useIndicatorList = () => {
  const filter = ref("");
  const list = ref<IndicatorDto[]>([]);
  const pageable: Pageable = reactive({
    pageNum: 0,
    pageSize: 10,
    total: 0,
  });

  const onFilterChange = (val: string) => {
    filter.value = val;
  };

  const getList = async () => {
    const res = await IndicatorService.indicatorGetList({
      filter: filter.value,
      skipCount: (pageable.pageNum - 1) * pageable.pageSize,
      maxResultCount: pageable.pageSize,
    });
    list.value = res.items as Array<IndicatorDto>;
    pageable.total = res.totalCount!;
  };

  watchDebounced(
    () => filter.value,
    async () => await getList(),
    {
      debounce: 300,
      maxWait: 500,
    }
  );

  return { filter, list, pageable, getList, onFilterChange };
};
