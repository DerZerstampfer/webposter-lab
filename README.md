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

The poster generator in itself is powered by [Teampilot AI](https://teampilot.ai). To get it running locally, you need to create an account at [Teampilot AI](https://teampilot.ai) and copy the launchpad [here](https://teampilot.ai/copy/webposter-generator-447ed332ce54fc588f4a558eaac4e469).

```bash
# .env.local
LAUNCHPAD_ID=YOUR_LAUNCHPAD_ID
```

You can then start the development server with:

```bash
npm run dev
```

## Launchpad configuration

Required Functions:

- Get all links from a Web Page
- LLM on Website
- DALL·E 3 Image Generator

At time of writing, some functions are in beta, so you might have to request beta access at https://teampilot.ai/start/beta if you can't find all functions.

System Message: Can be found in the `system-message.txt` file in the root directory of this repository.

In order to get the launchpad ID, make the launchpad public and copy the ID that is then displayed under ID. (Important, in order to work the launchpad has to be public so don't change it back to private)
