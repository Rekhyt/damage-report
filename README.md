# damage-report
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/Rekhyt/damage-report.svg?branch=master)](https://travis-ci.org/Rekhyt/damage-report)
[![Latest Tag](https://img.shields.io/github/v/tag/rekhyt/damage-report?style=flat)](https://github.com/Rekhyt/damage-report/releases)

Damage report, Bob.

A small service receiving climate data (temperature, humidity) per location, pushing it on to instrumentalapp.com and
providing a local route to fetch the current values.

## Configuration
* `NODE_ENV` - one of `development` or `production` (default: `development`)
* `PORT` - the port to run the application on (default: `8000`)
* `CORS_ALLOWED_ORIGIN` - the value to be returned in the Access-Control-Allow-Origin header (default: `*`)
* `LOG_NAME` - the application name to be used on log messages (default: `damage-report-service`)
* `LOG_LEVEL` - one of `trace`, `debug`, `info`, `warn`, `error`, `fatal` (default: `info`)
* `LOG_TO_CONSOLE` - enable logging to console (defaults: `true` on development; `false` on production)
* `LOG_TO_LOGGLY` - enable logging to loggly.com (defaults: `false` on development; `true` on production)
* `LOGGLY_SUBDOMAIN` - your loggly.com sub domain
* `LOGGLY_TOKEN` - a loggly.com access token
* `I_API_KEY` - the API key to use for the instrumentalapp.com monitoring service

**Note:** Logging to console is disabled on production by default because when running in a Docker container, console
logs are saved to disc or, in case of Raspberry Pi, the SD card. Disabling console logs in that scenario is supposed to
spare the SD card from wearing out.

## Run From Docker Hub
### Development / Current Master

`I_API_KEY=12345abcd docker --rm --name damage-report -d lapwing/damage-report:latest`

### Tags
Starting from v1.0.0-alpha.3, semver-tagged images are architecture aware. Supported architectures are amd64 or armv7
(tested on a Raspberry Pi 3). Find available tags at [Docker Hub](https://hub.docker.com/r/lapwing/damage-report/tags).

`I_API_KEY=12345abcd docker --rm --name damage-report -d lapwing/damage-report:v1.0.0-alpha.3`

## Run From Project
### Natively
`I_API_KEY=12345abcd npm start`

### In A Docker Container
#### Build Image
Images for amd64 and arm architecture are supported. The build commands will only succeed in the target environment.
Use the `TAG` env to specify a custom tag, defaults to `development`.

For amd64: `TAG=custom ./build.sh` creates damage-report:custom

For arm: `TAG=custom ./build-arm.sh` creates damage-report:custom-arm

#### Run Container (amd64)
Interactively: `I_API_KEY=12345abcd ./start.sh`

Background: `I_API_KEY=12345abcd ./service.sh`

#### Run Container (arm)
Interactively: `I_API_KEY=12345abcd TAG=development-arm ./start.sh`

Background: `I_API_KEY=12345abcd TAG=development-arm ./service.sh`

## Posting Data
Post data as `application/json`JSON to the `/command` API route.

```json
{
  "name": "ClimateData.updateData",
  "payload": {
    "locationId": "kitchen",
    "locationName":  "Kitchen",
    "temperature": "22.1",
    "humidity": "38"
  }
}
```

## Getting Data
### Instrumental (instrumentalapp.com)
Data is pushed to instrumentalapp.com metrics, prefixed with environment:
* [env].damageReport.[locationId].temperature
* [env].damageReport.[locationId].humidity

Examples:
* development.damageReport.kitchen.temperature
* production.damageReport.livingRoom.humidity

### Current Values
Current values can be fetched from the `/dashboard` API route.

Example results:
```json
{
  "locationClimate": {
    "kitchen": {
      "locationName": "Kitchen",
      "temperature": "22.1",
      "humidity": "38"
    },
    "livingRoom": {
      "locationName": "Living Room",
      "temperature": "23.5",
      "humidity": "42"
    }
  }
}
```