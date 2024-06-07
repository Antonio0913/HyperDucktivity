# HyperDucktivity

HyperDucktivity: a duck-themed todo list with modern features

Users create, edit, and delete tasks and the categories that hold them for a streamlined organizational tool. All data is stored in the cloud, and accounts are secured with login and authentication.

Project additions are checked with CI/CD and a testing process.

## Deployment: https://red-field-047362a1e.5.azurestaticapps.net/

## Development Environment Setup

Follow these instructions to set up your development environment for the project.

### Prerequisites

1. **Git**: Ensure Git is installed on your machine. [Download Git](https://git-scm.com/downloads)
2. **Node.js**: Install Node.js (LTS version recommended). [Download Node.js](https://nodejs.org/)
3. **VSCode**: Install Visual Studio Code. [Download VSCode](https://code.visualstudio.com/)
4. **MongoDB**: Install MongoDB. [Download MongoDB](https://www.mongodb.com/try/download/community)

### Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### Install Dependencies

```bash
npm install
```

### Install VSCode Extensions

- ESLint
- Prettier

### Environment Variables

Create a .env file in the root of your project and add the following environment variables. Replace placeholders with your provided developer Username/Password.

```bash
MONGO_URI="mongodb+srv://Username:Password@cluster0.qercnku.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
```

### Start Development

Now you can run the development server:

```bash
cd frontend
npm run dev
```

on a separate terminal:

```bash
cd backend
node backend.js
```

and access the site on localhost. Push feature branches to Github for evaluation and build.

## Diagrams and UI/UX

- [UI/UX](https://www.figma.com/design/AQ2A8JZ1UcukN1M0KmOwQ8/Hyperducktivity-UI-Prototype%2FStoryboard?node-id=0-1&t=NdCUSGFDL9p2E7JI-0)

- [UML Class Diagram](./docs/uml.md)

- Authentication Sequence Diagrams
  - [Sign Up](./docs/SignUpSequenceDiagram.png)
  - [Sign in](./docs/LoginSequenceDiagram.png)
  - [General](./docs/ProtectedRouteSequenceDiagram.png)

## Test Coverage Report

You can view the detailed coverage report for the NewCategory component [here](./docs/NewCategory.jsx.html).

Extensive testing was also completed on most other components, visible in [__test__](./frontend/__test__/test_components/)

Group Members: Antonio Chen, Brandon Wong, Justin Koida, Quinn Potter
