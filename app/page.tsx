import {
  Container,
  Title,
  Categories,
  SortPopup,
  Filters,
  ProductsGroupList,
} from '@/components/shared';

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
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Filters />
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                categoryId={1}
                items={[
                  {
                    id: 1,
                    name: 'Пицца 1',
                    price: 150,
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D6134BC4150BDD8E792D866AB52.jpg',
                  },
                  {
                    id: 2,
                    name: 'Пицца 2',
                    price: 250,
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D6134BC4150BDD8E792D866AB52.jpg',
                  },
                  {
                    id: 3,
                    name: 'Пицца 1',
                    price: 150,
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D6134BC4150BDD8E792D866AB52.jpg',
                  },
                  {
                    id: 4,
                    name: 'Пицца 1',
                    price: 150,
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D6134BC4150BDD8E792D866AB52.jpg',
                  },
                  {
                    id: 5,
                    name: 'Пицца 1',
                    price: 150,
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D6134BC4150BDD8E792D866AB52.jpg',
                  },
                ]}
                title="Пиццы"
              />
              <ProductsGroupList
                title="Комбо"
                categoryId={2}
                items={[
                  {
                    id: 1,
                    name: 'Пицца 1',
                    price: 150,
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D6134BC4150BDD8E792D866AB52.jpg',
                  },
                  {
                    id: 2,
                    name: 'Пицца 2',
                    price: 250,
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D6134BC4150BDD8E792D866AB52.jpg',
                  },
                  {
                    id: 3,
                    name: 'Пицца 1',
                    price: 150,
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D6134BC4150BDD8E792D866AB52.jpg',
                  },
                  {
                    id: 1,
                    name: 'Пицца 1',
                    price: 150,
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D6134BC4150BDD8E792D866AB52.jpg',
                  },
                  {
                    id: 1,
                    name: 'Пицца 1',
                    price: 150,
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D6134BC4150BDD8E792D866AB52.jpg',
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
