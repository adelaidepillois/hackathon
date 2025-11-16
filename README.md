<a href="https://demo-nextjs-with-supabase.vercel.app/">
  <img alt="Next.js and Supabase Starter Kit - the fastest way to build apps with Next.js and Supabase" src="https://demo-nextjs-with-supabase.vercel.app/opengraph-image.png">
  <h1 align="center">Next.js and Supabase Starter Kit</h1>
</a>

<p align="center">
 The fastest way to build apps with Next.js and Supabase
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#demo"><strong>Demo</strong></a> ·
  <a href="#deploy-to-vercel"><strong>Deploy to Vercel</strong></a> ·
  <a href="#clone-and-run-locally"><strong>Clone and run locally</strong></a> ·
  <a href="#feedback-and-issues"><strong>Feedback and issues</strong></a>
  <a href="#more-supabase-examples"><strong>More Examples</strong></a>
</p>
<br/>

## Features

- Works across the entire [Next.js](https://nextjs.org) stack
  - App Router
  - Pages Router
  - Middleware
  - Client
  - Server
  - It just works!
- supabase-ssr. A package to configure Supabase Auth to use cookies
- Password-based authentication block installed via the [Supabase UI Library](https://supabase.com/ui/docs/nextjs/password-based-auth)
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Components with [shadcn/ui](https://ui.shadcn.com/)
- Optional deployment with [Supabase Vercel Integration and Vercel deploy](#deploy-your-own)
  - Environment variables automatically assigned to Vercel project

## Demo

You can view a fully working demo at [demo-nextjs-with-supabase.vercel.app](https://demo-nextjs-with-supabase.vercel.app/).

## Deploy to Vercel

Vercel deployment will guide you through creating a Supabase account and project.

After installation of the Supabase integration, all relevant environment variables will be assigned to the project so the deployment is fully functioning.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&project-name=nextjs-with-supabase&repository-name=nextjs-with-supabase&demo-title=nextjs-with-supabase&demo-description=This+starter+configures+Supabase+Auth+to+use+cookies%2C+making+the+user%27s+session+available+throughout+the+entire+Next.js+app+-+Client+Components%2C+Server+Components%2C+Route+Handlers%2C+Server+Actions+and+Middleware.&demo-url=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&demo-image=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2Fopengraph-image.png)

The above will also clone the Starter kit to your GitHub, you can clone that locally and develop locally.

If you wish to just develop locally and not deploy to Vercel, [follow the steps below](#clone-and-run-locally).

## Clone and run locally

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)

2. Create a Next.js app using the Supabase Starter template npx command

   ```bash
   npx create-next-app --example with-supabase with-supabase-app
   ```

   ```bash
   yarn create next-app --example with-supabase with-supabase-app
   ```

   ```bash
   pnpm create next-app --example with-supabase with-supabase-app
   ```

3. Use `cd` to change into the app's directory

   ```bash
   cd with-supabase-app
   ```

4. Rename `.env.example` to `.env.local` and update the following:

  ```env
  NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=[INSERT SUPABASE PROJECT API PUBLISHABLE OR ANON KEY]
  ```
  > [!NOTE]
  > This example uses `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, which refers to Supabase's new **publishable** key format.
  > Both legacy **anon** keys and new **publishable** keys can be used with this variable name during the transition period. Supabase's dashboard may show `NEXT_PUBLIC_SUPABASE_ANON_KEY`; its value can be used in this example.
  > See the [full announcement](https://github.com/orgs/supabase/discussions/29260) for more information.

  Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` can be found in [your Supabase project's API settings](https://supabase.com/dashboard/project/_?showConnect=true)

5. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   The starter kit should now be running on [localhost:3000](http://localhost:3000/).

6. This template comes with the default shadcn/ui style initialized. If you instead want other ui.shadcn styles, delete `components.json` and [re-install shadcn/ui](https://ui.shadcn.com/docs/installation/next)

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

## Feedback and issues

Please file feedback and issues over on the [Supabase GitHub org](https://github.com/supabase/supabase/issues/new/choose).

## More Supabase examples

- [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments)
- [Cookie-based Auth and the Next.js 13 App Router (free course)](https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF)
- [Supabase Auth and the Next.js App Router](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)

- ## Inspiration
Facing growing infobesity and the rapid spread of misinformation (fake news), we identified a lack of interactive learning tools to develop critical thinking among citizens, particularly young adults. Media and Information Literacy (MIL) education is often too theoretical. We wanted to create a platform that makes fact-checking and the recognition of cognitive biases as fast and addictive as using social media, drawing inspiration from popular gaming mechanics.

## What it does

The Detector is a gamified web platform designed to transform the user into a Critical Agent. The application provides practical challenges based on real or misleading information.

The game relies on two main formats:

The Fake Detector: A fast information sorting game inspired by Tinder-swipe where the user judges headlines, images, or quotes as True or False and receives immediate feedback explaining the techniques of disinformation.

The Newsfeed Simulation: A pressure test where the user must judge the reliability of a rapid information stream to learn how to handle urgency and the Availability Bias.

Users earn XP to unlock Labels (e.g., from "Digital Novice" to "Master Fact-Checker"). The progression is designed in tiers: each new level focuses on specific scientific cognitive biases. The higher the level and the more the user progresses, the more complex biases the challenges integrate to identify and decode. Users can also consult a detailed Codex that expands as they discover these new biases.

## How we built it

We chose a modern and high-performance stack to ensure speed and scalability:

Frontend: Next.js (React) for structure and server-side rendering (SSR/SSG), ensuring excellent performance and SEO for educational content.

Design: Tailwind CSS for rapid development of the user interface, creating a modern theme with reusable components, which allowed us to stick to the design mockups.

Database and Backend: Supabase (utilized primarily for implementing a leaderboard functionality. All other user data, such as game progress and profiles, is managed via localStorage for the MVP, with a structure ready for full user authentication and comprehensive profile management if the project scales).

The architecture is based on reusable components (Atomic Design) to easily integrate the different game formats (Swipe, Simulation) with centralized scoring logic.

## Challenges we ran into

Designing Local Progression Logic: Given the initial choice not to use a database for the MVP, implementing robust user profile management (XP, level, pseudo) via localStorage required a disciplined approach within the Svelte Store to ensure data was saved correctly without being corrupted with each session.

Content Variety: Designing advanced level questions, where verification requires nuance (distinguishing correlation from causation, identifying plausible satire), was a significant editorial challenge.

## Accomplishments that we're proud of

The Educational Feedback: Every answer (correct or incorrect) is immediately followed by a concise explanation and the Key Concept of verification. This ensures the game remains first and foremost a learning tool.

Social Features: Add Leaderboards to compare scores with other users and enhance the gamified aspect.

Accessibility and UX: Considering accessibility from the design stage makes the application usable by a wider audience.

## What we learned

We learned the crucial importance of defining the data contract early on, even when using localStorage. Clearly defining the schemas (userData, gameCards) allowed the UI and Gameplay developers to work in parallel effectively. From a technical standpoint, we mastered the integration of complex animations and local state management within the React/Next.js ecosystem.

## What's next for Le Détecteur/ The Detector

Full Migration to Supabase: Implement real authentication, allowing users to save their progress on any device.

New Game Formats: Develop and integrate the other planned formats, such as "The Expert's Eye" (visual manipulation detection) and "The Tribunal of Ideas" (analysis of logical fallacies).

Dynamic Content: Create an administrator interface for adding and managing new game cards dynamically via Supabase.
