# Contributing to jquery-detect

## tldr;

- Install [node](https://nodejs.org), possibly with [nvm](https://github.com/nvm-sh/nvm).
- Run `npm install`
- Run the development site with `npm run dev`
- Run tests with `npm test`

## Running the site with Docker

First, make sure you have docker [installed and running](https://docs.docker.com/get-docker/).

To test the site in development mode, we use [`docker-compose`](https://docs.docker.com/compose/) and a `Dockerfile.dev`, which will mount the files in this repo, but build and run everything from the docker image.

```bash
$ docker prune system --volumes -f # This will clean up any old containers and volumes
$ docker compose up --build -d
$ docker attach jquery-detect
```

_Starting the containers in the background and then attaching a specific container
allows you to fix stdin, so you can do `rs`+ENTER to restart the server using nodemon._

Open a shell in the container:

```bash
$ docker exec -it jquery-detect bash
```

Run tests in the docker image:

```bash
$ docker exec -it jquery-detect npm test
```
