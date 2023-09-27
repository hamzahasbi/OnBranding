#!/bin/sh

# Install dependencies
yarn install

yarn run docs
yarn run api-dev

