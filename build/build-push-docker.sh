#!/usr/bin/env bash

docker login --username ${DOCKER_USER} --password ${DOCKER_PASSWORD}

# amd64
buildctl build --frontend dockerfile.v0 \
            --local dockerfile=. \
            --local context=. \
            --exporter image \
            --exporter-opt name=docker.io/lapwing/damage-report:${TRAVIS_TAG}-amd64 \
            --exporter-opt push=true \
            --frontend-opt platform=linux/amd64 \
            --frontend-opt filename=./Dockerfile


# arm
buildctl build --frontend dockerfile.v0 \
            --local dockerfile=. \
            --local context=. \
            --exporter image \
            --exporter-opt name=docker.io/lapwing/damage-report:${TRAVIS_TAG}-armv7 \
            --exporter-opt push=true \
            --frontend-opt platform=linux/armhf \
            --frontend-opt filename=./Dockerfile \
            --opt build-arg:IMAGE=balenalib/rpi-alpine-node:latest


export DOCKER_CLI_EXPERIMENTAL=enabled

# manifest
docker manifest create lapwing/damage-report:${TRAVIS_TAG} \
            lapwing/damage-report:${TRAVIS_TAG}-amd64 \
            lapwing/damage-report:${TRAVIS_TAG}-armv7

docker manifest annotate lapwing/damage-report:${TRAVIS_TAG} lapwing/damage-report:${TRAVIS_TAG}-armv7 --arch arm
docker manifest annotate lapwing/damage-report:${TRAVIS_TAG} lapwing/damage-report:${TRAVIS_TAG}-amd64 --arch amd64

docker manifest push lapwing/damage-report:${TRAVIS_TAG}