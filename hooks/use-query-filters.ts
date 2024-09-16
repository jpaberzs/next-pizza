import { useEffect } from 'react';
import { FiltersProps } from './use-filters';
import QueryString from 'qs';
import { useRouter } from 'next/navigation';

export const useQueryFilters = (filters: FiltersProps) => {
  const router = useRouter();

  useEffect(() => {
    const params = {
      ...filters.prices,
      pizzaTypes: Array.from(filters.pizzaTypes),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients),
    };

    const queryString = QueryString.stringify(params, { arrayFormat: 'comma' });

    router.push(`?${queryString}`, { scroll: false });
  }, [filters, router]);
};
