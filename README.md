<div align="center">

# Pixie - Url Shortener

<a href="https://pixie-link.vercel.app">
<img src="public/web-screenshot.png">
</a>

![next.js](https://img.shields.io/badge/Next.js-15.1.3-black?style=for-the-badge&logo=next.js)
![tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-blue?style=for-the-badge&logo=tailwind-css)
![prisma](https://img.shields.io/badge/Prisma-16A394?style=for-the-badge&logo=prisma)
![postgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

</div>

## ✨ What is Pixie?

**Pixie** is a lightweight, modern URL shortener that transforms long URLs into short, shareable links with magical simplicity. Built for both anonymous users who need quick link shortening and authenticated users who want comprehensive link management, Pixie offers an intuitive experience across all devices.

Pixie is powered by a carefully selected stack of modern web technologies that ensure performance, scalability, and developer experience:

**Frontend Framework**

- **Next.js 15** with App Router for server-side rendering and optimal performance
- **React 19** with TypeScript for type-safe component development

**UI & Design System**

- **TailwindCSS** for utility-first styling with dark mode support
- **shadcn/ui** components built on Radix UI primitives for accessibility

**Authentication & Database**

- **NextAuth.js v5** (beta) for OAuth authentication with Google and GitHub providers
- **Prisma ORM** for type-safe database operations
- **PostgreSQL** as the primary database (inferred from Prisma setup)

## 🎯 Page Functionalities

**Core Features:**

- ✅ Anonymous link creation on homepage
- ✅ User authentication with Google and GitHub
- ✅ Authenticated link management
- ✅ Link editing and deletion
- ✅ Click tracking and analytics

**Dashboard Features:**

- ✅ Create new short URLs with custom aliases
- ✅ Grid and list view modes
- ✅ Sort links by date, clicks, or short URL
- ✅ Copy short links and QR codes
- ✅ Link association for anonymous users after login

**Homepage Features:**

- ✅ Instant URL shortening without registration
- ✅ Local storage persistence for anonymous links
- ✅ One-click copy functionality

## 🚀 Getting Started

**Requirements:**

- [x] [Node.js](https://nodejs.org) (+v18.x) installed.
- [x] [pnpm](https://pnpm.io) installed.
- [x] [Visual Studio Code](https://code.visualstudio.com) with recommended extensions.

**Steps:**

1. [Fork](https://github.com/jntellez/pixie/fork) this project.

2. Clone the repository:

```bash
git clone https://github.com/@username/pixie.git
```

3. Install dependencies:

```bash
# Install pnpm globally if you don't have it:
npm install -g pnpm

# Install dependencies:
pnpm install
```

4. Create a **.env** file with the following content:

```bash
# Database
DATABASE_URL="your-postgresql-url-here"

# NextAuth.js
AUTH_SECRET="your-auth-secret-here"

# GitHub Provider
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Google Provider
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# App URL
NEXT_PUBLIC_PAGE_URL="http://localhost:3000"
```

**Database Setup:**

- Use [Neon](https://neon.tech/) or [Supabase](https://supabase.com/) which are supported on Vercel.
- Update the `DATABASE_URL` with your database credentials from your chosen provider.

**Authentication Setup:**

- [Get NextAuth.js **Secret**](https://authjs.dev/getting-started/installation#setup-environment).
- [Create GitHub OAuth App](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app).
- [Create Google OAuth 2.0 App](https://developers.google.com/identity/protocols/oauth2).

5. Set up the database:

```bash
# Generate Prisma client
pnpm dlx prisma generate

# Run database migrations
pnpm dlx prisma db push
```

6. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser 🚀

## ✌️ Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
