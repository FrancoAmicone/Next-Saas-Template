# Environment Variables Setup

Create a `.env.local` file in the root of your project with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## How to get these values

### Supabase
1. Create a project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API
3. Copy the URL, anon key, and service role key

### Stripe
1. Create an account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard > Developers > API keys
3. For the webhook secret, use the Stripe CLI:
   ```
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

### App URL
- For local development: `http://localhost:3000`
- For production: Your deployed app URL (e.g., `https://your-app.vercel.app`)

## Vercel Deployment
When deploying to Vercel, add all these environment variables in the Vercel project settings.
