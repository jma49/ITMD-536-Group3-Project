
---

# **Continuous Integration and Code Quality Automation**

This repository implements a **Next.js** application with a fully automated CI/CD pipeline. It integrates tools like ESLint, Prettier, CodeQL, and Vercel for deployment, ensuring code quality, security, and maintainability.

---

## **Features**
- **Next.js Framework**: A React-based framework optimized for server-side rendering and static site generation.
- **CI/CD Integration**: Automatically builds, tests, and deploys the application.
- **Code Quality**:
  - **ESLint**: Ensures coding standards are met.
  - **Prettier**: Formats code for readability.
  - **CodeQL**: Performs security scans to detect vulnerabilities.
- **Notifications**: Build, lint, and analysis results are sent to a Discord channel for real-time updates.
- **Deployment**: Automatically deploys the application to **Vercel**.

---

## **Getting Started**

### **1. Clone the Repository**
```bash
git clone https://github.com/username/repository.git
cd repository
```

### **2. Install Dependencies**
Ensure you have Node.js (v18.18.0 or later) installed, then run:
```bash
npm install
```

### **3. Run the Development Server**
Start the local development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

You can edit the main page in `app/page.tsx`. The application will auto-update as you save changes.

### **4. Additional Commands**
- **Run ESLint**: Check for linting errors.
  ```bash
  npm run lint
  ```
- **Run Tests**: Ensure application integrity.
  ```bash
  npm run test
  ```
- **Build Application**: Generate a production build.
  ```bash
  npm run build
  ```

---

## **Workflows Overview**

### **1. CI/CD Pipeline**
This workflow handles the building, testing, and deployment of the application.

#### **Trigger**
- Push to the `main` branch.

#### **Steps**
1. **Code Checkout**: Clones the repository.
2. **Install Dependencies**: Installs project requirements.
3. **Run Tests**: Executes unit tests.
4. **Build and Deploy**: Deploys the application to **Vercel**.
5. **Discord Notifications**:
   - On failure: Sends an error message with a link to the logs.
   - On success: Confirms successful deployment and provides a link to the deployed site.

### **2. ESLint**
This workflow ensures coding standards and consistent formatting.

#### **Trigger**
- Push or pull requests to the `main` branch.
- Scheduled to run weekly on Fridays.

#### **Steps**
1. Installs ESLint and Prettier dependencies.
2. Runs linting and formatting checks.
3. Uploads results as SARIF to GitHub Code Scanning.
4. Sends Discord notifications with results.

### **3. CodeQL Analysis**
This workflow performs static analysis to detect vulnerabilities in the codebase.

#### **Trigger**
- Push or pull requests to the `main` branch.
- Scheduled to run weekly on Wednesdays.

#### **Steps**
1. Initializes CodeQL for the specified language (e.g., JavaScript/TypeScript).
2. Runs CodeQL analysis to detect security vulnerabilities.
3. Uploads results to GitHub Code Scanning Alerts.
4. Sends Discord notifications with analysis results.

---

## **Notifications**

Discord notifications are integrated into each workflow:
- **Failure**: Sends an error message with:
  - Repository name
  - Branch
  - Commit hash
  - Author
  - Link to CI/CD logs
- **Success**: Confirms successful execution with:
  - Repository name
  - Branch
  - Commit hash
  - Author
  - Link to deployment or logs

To configure notifications, set up the `DISCORD_WEBHOOK_URL` as a secret in the repository settings.

---

## **Deployment**

This project is deployed on **Vercel**, a platform optimized for serverless Next.js applications.

### **Automatic Deployment**
Pushing to the `main` branch triggers the CI/CD workflow, which builds and deploys the application to Vercel.

### **Manual Deployment**
To manually deploy, run the following command:
```bash
vercel --prod
```

For more details, refer to the [Next.js Deployment Documentation](https://nextjs.org/docs/app/building-your-application/deploying).

---

## **Configuration**

### **Secrets**
Ensure the following secrets are configured in your repository:
- `DISCORD_WEBHOOK_URL`: Webhook URL for Discord notifications.
- `VERCEL_PROJECT_DOMAIN`: Domain name of your Vercel project.
- `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`: Vercel organization and project identifiers.
- `VERCEL_TOKEN`: Token for Vercel deployments (optional if using `vercel` CLI).

---

## **Learn More**

To dive deeper into the tools and technologies used:
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [ESLint Documentation](https://eslint.org/docs/latest/) - Understand linting rules and configurations.
- [CodeQL Documentation](https://docs.github.com/en/code-security/code-scanning/using-codeql-code-scanning) - Learn about CodeQL security analysis.
- [Vercel Documentation](https://vercel.com/docs) - Get started with Vercel deployments.

---

## **Contributing**

We welcome contributions to improve this project. To contribute:
1. Fork the repository.
2. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes with a clear message:
   ```bash
   git commit -m "Add your feature or fix description"
   ```
4. Push your branch and create a pull request:
   ```bash
   git push origin feature/your-feature
   ```

---

## **License**

This project is licensed under the [MIT License](LICENSE).

---

## **Contact**

For questions or feedback, contact the repository maintainer:
- **Name**: Jincheng Ma
- **Email**: jma49@hawk.iit.edu
- **GitHub**: https://github.com/jma49/ITMD-536-Group3-Project

---

