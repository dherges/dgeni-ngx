import { DjungleBook, Animal, Human } from './djungle-book';

export const THE_DJUNGLE_BOOK: DjungleBook = {
  title: 'The Djungle Book',
  _links: {
    self: { href: '/the-djungle-book' }
  },
  _embedded: {
    animals: [
      {
        name: 'Bagheera',
        species: 'Black Panther'
      },
      {
        name: 'Balou',
        species: 'Bear'
      },
      {
        name: 'Sheer Khan',
        species: 'Tiger'
      }
    ],
    humans: [
      {
        name: 'Mowgli'
      }
    ]
  }
};
