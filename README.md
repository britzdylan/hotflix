# HOTFLIX

This app is a platform for browsing the most popular TV shows online for free. It allows users to explore a wide range of TV shows and stay up to date with the latest episodes. With a user-friendly interface and a vast collection of shows, this app provides an enjoyable streaming experience for TV enthusiasts.

## Description

### Features

- **Browse TV Shows**: Users can explore a wide range of the most popular english TV shows off all time.
- **Search TV Shows**: Users can search for TV shows by name.
- **View the hottest & latest TV Show**: Users can view the hottest and latest TV shows.
- **View TV Show Details**: Users can view the details of a TV show, including the name, description, and the number of seasons.
- **Manage you watch list**: Users can add TV shows to their watch list and remove them from it.
- **View your watch list**: Users can view the TV shows in their watch list.

### Prerequisites

- Node.js (v20.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/britzdylan/hotflix.git
cd hotflix
```

2. Install the dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the app in your browser:

```bash
http://localhost:4173
```

5. To run the tests:

```bash
npm test:unit
```

### Technologies

- **Vue3**: This app is built with Vue3, a progressive JavaScript framework for building user interfaces.
- **Vite**: This app is built with Vite, a build tool that aims to provide a faster and leaner development experience for modern web projects.
- **Tailwind CSS**: This app uses Tailwind CSS, a utility-first CSS framework for building custom designs.
- **Vitest**: This app uses Vitest, a testing library for Vue3 that provides a simple and fast testing experience.
- **pinia**: This app uses Pinia, a state management library for Vue3 that provides a simple and fast state management experience.

## Architecture and Design

- **App like experience**: This app is designed to provide an app-like experience for users, with a fast and responsive user interface. Hence the use of Vite & Vue3 to provide a fast and leaner development experience for modern web projects.

- **User Interface**: This app uses Tailwind CSS, a utility-first CSS framework for building custom designs. The user interface is designed to be simple, clean, and user-friendly.

- **User Experience**: This app is designed to provide a fast and enjoyable user experience. The user interface is responsive and accessible, and the app is optimized for performance.

- **Components**: This app is built with a component-based architecture, where each component is a self-contained unit that can be reused across the app.

- **State Management**: This app uses Pinia, a state management library for Vue3 that provides a simple and fast state management experience.

- **Routing**: This app uses Vue Router, a routing library for Vue3 that provides a simple and fast routing experience.

- **API**: This app uses the TVmaze API to fetch TV show data.

- **Local Data**: This app local snapshots of the TVmaze API to provide a fast and reliable user experience.

- **Data synchronization**: This app uses a data synchronization strategy to keep the local data up to date with the TVmaze API. The local data is updated periodically to ensure that it is always up to date via a cron job.

- **Caching**: This app uses a caching strategy to cache the TV show data and provide a fast and reliable user experience.

- **Unit Tests**: This app is tested with unit tests that cover the composables and the state management along with some utility functions.

- **Deployment**: This app is deployed on Render, a cloud platform that provides a simple and fast deployment experience for modern web projects.

## Roadmap

- **User Authentication**: Add user authentication to allow users to create an account and log in.

- **Episodes**: Add the ability to view the episodes of a TV show.

- **Comments**: Add the ability to comment on TV shows.

- **Recommendations**: Add the ability to recommend TV shows to other users.

- **Public User Profiles**: Add user profiles to allow users to view their watch list and recommendations.

- **Integration Tests**: Add integration tests to cover the user interface and the user experience.

- **e2e**: Add e2e tests to cover the user interface.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.
