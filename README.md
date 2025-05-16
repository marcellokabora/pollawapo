# Wallapop Tech Test

## What is this about?

The purpose of this test is to assess your ability to create a modern and functional single page application (SPA) using web technologies.

---

## Project Goal

Develop an Angular SPA that provides the following features:

- **Item Manager**: Search for items by Title, Description, Price, and Email.
- **Item Details**: Each item includes these fields and an image.
- **Search Results**: Display a list of items with all relevant details.
- **Favorites List**: Select items to add to a favorites list, viewable in a modal (image + title only).
- **Favorites Modal**: Remove items from favorites without closing the modal. Favorites do **not** persist after reload.
- **Infinite Scroll**: Show 5 items initially, load more as you scroll (total: 20 items).

---

## Tech Stack

- [Angular](https://angular.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [MSW (Mock Service Worker)](https://mswjs.io/) for API mocking
- [Jest](https://jestjs.io/) for testing

---

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

3. **Set up Mock Service Worker (MSW)**
   - Ensure `msw` is installed (`npm install msw --save-dev`).
   - The mock handlers are configured to serve `tech-test-data/data.json` and images.
   - No changes are needed to `data.json`.

4. **Start the development server**
   ```sh
   ng serve
   ```
   The app will be available at [http://localhost:4200](http://localhost:4200).

---

## Running Tests

To run unit and integration tests:

```sh
ng test
```

To run end-to-end tests (if configured):

```sh
ng e2e
```

---

## Usage

- **Search**: Use the search bar to filter items by title, description, price, or email.
- **Infinite Scroll**: Scroll down to load more items (5 at a time).
- **Favorites**: Click the "Add to Favorites" button on any item. Open the favorites modal via the floating button.
- **Remove from Favorites**: In the modal, click the remove icon to delete items from your favorites list.
- **Favorites Persistence**: The favorites list is cleared on page reload.

---

## Project Structure

- `src/app/` - Main Angular application code
- `tech-test-data/` - Contains `data.json` and item images
- `src/mocks/` - MSW handlers and service worker setup

---

## Key Decisions & Notes

- **MSW** is used to mock API responses from `data.json` for local development and testing.
- **No external UI libraries** were used to keep the bundle size small and the UI custom.
- **Favorites** are managed in-memory (not persisted).
- **Testing**: Unit tests cover components, services, and MSW integration.
- **Responsive Design**: The app is fully responsive for mobile and desktop.
- **Performance**: List rendering is optimized for smooth infinite scrolling.

---

## Commit & Documentation Guidelines

- Make frequent commits with clear, descriptive messages.
- Document key decisions in this README or in commit messages.
- Only add external libraries if absolutely necessary.
- Maintain consistent code style and best practices.

---

## How to Deliver

- Push your solution to a private repository (GitHub, Bitbucket, or GitLab).
- Include all necessary files and this README.
- Test the compilation and app functionality before submission.

---

## Troubleshooting

- If you encounter issues with MSW, ensure the service worker is registered and running.
- For any dependency issues, try deleting `node_modules` and reinstalling.

---

## Enjoy the challenge!