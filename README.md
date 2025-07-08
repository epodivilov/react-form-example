# React Passwordless Authentication Form

A minimal passwordless authentication form built with React and TypeScript. This project demonstrates a modern, user-friendly authentication approach that eliminates the need for passwords while maintaining security.

## Why Passwordless?

Passwordless authentication provides the most convenient user experience by:

- Eliminating password management complexity
- Reducing user friction during login
- Improving security by removing password-related vulnerabilities
- Providing seamless access through email verification

## Demo

View the live demo at: [GitHub Pages](https://epodivilov.github.io/react-form-example)

## Test Configuration

For testing purposes, the following email addresses will return validation errors:

- `error@example.com`
- `invalid@test.com`
- `fail@demo.com`

The verification code is always `123456` for all successful email submissions.

**Note:** In a production environment, email validation and code generation would be handled server-side with proper security measures.

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```
