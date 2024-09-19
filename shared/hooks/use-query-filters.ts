import { useEffect } from 'react';
import { FiltersProps } from './use-filters';
import QueryString from 'qs';
import { usePathname, useRouter } from 'next/navigation';

export const useQueryFilters = (filters: FiltersProps) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const params = {
      ...filters.prices,
      pizzaTypes: Array.from(filters.pizzaTypes),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients),
    };

    const queryString = QueryString.stringify(params, { arrayFormat: 'comma' });

    if (pathname === '/') router.push(`?${queryString}`, { scroll: false });
  }, [pathname, filters, router]);
};
