# Contributing to jquery-detect

## tldr;

- Install [node](https://nodejs.org), possibly with [nvm](https://github.com/nvm-sh/nvm).
- Run `npm install`
- Run the development site with `npm run dev`
- Run tests with `npm test`

## Running a production site with Docker

```bash
$ docker prune system --volumes -f # This will clean up any old containers and volumes
$ docker build -t jquery-detect .
$ docker run --rm -p 3000:3000 -it jquery-detect
```
