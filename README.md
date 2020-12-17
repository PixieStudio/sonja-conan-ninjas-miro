# Sonja et Conan contre les Ninjas - Miro Widget

### Clone

Clone this repository to your local workspace.

`git clone git@github.com:PixieStudio/sonja-conan-ninjas-miro.git`

Install packages.

`npm i`

Run `cp .env.example .env` file then populate `.env` like `.env.example`.


### ENV Development

Start your application with node.

`node src/sonjaconan.js`

Start your **ngrok tunnel** :

`ngrok http PORT`

Create new app in your Miro Dev Account and fill :

#### Redirect URLs

```
https://XXXX.ngrok.io/static/web-plugin/auth-success.html
https://XXXX.ngrok.io/oauth
```

#### Web Plugin

```
https://XXXX.ngrok.io/static/web-plugin/index.html
```

#### OAuth scopes

```
auditlogs:read
boards:read
boards:write
identity:read
team:read
```
