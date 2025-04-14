# Next.js SaaS Template with Stripe and Supabase

## Project Overview

This project is a modern SaaS (Software as a Service) template built with Next.js, Supabase, and Stripe. It provides a robust foundation for launching subscription-based web applications with authentication, payment processing, and user management out of the box.

### Main Flows

- **Authentication**: Secure user sign-up, login, and password reset using Supabase Auth.
- **Subscription Management**: Users can choose from multiple pricing tiers and subscribe via Stripe Checkout. Webhooks handle subscription events (creation, payment, updates, cancellations) and sync subscription status with your Supabase database.
- **Dashboard**: After authentication and subscription, users access a protected dashboard area. Subscription status is checked to control access.
- **Marketing Pages**: Public pages (like Pricing) showcase your product and plans.

### Technologies Used
- **Next.js 15 (App Router)** for full-stack React app development
- **Supabase** for authentication, database, and backend
- **Stripe** for payment processing and subscription management
- **TailwindCSS** for modern, responsive UI
- **TypeScript** for type safety

---

A complete starter kit for building SaaS applications with Next.js, Supabase, and Stripe. This template provides everything you need to build, launch, and scale your SaaS business.

## Features

- **Authentication** - Complete authentication system with Supabase, including sign up, login, and password reset
- **Payments** - Stripe integration for subscription payments, including checkout and webhook handling
- **User Management** - Complete user profile management with subscription status tracking
- **Modern UI** - Beautiful, responsive UI built with TailwindCSS and shadcn/ui components
- **TypeScript** - Type-safe code with TypeScript
- **Vercel Ready** - Ready to deploy on Vercel with minimal configuration
- **OpenAI Integration** - Ready to use OpenAI API for AI-powered features

## OpenAI Integration

Este template incluye una utilidad para consumir la API de OpenAI fácilmente desde `/src/lib/openai.ts`.

### Configuración

Agrega tu clave de API de OpenAI en el archivo `.env.local`:

```env
OPENAI_API_KEY=tu-clave-de-openai
```

### Ejemplo de uso

```typescript
import { getCompletion } from "@/lib/openai";

const completion = await getCompletion({
  prompt: "Dame 5 ideas de negocio SaaS innovadoras",
});
console.log(completion);
```

## Tech Stack

- **Frontend & Backend**: [Next.js 14](https://nextjs.org/) (App Router)
- **Authentication & Database**: [Supabase](https://supabase.com/)
- **Payments**: [Stripe](https://stripe.com/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Deployment**: [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Stripe account

### Setup

1. Clone this repository
   ```bash
   git clone https://github.com/yourusername/next-saas-template.git
   cd next-saas-template
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
   SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>

   # Stripe
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

   # OpenAI
   OPENAI_API_KEY=<your-openai-key>

   # App
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. Set up your Supabase database using the schema in `supabase-schema.sql`

5. Start the development server
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Supabase Setup

1. Create a new project on [Supabase](https://supabase.com/)
2. Go to the SQL editor and run the queries from `supabase-schema.sql`
3. Set up authentication providers in the Auth settings
4. Get your API keys from the API settings

### Stripe Setup

1. Create an account on [Stripe](https://stripe.com/)
2. Create products and prices in the Stripe dashboard
3. Update the price IDs in `src/app/(marketing)/pricing/page.tsx`
4. Set up webhooks for local development:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

## Project Structure

```
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── (auth)/      # Authentication pages
│   │   ├── (dashboard)/ # Dashboard pages
│   │   ├── (marketing)/ # Marketing pages
│   │   ├── api/         # API routes
│   │   └── layout.tsx   # Root layout
│   ├── components/      # Reusable components
│   └── lib/             # Utility functions
├── supabase-schema.sql  # Database schema
├── .env.example         # Example environment variables
└── ENV_SETUP.md         # Environment setup guide
```

## Customization

### Pricing Plans

Update the pricing tiers in `src/app/(marketing)/pricing/page.tsx` with your own plans and prices.

### Branding

Update the branding in the navbar and other components to match your own brand.

### Subscription Features

Modify the subscription features and access control based on your specific SaaS product.

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Create a new project on [Vercel](https://vercel.com/)
3. Connect your GitHub repository
4. Add all environment variables from `.env.local` to the Vercel project settings
5. Deploy!

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Stripe](https://stripe.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
