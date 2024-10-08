import {
  Container,
  Title,
  Categories,
  Filters,
  ProductsGroupList,
} from '@/shared/components/shared';
import { Suspense } from 'react';
import { findPizzas } from '@/shared/lib';
import { GetSearchParams } from '@/shared/lib/find-pizzas';

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
  const categories = await findPizzas(searchParams);

  return (
    <>
      <Container>
        <Title text="Все пиццы" size="lg" className="font-extrabold mt-10" />
      </Container>
      <div className="sticky top-0 z-20 bg-white py-5 shadow-lg shadow-black/5">
        <Container className="flex items-center justify-between">
          <Categories items={categories.filter((category) => category.products.length > 0)} />
          {/* <SortPopup /> */}
        </Container>
      </div>
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      categoryId={category.id}
                      items={category.products}
                      title={category.name}
                    />
                  ),
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
