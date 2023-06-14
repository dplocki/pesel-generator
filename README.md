# PESEL Generator

![GitHub](https://img.shields.io/github/license/dplocki/pesel-generator)
![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fdplocki%2Fpesel-generator%2Fbadge%3Fref%3Dmaster&style=flat)
![GitHub branch checks state](https://img.shields.io/github/checks-status/dplocki/pesel-generator/master)
![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/dplocki/pesel-generator?sort=semver)

A simple [PESEL](https://en.wikipedia.org/wiki/PESEL) generator in [React](https://en.wikipedia.org/wiki/React_(JavaScript_library)).

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent version of the Create React App guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Components

The applications is using [Boostrap](https://getbootstrap.com/), in form of React components: [react-bootstrap](https://react-bootstrap.github.io/).

## Running test

```sh
npm run test
```

## Building

```sh
npm run build
```

See the `./build` directory.

## Docker image

```sh
docker build -t pesel-generator .
docker run --rm -it -p 127.0.0.1:3000:3000 -v $(pwd):/build pesel-generator
```
