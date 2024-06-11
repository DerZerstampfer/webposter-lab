<a href="https://webposterlab.com">
  <h1 align="center">Webposter Lab</h1>
</a>

<p align="center">
  An open-source AI powered "Webposter" generator.
</p>

# Introduction

Webposter Lab is an free to use open-source Webposter generator powered by [Teampilot AI](https://teampilot.ai/dev).
Webposters are unique movie poster like posters themed to your website.

# Examples

| [![Astro Build example](https://webposterlab.com/examples/astro-build.webp)](https://astro.build) | [![Discord example](https://webposterlab.com/examples/discord.webp)](https://discord.com) | [![Sodefa example](https://webposterlab.com/examples/sodefa.webp)](https://sodefa.de) |
| :-----------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
|                                [astro.build](https://astro.build)                                 |                            [discord.com](https://discord.com)                             |                            [sodefa.de](https://sodefa.de)                             |

# Motivation

Webposter Lab was created as a fun project to explore the possibilities of [Teampilot AI](https://teampilot.ai/dev) as a Development Platform and to create something that is useful for the community.

# Get it running locally

Webposter Lab is a [Next.js](https://nextjs.org/) app. To get it running locally, clone the repository and install the dependencies with:

```bash
npm install
```

or

```bash
pnpm install
```

The poster generator in itself is powered by [Teampilot AI](https://teampilot.ai/dev). To get it running locally, you need to create an account at [Teampilot AI](https://teampilot.ai/start) (you get one free team which is has everything included that you need to power this app, no credit card needed) and copy the launchpad [here](https://teampilot.ai/copy/webposter-generator-447ed332ce54fc588f4a558eaac4e469).

**Note**: At the time of writing, the launchpad needs the DALL E 3 function which currently is in Beta, so you need to signup for the Beta at [Beta Signup](https://teampilot.ai/start/beta) to use this launchpad.

Then make the launchpad public, save the launchpad and copy the Launchpad ID into your env file.

```bash
# .env.local
LAUNCHPAD_ID=YOUR_LAUNCHPAD_ID
```

If you want to know more about how to use the Teampilot SDK and how Teampilot works, head to the [Teampilot AI Documentation](https://docs.teampilot.ai/).

You can then start the development server with:

```bash
npm run dev
```

or

```bash
pnpm dev
```

# Database Configuration

This project uses SQLite hosted on Turso. If you want to leverage database features such as the explore section on the landing page and og images, you'll need to set up Prisma. The existing `schema.prisma` file is already configured to work with SQLite.

To set up the database, create a database at [Turso](https://turso.tech/), add your database URL and Turso authentication token to your environment file as follows:

```bash
# .env.local
TURSO_DATABASE_URL=YOUR_TURSO_DATABASE_URL
TURSO_AUTH_TOKEN=YOUR_TURSO_AUTH_TOKEN
```

A detailed guide on how to set up Prisma with SQLite on Turso can be found at https://www.prisma.io/docs/orm/overview/databases/turso

You can easily switch to any other database by modifying the settings in the `schema.prisma` and `db.ts` files.

## Explore Section

Webposters will only appear in the explore section if they have been stored in the database and have been approved by you. You can approve Webposters in the /admin page. To access this page, you'll need a secret key, which can be any string you choose. Add this secret key to your env file. Afterwards, you can access the admin page at /admin?secret=YOUR_SECRET.

```bash
# .env.local
ADMIN_SECRET=YOUR_SECRET
```

# Enabling Regeneration Feature

The generated Webposters may not meet expectations at all times. Therefore, there is a feature that allows users to regenerate their Webposter if they are dissatisfied with the current one.

**Important:** When you generate a new Webposter, a toast notification will appear with a "Regenerate" button. Please note that if the tab is closed or the toast notification is dismissed, the option to regenerate the Webposter will no longer be available. Moreover, regeneration is not possible if the Webposter displayed was not generated in the current session but was instead retrieved from the cache.

To enable this feature, you must configure a JWT secret in your environment file. This can be any random string. Feel free to just smash your keyboard or use a command like `openssl rand -base64 64` in your terminal, which generates a secure random string.

```bash
# .env.local
JWT_SECRET=YOUR_SECURE_JWT_SECRET
```
