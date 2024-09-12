import { Container, Title, Categories, SortPopup, Filters, ProductCard } from '@/components/shared';

export default function Home() {
  return (
    <>
      <Container>
        <Title text="Все пиццы" size="lg" className="font-extrabold mt-10" />
      </Container>
      <div className="sticky top-0 z-20 bg-white py-5 shadow-lg shadow-black/5">
        <Container className="flex items-center justify-between">
          <Categories />
          <SortPopup />
        </Container>
      </div>
      <Container className="mt-10 pb-14">
        <div className="flex gap-[60px]">
          <div className="w-[250px]">
            <Filters />
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductCard
                id={0}
                name="Чизбургер-пицца"
                price={550}
                imageUrl="https://media.dodostatic.net/image/r:292x292/11EE7D610E8BBB248F31270BE742B4BD.jpg"
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
