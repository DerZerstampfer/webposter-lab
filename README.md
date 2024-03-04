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

If you want the database features (explore section on the landing page, og images, etc.) to work, you need to set up prisma. The current schema.prisma file is set up to use a mysql database. You can change the database settings in the schema.prisma file, follow the prisma documentation to do that.

If you want to stick to mysql you can then simply add you DATABASE_URL to you env file.

```bash
# .env.local
DATABASE_URL=YOUR_DATABASE_URL
```

Webposters are jsut shown in the explore section if they are in the database and if the have been accepted by you. You can accept webposters at the /admin page. To access that page you need a secter which you can set to whatever you want in the env file. You can then access the admin page at /admin?secret=YOUR_SECRET.

```bash
# .env.local
ADMIN_SECRET=YOUR_SECRET
```

## Launchpad configuration

Required Functions:

- Get all links from a Web Page
- LLM on Website
- DALL·E 3 Image Generator

At time of writing, some functions are in beta, so you might have to request beta access at https://teampilot.ai/start/beta if you can't find all functions.

System Message: Can be found in the `system-message.txt` file in the root directory of this repository.

In order to get the launchpad ID, make the launchpad public and copy the ID that is then displayed under ID. (Important, in order to work the launchpad has to be public so don't change it back to private)
