# Twitter Clone

A Twitter-inspired social media application built with **Next.js** and **React**. This project is designed to recreate the core experience of a modern social platform while exploring frontend development, reusable UI components, and responsive web interfaces.

## ✨ Overview

Twitter Clone is a frontend web application inspired by Twitter's user experience and interface.

The project uses Next.js for its application structure and routing, Material UI for UI components, and Tailwind CSS for styling.

It is also an ongoing development project, with a focus on improving code organization, maintainability, and the overall user experience.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js](https://nextjs.org/) 15 | React framework and application routing |
| [React](https://react.dev/) 18 | Building user interfaces |
| [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) | Application logic |
| [Material UI](https://mui.com/) 5 | UI components |
| [Emotion](https://emotion.sh/) | CSS-in-JS styling |
| [Tailwind CSS](https://tailwindcss.com/) 3 | Utility-first styling |
| [PostCSS](https://postcss.org/) | CSS processing |
| [UUID](https://www.npmjs.com/package/uuid) | Unique identifier generation |

## 📁 Project Structure

The project follows a Next.js Pages Router structure.

```text
twitter-clone/
│
├── Components/       # Reusable UI components
├── pages/            # Application pages and routes
│   ├── index.js      # Main entry page
│   ├── home.js       # Home page
│   └── profile.js    # Profile page
│
├── public/           # Static assets
├── styles/           # Stylesheets (if present)
│
├── package.json
├── package-lock.json
├── jsconfig.json
└── README.md
```

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js 26.x
- npm

### 1. Clone the repository

```bash
git clone https://github.com/ShirinAbdz/twitter-clone-nextjs.git
```

### 2. Navigate to the project directory

```bash
cd twitter-clone-nextjs
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

If port 3000 is already in use, Next.js will automatically try another available port.

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates an optimized production build |
| `npm run start` | Runs the production server |
| `npm run lint` | Runs Next.js lint checks |
| `npm run analyze` | Builds the application and runs the bundle analyzer |

## 🌐 Application Routes

| Route | Description |
|---|---|
| `/` | Main entry page |
| `/home` | Home page |
| `/profile` | User profile page |

## 🏗️ Production Build

To create a production build:

```bash
npm run build
```

To run the production version locally:

```bash
npm run start
```

## 🚀 Deployment

The project is connected to **Vercel** for deployment.

To deploy your own version:

1. Push the project to a GitHub repository.
2. Import the repository into [Vercel](https://vercel.com/).
3. Configure the project settings.
4. Deploy the application.

## 📌 Project Status

This project is under active development. Its structure and implementation may evolve as new features and improvements are introduced.

---

**Built with React, Next.js, and a passion for frontend development.**