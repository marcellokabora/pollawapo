# Wallapop Tech Test

The purpose of this test is to assess your ability to create a modern and functional single page application (SPA) using web technologies.

## Project Goal

Develop an Angular SPA that provides the following features:

- **Item Manager**: Search for items by Title, Description, Price, and Email.
- **Item Details**: Each item includes these fields and an image.
- **Search Results**: Display a list of items with all relevant details.
- **Favorites List**: Select items to add to a favorites list, viewable in a modal (image + title only).
- **Favorites Modal**: Remove items from favorites without closing the modal. Favorites do **not** persist after reload.
- **Infinite Scroll**: Show 5 items initially, load more as you scroll (total: 20 items).

## Tech Stack

- Angular 19.2.0
- TypeScript 5.7.2
- Tailwind 4.1.7
- MSW 2.8.3
- Jest 29.7.0

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/wallapop.git
   cd wallapop
   ```

2. **Install dependencies**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Set up Tailwind CSS**
   - Tailwind is already configured in the project. If you need to re-install, run:
     ```sh
     npm install -D tailwindcss postcss autoprefixer
     npx tailwindcss init
     ```
   - The main styles are in `src/styles.css` and Tailwind directives are included there.
   - For more info, see [Tailwind CSS docs](https://tailwindcss.com/docs/guides/angular).


4. **Set up Mock Service Worker (MSW)**
   - MSW is already configured in the project. If you need to re-install, run:
     ```sh
     npm install msw --save-dev
     ```
   - The mock handlers are configured to serve `tech-test-data/data.json` and images.
   - No changes are needed to `data.json`.
   - For more info, see [MSW docs](https://mswjs.io/docs/getting-started).

5. **Start the development server**
   ```sh
   ng serve
   ```
   The app will be available at [http://localhost:4200](http://localhost:4200).

## Running Tests

To run all unit and integration tests using Jest:

```sh
npm test
```

To run end-to-end tests (if configured):

```sh
ng e2e
```

## Testing

- **Test Runner**: [Jest](https://jestjs.io/) is used for all unit and integration tests.
- **Test Files**: Test files are located alongside their source files and use the `.spec.ts` suffix (e.g., `favorites.service.spec.ts`).
- **Coverage**: Run `npm test -- --coverage` to generate a coverage report.
- **Adding Tests**: Create new `.spec.ts` files next to the code you want to test. Follow existing test patterns for consistency.
- **Mocking**: MSW is used to mock API responses during tests.

## Usage

- **Search**: Use the search bar to filter items by title, description, price, or email.
- **Infinite Scroll**: Scroll down to load more items (5 at a time).
- **Favorites**: Click the "Add to Favorites" button on any item. Open the favorites modal via the floating button.
- **Remove from Favorites**: In the modal, click the remove icon to delete items from your favorites list.

## Project Structure

- `src/app/` - Main Angular application code
  - `components/` - Angular components (item list, item card, search input, favorites modal, etc.)
  - `services/` - Business logic and state management (favorites, item, manager services)
  - `interfaces/` - TypeScript interfaces (e.g., `item.interface.ts`)
- `src/styles.css` - Global styles and Tailwind CSS directives
- `src/mocks/` - MSW handlers and service worker setup
- `public/` - Static assets (images, service worker, logos)
- `angular.json`, `tsconfig*.json` - Angular and TypeScript configuration files
- `jest.config.js`, `setup-jest.ts` - Jest configuration and setup
- `README.md` - Project documentation

## Key Decisions & Notes

- **Tailwind CSS** is used for utility-first, responsive, and custom styling.
- **MSW** is used to mock API responses from `data.json` for local development and testing.
- **No external UI component libraries** were used to keep the bundle size small and the UI custom.
- **Favorites** are managed in-memory (not persisted).
- **Testing**: Unit tests cover components, services, and MSW integration.
- **Responsive Design**: The app is fully responsive for mobile and desktop.
- **Performance**: List rendering is optimized for smooth infinite scrolling.