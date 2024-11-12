import type { User } from '@/types/User'
import { faker } from '@faker-js/faker'
import { simpleFaker } from '@faker-js/faker'

export const getFakeUser = (): User => {
  return {
    id: simpleFaker.string.uuid(),
    username: faker.person.firstName(),
    token: faker.internet.jwt(),
  }
}
