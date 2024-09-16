import { Api } from '@/services/api-client';
import { Ingredient } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useSet } from 'react-use';

interface ReturnProps {
  ingredients: Ingredient[];
  loading: boolean;
  selectedIngredients: Set<string>;
  onAddId: (id: string) => void;
}

export const useFilterIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedIngredients, { toggle }] = useSet(new Set<string>([]));

  useEffect(() => {
    async function fetchIngreditents() {
      try {
        setLoading(true);
        const fetchIngredients = await Api.ingredients.getAll();

        setIngredients(fetchIngredients);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchIngreditents();
  }, []);

  return { ingredients, loading, onAddId: toggle, selectedIngredients };
};
