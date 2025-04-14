#!/usr/bin/env node

/**
 * This script helps set up the environment variables for the Next.js SaaS template
 * Run with: node setup-env.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ENV_FILE_PATH = path.join(process.cwd(), '.env.local');

// Check if .env.local already exists
if (fs.existsSync(ENV_FILE_PATH)) {
  console.log('\x1b[33m%s\x1b[0m', '.env.local file already exists. Rename or delete it before running this script.');
  rl.close();
  process.exit(0);
}

console.log('\x1b[36m%s\x1b[0m', '=== Next.js SaaS Template Environment Setup ===');
console.log('This script will help you set up your environment variables.');
console.log('You will need:');
console.log('  1. Supabase project URL and keys');
console.log('  2. Stripe API keys');
console.log('  3. Your app URL (default: http://localhost:3000)');
console.log('\n');

const envVars = {
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: '',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: '',
  SUPABASE_SERVICE_ROLE_KEY: '',
  
  // Stripe
  STRIPE_SECRET_KEY: '',
  STRIPE_WEBHOOK_SECRET: '',
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: '',
  
  // App
  NEXT_PUBLIC_APP_URL: 'http://localhost:3000'
};

const questions = [
  {
    name: 'NEXT_PUBLIC_SUPABASE_URL',
    message: 'Enter your Supabase project URL (https://<your-project>.supabase.co):',
    default: '',
  },
  {
    name: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    message: 'Enter your Supabase anon key:',
    default: '',
  },
  {
    name: 'SUPABASE_SERVICE_ROLE_KEY',
    message: 'Enter your Supabase service role key:',
    default: '',
  },
  {
    name: 'STRIPE_SECRET_KEY',
    message: 'Enter your Stripe secret key (starts with sk_test_ or sk_live_):',
    default: '',
  },
  {
    name: 'STRIPE_WEBHOOK_SECRET',
    message: 'Enter your Stripe webhook secret (starts with whsec_):',
    default: '',
  },
  {
    name: 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    message: 'Enter your Stripe publishable key (starts with pk_test_ or pk_live_):',
    default: '',
  },
  {
    name: 'NEXT_PUBLIC_APP_URL',
    message: 'Enter your app URL:',
    default: 'http://localhost:3000',
  },
];

function askQuestion(index) {
  if (index >= questions.length) {
    writeEnvFile();
    return;
  }
  
  const question = questions[index];
  
  rl.question(`${question.message} ${question.default ? `(default: ${question.default})` : ''} `, (answer) => {
    envVars[question.name] = answer || question.default;
    askQuestion(index + 1);
  });
}

function writeEnvFile() {
  let envContent = '';
  
  // Add Supabase variables
  envContent += '# Supabase\n';
  envContent += `NEXT_PUBLIC_SUPABASE_URL=${envVars.NEXT_PUBLIC_SUPABASE_URL}\n`;
  envContent += `NEXT_PUBLIC_SUPABASE_ANON_KEY=${envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY}\n`;
  envContent += `SUPABASE_SERVICE_ROLE_KEY=${envVars.SUPABASE_SERVICE_ROLE_KEY}\n\n`;
  
  // Add Stripe variables
  envContent += '# Stripe\n';
  envContent += `STRIPE_SECRET_KEY=${envVars.STRIPE_SECRET_KEY}\n`;
  envContent += `STRIPE_WEBHOOK_SECRET=${envVars.STRIPE_WEBHOOK_SECRET}\n`;
  envContent += `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${envVars.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}\n\n`;
  
  // Add App variables
  envContent += '# App\n';
  envContent += `NEXT_PUBLIC_APP_URL=${envVars.NEXT_PUBLIC_APP_URL}\n`;
  
  // Write to .env.local file
  fs.writeFileSync(ENV_FILE_PATH, envContent);
  
  console.log('\x1b[32m%s\x1b[0m', '\n✅ Environment variables have been set up successfully!');
  console.log('\x1b[36m%s\x1b[0m', '\nNext steps:');
  console.log('1. Set up your Supabase database using the schema in supabase-schema.sql');
  console.log('2. Create products and prices in your Stripe dashboard');
  console.log('3. Update the price IDs in src/app/(marketing)/pricing/page.tsx');
  console.log('4. Run the development server with: npm run dev');
  
  rl.close();
}

// Start asking questions
askQuestion(0);
