import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-4 py-12">
      {/* Hero Section */}
      <section className="max-w-2xl text-center mb-16">
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={120}
          height={32}
          className="mx-auto mb-6 dark:invert"
        />
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Next.js SaaS Template</h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-6">
          A modern, scalable starter kit for building SaaS applications with authentication, subscriptions, and a beautiful UI.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
          >
            Get Started
          </a>
          <a
            href="/pricing"
            className="bg-white border border-blue-600 text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-50 transition"
          >
            View Pricing
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-4xl w-full mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-lg mb-2">Authentication</h3>
            <p className="text-gray-600">Secure sign up, login, and password reset using Supabase Auth.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-lg mb-2">Subscriptions</h3>
            <p className="text-gray-600">Stripe-powered payments with multiple pricing tiers and webhook-driven subscription management.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-lg mb-2">Modern UI</h3>
            <p className="text-gray-600">Responsive, accessible design built with TailwindCSS and shadcn/ui components.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-3xl w-full mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
        <ol className="list-decimal list-inside space-y-4 text-gray-700">
          <li>
            <b>Sign Up:</b> Users create an account using Supabase Auth.
          </li>
          <li>
            <b>Choose a Plan:</b> Users select a subscription on the Pricing page and complete payment through Stripe Checkout.
          </li>
          <li>
            <b>Access Dashboard:</b> After payment, users are redirected to their dashboard where subscription status is verified.
          </li>
          <li>
            <b>Subscription Management:</b> Stripe webhooks keep user subscription data in sync with the database.
          </li>
        </ol>
      </section>

      {/* Technologies Used Section */}
      <section className="max-w-2xl w-full mb-8">
        <h2 className="text-2xl font-bold text-center mb-8">Technologies Used</h2>
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <span className="bg-gray-100 px-4 py-2 rounded text-gray-800 font-medium">Next.js 15</span>
          <span className="bg-gray-100 px-4 py-2 rounded text-gray-800 font-medium">Supabase</span>
          <span className="bg-gray-100 px-4 py-2 rounded text-gray-800 font-medium">Stripe</span>
          <span className="bg-gray-100 px-4 py-2 rounded text-gray-800 font-medium">TailwindCSS</span>
          <span className="bg-gray-100 px-4 py-2 rounded text-gray-800 font-medium">TypeScript</span>
        </div>
      </section>

      <footer className="text-gray-500 text-center mt-8 text-sm">
        &copy; {new Date().getFullYear()} Next.js SaaS Template. Built by FrancoAmicone.
      </footer>
    </div>
  );
}
