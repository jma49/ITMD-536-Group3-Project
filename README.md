# Continuous Integration and Code Quality Automation

This repository implements a Next.js application with a fully automated CI/CD pipeline. It integrates tools like ESLint, Prettier, CodeQL, and Vercel for deployment, ensuring code quality, security, and maintainability.

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

### CI/CD Pipeline

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

## Configuration

### Secrets

To ensure smooth operation, configure the following secrets in your GitHub repository:

1. **Navigate to Repository Settings**:
   - Go to the GitHub repository.
   - Click on **Settings** > **Secrets and variables** > **Actions** > **New repository secret**.

2. **Add the Following Secrets**:
   - `API_KEY`: The API key for external services.
   - `MONGDB_URI`: The MongoDB connection string for database access.
   - `DISCORD_WEBHOOK_URL`: Webhook URL for Discord notifications.
   - `VERCEL_PROJECT_DOMAIN`: Domain name of your Vercel project.
   - `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`: Vercel organization and project IDs.
   - `VERCEL_TOKEN`: Token for Vercel deployments (optional if using the `vercel` CLI).

3. **Example Setup for `MONGDB_URI`**:
   - The MongoDB connection string should be in the following format:
     ```plaintext
     mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority
     ```
   - Replace `<username>`, `<password>`, and `<database>` with your actual MongoDB credentials.

4. **Example Setup for `API_KEY`**:
   - Ensure the external service or API provides the necessary key, and paste it as the value of the `API_KEY` secret.

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
