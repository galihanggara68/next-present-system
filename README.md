This is a damn simple present system built using Next.js

## Getting Started

First setup mongodb database on your environment, and configure the url in `.env` file

Second, install packages and run the development server:

```bash
npm install
# or
yarn install
```

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Testing

To running testing on this project :

```bash
npm run cypress:run
# or
yarn cypress:run
```
