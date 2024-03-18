<a href="https://webposterlab.com">
  <h1 align="center">Webposter Lab</h1>
</a>

<p align="center">
  An open-source AI powered "Webposter" generator.
</p>

# Introduction

Webposter Lab is an free to use open-source Webposter generator powered by [Teampilot AI](https://teampilot.ai).
Webposters are unique movie poster like posters themed to your website.

# Examples

| [![Astro Build example](https://webposterlab.com/examples/astro-build.webp)](https://astro.build) | [![Discord example](https://webposterlab.com/examples/discord.webp)](https://discord.com) | [![Sodefa example](https://webposterlab.com/examples/sodefa.webp)](https://sodefa.de) |
| :-----------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
|                                [astro.build](https://astro.build)                                 |                            [discord.com](https://discord.com)                             |                            [sodefa.de](https://sodefa.de)                             |

# Motivation

Webposter Lab was created as a fun project to explore the possibilities of [Teampilot AI](https://teampilot.ai) as a Development Platform and to create something that is useful for the community.

# Get it running locally

Webposter Lab is a [Next.js](https://nextjs.org/) app. To get it running locally, clone the repository and install the dependencies with:

```bash
npm install
```

The poster generator in itself is powered by [Teampilot AI](https://teampilot.ai). To get it running locally, you need to create an account at [Teampilot AI](https://teampilot.ai) and copy the launchpad [here](https://teampilot.ai/copy/webposter-generator-447ed332ce54fc588f4a558eaac4e469). Then make the launchpad public, safe the launchpad and copy the Launchpad ID in you env file.

```bash
# .env.local
LAUNCHPAD_ID=YOUR_LAUNCHPAD_ID
```

You can then start the development server with:

```bash
npm run dev
```

# Database Configuration

This project uses SQLite hosted on Turso. If you want to leverage database features such as the explore section on the landing page and og images, you'll need to set up Prisma. The existing `schema.prisma` file is already configured to work with SQLite.

To set up the database, add your Turso database URL and Turso authentication token to your environment file as follows:

```bash
# .env.local
TURSO_DATABASE_URL=YOUR_TURSO_DATABASE_URL
TURSO_AUTH_TOKEN=YOUR_TURSO_AUTH_TOKEN
```

A detailed guide on how to set up Prisma with SQLite on Turso can be found at https://www.prisma.io/docs/orm/overview/databases/turso

You can easily switch to any other database by modifying the settings in the `schema.prisma` and `db.ts` files.

Webposters will only appear in the explore section if they have been stored in the database and approved by you. You can approve webposters in the /admin page. To access this page, you'll need a secret key, which can be any string you choose. Add this secret key to your env file. Afterwards, you can access the admin page at /admin?secret=YOUR_SECRET.

```bash
# .env.local
ADMIN_SECRET=MY_SUPER_SECURE_SECRET_KEY
```
