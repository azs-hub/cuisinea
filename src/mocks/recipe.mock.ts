import { faker } from '@faker-js/faker'
import { simpleFaker } from '@faker-js/faker'
import type { RecipeCategory, Recipe, Ingredient } from '@/types/Recipe'
import { RecipeLevel } from '@/types/Recipe'

const categories: RecipeCategory[] = [
  {
    label: 'Pasta',
    id: 'Pasta',
  },
  {
    label: 'Curry',
    id: 'Curry',
  },
  {
    label: 'Vegetarian',
    id: 'Vegetarian',
  },
  {
    label: 'Indian',
    id: 'Indian',
  },
  {
    label: 'Mexican',
    id: 'Mexican',
  },
  {
    label: 'Chicken',
    id: 'Chicken',
  },
  {
    label: 'Mains',
    id: 'mains',
  },
  {
    label: 'Desserts',
    id: 'desserts',
  },
  {
    label: 'Starters',
    id: 'starters',
  },
]

const ingredients: Ingredient[] = [
  {
    id: simpleFaker.string.uuid(),
    name: 'sel ou quelques gouttes de jus de citron',
  },
  {
    id: simpleFaker.string.uuid(),
    name: 'oeuf par personne (ou + si vous êtes gourmand ou pour en faire un plat',
  },
  {
    id: simpleFaker.string.uuid(),
    name: 'pain de campagne pour réaliser des mouillettes',
  },
  {
    id: simpleFaker.string.uuid(),
    name: 'beurre demi-sel',
  },
]

const getSpecificCategoryId = (id: string): RecipeCategory => ({
  label: id,
  id,
})

const getTags = (id?: string): RecipeCategory[] => {
  const tags = faker.helpers.arrayElements(categories, { min: 1, max: 4 })
  if (id) tags.push(getSpecificCategoryId(id))

  return tags
}

interface CreateRecipeData {
  id?: string
  categoryId?: string
}

const createRecipe = (data: CreateRecipeData): Recipe => ({
  id: data?.id || simpleFaker.string.uuid(),
  image: faker.image.urlLoremFlickr({ width: 1000, category: 'food' }),
  name: faker.lorem.word(),
  shortDescription: faker.lorem.sentences(),
  note: faker.lorem.sentences(),
  serving: faker.number.int({ min: 1, max: 100 }),
  level: faker.helpers.arrayElement([
    RecipeLevel.easy,
    RecipeLevel.intermediary,
    RecipeLevel.difficult,
  ]),
  cost: faker.number.int({ min: 1, max: 100 }),
  tags: getTags(data?.categoryId), // faker.helpers.arrayElements(categories, { min: 1, max: 4 }),
  ingredients: ingredients,
  duration: {
    id: simpleFaker.string.uuid(),
    prepTimeMin: faker.number.int({ min: 10, max: 100 }),
    soakTimeMin: faker.number.int({ min: 10, max: 100 }),
    cookTimeMin: faker.number.int({ min: 10, max: 100 }),
    totalTimeMin: faker.number.int({ min: 10, max: 100 }),
  },
  steps: [
    {
      id: simpleFaker.string.uuid(),
      position: 0,
      description: "Faire bouillir dans une casserole de l'eau salée ou citronnée",
    },
    {
      id: simpleFaker.string.uuid(),
      position: 1,
      description:
        "Laisser les œufs à température ambiante 1/2 h avant afin d’éviter la fêlure de la coquille avec l'eau chaude",
    },
  ],
})

export const getFakeRecipes = (listLength = 5): Recipe[] => {
  return Array.from({ length: listLength }, createRecipe)
}
export const getFakeRecipe = (id?: string): Recipe => createRecipe({ id })
export const getFakeAllCategoriesRecipes = () => categories

export const getFakeRecipesByCategoryId = (categoryId: string, listLength: number): Recipe[] => {
  const data: CreateRecipeData = { categoryId }
  return Array.from({ length: listLength }, () => {
    return createRecipe(data)
  })
}
export const getCategoryRecipeById = (id: string): RecipeCategory | undefined =>
  categories.find((c) => c.id == id)
export const getFakeTags = (): RecipeCategory[] => getTags()
