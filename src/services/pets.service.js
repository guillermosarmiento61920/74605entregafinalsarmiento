import { fa, faker } from "@faker-js/faker";

export function generateFakePets(count = 100) {
  const pets = [];

  for (let i = 0; i < count; i++) {
    pets.push({
      _id: faker.database.mongodbObjectId(),
      name: faker.animal.dog(),
      species: faker.animal.type(),
      age: faker.number.int({ min: 1, max: 15 }),
      adopted: false,
      owner: null,
    });
  }

  return pets;
}
