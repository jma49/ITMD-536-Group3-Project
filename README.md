# Continuous Integration and Code Quality Automation

This repository implements a Next.js application with a fully automated CI/CD pipeline. It integrates tools like ESLint, Prettier, CodeQL, and Vercel for deployment, ensuring code quality, security, and maintainability.

---

## Table of Contents
1. [Features](#features)
2. [Getting Started](#getting-started)
3. [Commands](#commands)
4. [Workflows Overview](#workflows-overview)
   - [CICD Pipeline](#cicd-pipeline)
   - [ESLint](#eslint)
   - [CodeQL Analysis](#codeql-analysis)
   - [End-to-End Testing (Cypress)](#end-to-end-testing-cypress)
5. [Secrets and Environment Variables](#secrets-and-environment-variables)
6. [Notifications](#notifications)
7. [Deployment](#deployment)
8. [Debugging CI/CD Failures](#debugging-cicd-failures)
9. [Learn More](#learn-more)
10. [Contributing](#contributing)
11. [License](#license)
12. [Contact](#contact)

---

## Features

- **Next.js Framework**: React-based framework optimized for server-side rendering and static site generation.
- **CI/CD Integration**: Automatically builds, tests, and deploys the application.
- **Code Quality Tools**:
  - **ESLint**: Enforces coding standards.
  - **Prettier**: Formats code for better readability.
  - **CodeQL**: Performs security scans to detect vulnerabilities.
- **End-to-End Testing**: Uses Cypress for comprehensive UI and application flow testing.
- **Notifications**: Real-time updates on build, lint, and analysis results via Discord.
- **Deployment**: Automated deployment to Vercel.

---

## Getting Started

### Clone the Repository
```bash
git clone https://github.com/username/repository.git
cd repository
```

### Install Dependencies
Ensure you have Node.js (v18.18.0 or later) installed, then run:
```bash
npm install
```

### Run the Development Server
Start the server locally:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
Visit [http://localhost:3000](http://localhost:3000) to view the application.

You can edit the main page in `app/page.tsx`. Changes are applied automatically.

---

## Commands

- **Run ESLint**: Check for linting errors.
  ```bash
  npm run lint
  ```
- **Run Unit Tests**: Verify application integrity.
  ```bash
  npm run test
  ```
- **Run End-to-End Tests**: Use Cypress to test application flow.
  ```bash
  npm run e2e
  ```
- **Build for Production**: Generate a production build.
  ```bash
  npm run build
  ```

---

## Workflows Overview

### CICD Pipeline

#### Trigger
- Push to the `main` branch.

#### Steps
1. Clone the repository.
2. Install dependencies.
3. Run unit tests.
4. Execute Cypress end-to-end tests.
5. Build and deploy to Vercel.

#### Notifications
- **On Failure**: Error details with a link to logs.
- **On Success**: Deployment confirmation with a link to the deployed site.

---

### ESLint

#### Trigger
- Push or pull requests to `main`.
- Weekly schedule on Fridays.

#### Steps
1. Install ESLint and Prettier.
2. Perform linting and formatting checks.
3. Upload results as SARIF to GitHub Code Scanning.
4. Notify via Discord.

---

### CodeQL Analysis

#### Trigger
- Push or pull requests to `main`.
- Weekly schedule on Wednesdays.

#### Steps
1. Initialize CodeQL for JavaScript/TypeScript.
2. Run security analysis.
3. Upload alerts to GitHub Code Scanning.
4. Notify via Discord.

---

### End-to-End Testing (Cypress)

#### Trigger
- Push or pull requests to `main`.

#### Steps
1. Install Cypress.
2. Run Cypress tests.
3. Upload results to GitHub Actions.
4. Notify via Discord.

---

## Secrets and Environment Variables

To ensure smooth operation, configure the following secrets and environment variables in your GitHub Actions settings:

### Configuring Secrets in GitHub

1. **Navigate to Repository Settings**:
   - Go to the GitHub repository.
   - Click **Settings** > **Secrets and variables** > **Actions** > **New repository secret**.

2. **Add the Following Secrets**:
   - `API_KEY`:
     - **Description**: Your GitHub API key, required for accessing private repositories or interacting with GitHub APIs in workflows.
     - **Value**: Your GitHub Personal Access Token (PAT).
   - `MONGDB_URI`:
     - **Description**: MongoDB connection string for database access.
     - **Format**:
       ```plaintext
       mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority
       ```
       Replace `<username>`, `<password>`, and `<database>` with your MongoDB credentials.

3. **Verify Setup**:
   - Check the workflow `.yml` files to ensure the secrets are referenced correctly. For example:
     ```yaml
     env:
       API_KEY: ${{ secrets.API_KEY }}
       MONGDB_URI: ${{ secrets.MONGDB_URI }}
     ```

---

## Notifications

Discord notifications are integrated across workflows:

- **Failure**:
  - Repository name
  - Branch
  - Commit hash
  - Author
  - Link to logs
- **Success**:
  - Repository name
  - Branch
  - Commit hash
  - Author
  - Link to deployment/logs

Set the `DISCORD_WEBHOOK_URL` secret in the repository to enable notifications.

---

## Deployment

### Automatic Deployment
Pushing to `main` triggers the CI/CD pipeline to build and deploy the application to Vercel.

### Manual Deployment
```bash
vercel --prod
```
For more information, refer to the [Next.js Deployment Documentation](https://nextjs.org/docs).

---

## Debugging CI/CD Failures

### Common Errors and Solutions
1. **Build Failed**:
   - **Reason**: Missing dependencies.
   - **Solution**: Ensure `npm install` is included in the workflow.

2. **Linting Issues**:
   - **Reason**: Code does not follow ESLint rules.
   - **Solution**: Run `npm run lint` locally and fix the reported issues.

3. **Deployment Errors**:
   - **Reason**: Vercel token or domain not configured.
   - **Solution**: Check if `VERCEL_TOKEN` and `VERCEL_PROJECT_DOMAIN` secrets are correctly set.

4. **Database Connection Fails**:
   - **Reason**: Incorrect `MONGDB_URI` configuration.
   - **Solution**: Test the connection string locally before adding it to secrets.

---

## Learn More

Explore the tools and documentation:
- [Next.js Documentation](https://nextjs.org/docs)
- [ESLint Documentation](https://eslint.org/docs/latest/)
- [CodeQL Documentation](https://codeql.github.com/docs/)
- [Cypress Documentation](https://docs.cypress.io)
- [Vercel Documentation](https://vercel.com/docs)

---

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository.
2. Create a branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit changes:
   ```bash
   git commit -m "Description of feature or fix"
   ```
4. Push and open a pull request:
   ```bash
   git push origin feature/your-feature
   ```

---

## License

This project is licensed under the MIT License.

---

## Contact

For questions or feedback, contact:

- **Name**: Jincheng Ma
- **Email**: jma49@hawk.iit.edu
- **GitHub**: [https://github.com/jma49/ITMD-536-Group3-Project](https://github.com/jma49/ITMD-536-Group3-Project)
