# SpinAI App

A TypeScript-based application that integrates AI capabilities using OpenAI and other AI services.

## Features

- AI-powered functionality using OpenAI
- Integration with HubSpot
- Modern TypeScript development setup
- Express.js backend
- Environment-based configuration

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key
- HubSpot access token

## Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd my-spinai-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`:
   ```bash
cp .env.example .env
```
   - Edit `.env` with your credentials:
   ```
   OPENAI_API_KEY="your-openai-api-key"
   HUBSPOT_ACCESS_TOKEN="your-hubspot-access-token"
   SHARED_CONTACT_ID="your-shared-contact-id"
   ```

## Development

### Running the Development Server

```bash
npm run dev
```

This will start the development server with hot-reloading enabled.

### Building for Production

```bash
npm run build
```

### Starting the Production Server

```bash
npm run start
```

## Project Structure

```
my-spinai-app/
├── src/              # Source code
├── .env              # Environment variables (copy from .env.example)
├── .env.example      # Example environment variables
├── package.json      # Project dependencies and scripts
├── tsconfig.json     # TypeScript configuration
└── mcp-config.ts     # Model Context Protocol configuration
```

## Available Scripts

- `npm run dev` - Start development server with hot-reloading
- `npm run build` - Build the project for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code formatting
- `npm run check-types` - Check TypeScript types

## Environment Variables

The following environment variables are required:

- `OPENAI_API_KEY` - Your OpenAI API key
- `HUBSPOT_ACCESS_TOKEN` - Your HubSpot access token
- `SHARED_CONTACT_ID` - Shared contact ID for HubSpot

## Technologies Used

- TypeScript
- Node.js
- Express.js
- OpenAI SDK
- HubSpot Integration
- ESLint for code linting

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

[Add contribution guidelines if applicable]
