import { Container, Title } from '@/components/shared';
import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <>
      <Container>
        <Title text="Все пиццы" size="lg" className="font-extrabold mt-10" />
        <Button variant="outline">Click me</Button>
      </Container>
    </>
  );
}
