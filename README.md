# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```
## Running application

1. Create `.env` file in root folder. You can just rename `.env.example`
2. Specify `PORT`. (4000 as default)

```
npm run docker:watch
```


After starting the app on port (4000 as default) you can open

in your browser OpenAPI documentation by typing http://localhost:4000/api/

For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

```
npm run test
```
## Vulnerability
You can scan images for vulnerability by
```
npm run scan:docker
```

It works only for windows users with latest docker desktop.

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
