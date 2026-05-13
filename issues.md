
# Project Audit Report

## Critical Issues

| ID | File | Issue | Impact |
|---|---|---|---|
| **C-01** | `backend/src/controllers/authController.js` | **Insecure Password Hashing (SHA256)** | Passwords are hashed using a single iteration of SHA256 without a salt. This is highly vulnerable to rainbow table and brute-force attacks. A compromised database would likely lead to all user passwords being cracked quickly. |
| **C-02** | `backend/src/controllers/authController.js` | **Insecure `secure: false` Cookie Flag** | The `refreshToken` is set with `secure: false`, allowing it to be sent over unencrypted HTTP. In a production environment, this would expose the refresh token to network sniffing, enabling account hijacking. |
| **C-03** | `backend/src/utils/jwt.js` | **Shared Secret for Access and Refresh Tokens** | Both access and refresh tokens are signed with the same `JWT_SECRET`. If the secret is compromised, an attacker can forge both types of tokens. Best practice is to use separate, asymmetric keys (RS256) or at least different symmetric secrets. |
| **C-04** | `Multiple Files` | **Extensive Use of In-Memory Mocks** | Most controllers (`attendance`, `employee`, `grn`, `inventory`, `journal`, `leave`, `payroll`) use in-memory arrays as mock databases. Data is not persisted, making the application non-functional for real-world use. This indicates the application is in a very early, incomplete development stage. |
| **C-05** | `backend/src/config/config.js` | **Sensitive Information in Environment Variables** | `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`, and `GOOGLE_ACCESS_TOKEN` are stored in environment variables. While better than hardcoding, this is still risky on shared servers. A proper secrets management solution (like HashiCorp Vault or AWS Secrets Manager) is recommended for production. |

## High Priority Issues

| ID | File | Issue | Impact |
|---|---|---|---|
| **H-01** | `backend/src/controllers/authController.js` | **No Password Strength Enforcement** | The registration endpoint does not enforce any password complexity rules (length, character types, etc.). This allows users to set weak, easily guessable passwords, increasing the risk of unauthorized access. |
| **H-02** | `backend/src/controllers/authController.js` | **No Rate Limiting** | There is no rate limiting on critical endpoints like `/login`, `/register`, or `/resend-otp`. This makes the application vulnerable to brute-force attacks, credential stuffing, and OTP spamming, which can lead to unauthorized access or high operational costs (e.g., email sending fees). |
| **H-03** | `backend/src/middleware/auth.middleware.js` | **Insufficient Authorization Checks** | The `authMiddleware` only verifies the JWT's validity. It does not perform any role-based or permission-based checks. Any logged-in user can potentially access any route protected by this middleware, regardless of their role. |
| **H-04** | `backend/src/controllers/authController.js` | **OTP Stored as Hash Without Expiry** | OTPs are hashed and stored but do not have a TTL (Time To Live) index in the Mongoose schema. While they are deleted after use, they may persist indefinitely if unused, slightly increasing the attack surface. |
| **H-05** | `frontend/src/store/useAuthStore.ts` | **Access Token Stored in Local Storage** | The JWT access token is stored in `localStorage`. This makes it accessible to any third-party script running on the page, making the application vulnerable to XSS attacks that can steal the token and impersonate the user. |
| **H-06** | `backend/src/models/supplyChain/GoodsReciept.js` | **Missing `PurchaseOrder` Model Definition** | The `GoodsReciept` model references a `PurchaseOrder` model that is not defined anywhere in the codebase. This will cause runtime errors and prevent GRN-related functionality from working. |

## Medium Priority Issues

| ID | File | Issue | Impact |
|---|---|---|---|
| **M-01** | `frontend/app/auth/login/page.tsx` | **Inline Styles and Manual Event Handlers** | The component heavily uses inline `style` objects and manual `onFocus`/`onBlur`/`onMouseEnter` handlers for styling. This is a bad practice in React/Next.js. It makes the code harder to read, maintain, and prevents proper theming and reuse. Tailwind CSS classes or CSS-in-JS solutions should be used instead. |
| **M-02** | `backend/src/index.js` | **Generic Global Error Handler** | The global error handler logs the error message to the console but returns a generic "Internal Server Error" message to the client in production. This can hide the root cause of issues, making debugging difficult. It should provide a unique error ID for correlation. |
| **M-03** | `Multiple Files` | **Inconsistent Naming Conventions** | There are inconsistencies in file and variable naming (e.g., `employeecontroller.js` vs. `authController.js`, `inventorymock.js` vs. `employeeMock.js`, `attendence.js` vs. `attendanceController.js`). This makes the codebase harder to navigate and understand. |
| **M-04** | `backend/src/controllers/` | **Lack of Input Validation** | Most controllers perform only basic checks for the presence of required fields. There is no comprehensive input validation (e.g., checking data types, ranges, formats). This can lead to data integrity issues, unexpected errors, and potential security vulnerabilities (e.g., NoSQL injection). |
| **M-05** | `frontend/app/auth/login/page.tsx` | **No Form Validation Library** | The login form uses basic `required` attributes. A dedicated form management library (like `react-hook-form` with `zod` for validation) would provide a better user experience, more robust validation, and cleaner code. |
| **M-06** | `frontend/app/layout.tsx` | **Missing SEO and Accessibility Basics** | The root layout is very minimal. It's missing key accessibility attributes (e.g., `main` tag), and advanced SEO optimizations (like structured data, canonical URLs, etc.). The font loading strategy could also be optimized. |
| **M-07** | `backend/src/models/hr/*.js` | **Use of `require` in ES Module Project** | The Mongoose models in the `hr` and `supplyChain` directories use `require`, while the rest of the backend project uses ES Modules (`import`/`export`). This inconsistency can lead to unexpected behavior and should be unified. |

## Low Priority Issues

| ID | File | Issue | Impact |
|---|---|---|---|
| **L-01** | `backend/package.json` | **Outdated Dependencies** | Some dependencies like `dotenv` and `cookie-parser` are not the latest versions. While not critical, keeping dependencies up-to-date is important for security and performance. |
| **L-02** | `frontend/package.json` | **Outdated Dependencies** | `next`, `react`, `@tanstack/react-query` and other packages are not on the latest versions. This can prevent access to new features, performance improvements, and security patches. |
| **L-03** | `backend/src/index.js` | **Console Logging in Production** | The application uses `console.log` and `console.error` for logging. In a production environment, a structured logger (like Winston or Pino) should be used to log to files or a logging service, with configurable log levels. |
| **L-04** | `frontend/app/auth/login/page.tsx` | **Hardcoded Strings** | UI strings like "Email Address", "Password", etc., are hardcoded. For future internationalization (i18n), these should be extracted into a translation management system. |
| **L-05** | `Multiple Files` | **Missing Comments and Documentation** | Many complex parts of the application, especially in the backend services and controllers, lack comments explaining the business logic. This increases the learning curve for new developers. |
| **L-06** | `backend/.env` | **Missing `.env.example` File** | There is no `.env.example` file in the backend directory, which makes it difficult for new developers to know which environment variables are required to run the project. |

## Suggested Improvements

- **Refactor Authentication**: Immediately replace SHA256 with a modern, salted, and peppered hashing algorithm like **Argon2** or **bcrypt**. Use separate secrets or asymmetric keys for access and refresh tokens.
- **Implement a Secret Management Solution**: For production, integrate a service like **HashiCorp Vault** or a cloud provider's equivalent to manage sensitive secrets.
- **Complete the Data Layer**: Remove all mock data sources and connect all controllers and services to the defined Mongoose models. Implement the missing `PurchaseOrder` model.
- **Add Role-Based Access Control (RBAC)**: Enhance the `authMiddleware` to check user roles and permissions against the required permissions for each endpoint.
- **Introduce Input Validation**: Use a library like `Joi` or `Zod` on the backend to create and enforce validation schemas for all incoming request bodies.
- **Improve Frontend State Management**: Store the access token in memory and use the `httpOnly` refresh token to silently re-authenticate when the app loads or the access token expires. This mitigates XSS risks.
- **Refactor Frontend Components**: Replace all inline styles and manual event handlers with Tailwind CSS utility classes or a consistent CSS-in-JS approach to improve maintainability and reusability.
- **Enhance Logging and Monitoring**: Integrate a structured logging library and set up an error tracking service (like Sentry or Datadog) to get better insights into application health.

## Overall Project Health Score

**25/100 (Early Development / Proof of Concept)**

The project is in a very early stage of development and is not ready for any form of production deployment. The "Critical" and "High" priority issues, particularly around security and the incomplete data layer, must be addressed before the project can be considered functional or secure. The frontend shows some modern practices but is marred by significant styling and state management issues. The backend has a decent structure but is critically flawed in its implementation of fundamental features like authentication and data persistence.
