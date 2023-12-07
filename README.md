# Prompter
This is a web application that allows users to share their prompts used in LLMs (such as Chat GPT) with others. Users are also able to edit and delete their prompts which are saved in a MongoDB database.

This project uses Next JS, Typescript, Next-Auth (Google OAuth) and MongoDB. With the newly improved Next JS 14, this entire project both acts as the frontend and also the backend. It also allows for the improvement of SSO capabilities and performace improvements due to server-side rendering.

## Setup
### Google Cloud (Localhost)
1) [Sign up](https://www.mongodb.com/cloud/atlas/register) for a MongoDB account
2) Create a new project and input any name for it
3) Select the newly created project (See the rectangle at the top left)
4) Go: `APIs & Services` > `OAuth consent screen` > click `Create`
5) Fill up `App Name` and `Developer contact information`, and click `Save And Continue`
6) Go: `Credentials` tab > click `Create Credentials` > click `OAuth client ID`
7) Choose `Application type` as Web application
8) Add URI for `Authorized JavaScript origins` (Add `http://localhost:3000`)
9) Add URI for `Authorized redirect URIs` (Add `http://localhost:3000` & `http://localhost:3000/api/auth/callback/google`) *(For the second uri, see [next-auth docs](https://next-auth.js.org/getting-started/rest-api#getpost-apiauthcallbackprovider) on why this redirect is needed)*
10) Click `Create` and save the `Client ID` and `Client secret` for the .env file

### MongoDB
- If you don't have a cluster created
  1) Click `Create`
  2) Select `Shared` to create a shared cluster
  3) Select your appropriate server location
  4) Create the cluster

- When cluster have been created
  1) Click `Database Access` tab and `Add New Database User` with the permission of "**Read and write to any database**" *(Remember your username and password)*
  2) Click `Network Access` tab, click `Add IP Address`, add **your current** IP address and add another IP address that **includes all IP addresses** which is `0.0.0.0/0`
  3) Click `Database` tab, click `Connect`, click `Drivers` and copy your `MongoDB URI`
  4) Replace `<password>` with the password of the user and save it for the .env file

### Environment Variables
1) From the root folder, create a new file called `.env`
2) Inside it will have these variables:
    - `GOOGLE_ID` (Client ID for web application)
    - `GOOGLE_CLIENT_SECRET` (Client secret)
    - `MONGODB_URI` (See MongoDB setup for more info) *(Note: Replace `<password>` with the password of the user)*
    - `NEXTAUTH_URL` (**Development**: Set it to `http://localhost:3000`, **Production**: Set it to the canonical URL of your site) (**SEE**: [Link](https://next-auth.js.org/configuration/options#nextauth_url))
    - `NEXTAUTH_URL_INTERNAL` (**Development**: Set it to `http://localhost:3000`, **Production**: Set it to the canonical URL of your site) (**SEE**: [Link](https://next-auth.js.org/configuration/options#nextauth_url_internal))
    - `NEXTAUTH_SECRET` (A random string used to hash tokens, sign & encrypt.) (**SEE**: [Link](https://next-auth.js.org/configuration/options#secret) to generate secret)