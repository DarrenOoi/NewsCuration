# Quickstart Guide

## Getting Started


First, run the development server.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### Note:
- You can start editing the page by modifying `app/pages/index.js`. The page auto-updates as you edit the file.
- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
- This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

Next, run the endpoint routes:
```powershell
python API.py
```

#### Note:
- Make sure python 3.11.5 (or newer) in installed into you windows OS
- Due to the implementation of some OS directories, development can only be made on windows OS. Bug fixes to amend this will occur soon.

## npm Dependencies

```bash
npm i -D daisyui@latest
npm install country-flags-svg
```

## python 3.11.5 dependencies
```cmd
pip install pymysql

pip install mysql-connector-python

pip install GoogleNews

pip install spacey

pip install flask

pip install openai

pip install flask-cors

python -m spacy download en_core_web_sm
```

## Infrastructure
Infrastructure is on AWS RDS System. Please make sure you have envrionment variables for AWS installed correctly. Talk to Daniel to received your unique username and password to access the NewCuration_2 RDS instance.
- See inf/README.md for further documentation
  

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!