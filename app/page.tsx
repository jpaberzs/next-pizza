import { Container, Title, Categories, SortPopup } from '@/components/shared';

export default function Page() {
  return (
    <>
      <Container>
        <Title text="Все пиццы" size="lg" className="font-extrabold mt-10" />
      </Container>
      <div className="sticky top-0 bg-white py-5 shadow-lg shadow-black/5">
        <Container className="flex items-center justify-between">
          <Categories />
          <SortPopup />
        </Container>
      </div>
    </>
  );
}
