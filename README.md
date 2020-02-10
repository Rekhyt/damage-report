# damage-report
Damage report, Bob.

A small service receiving climate data (temperature, humidity) per location, pushing it on to instrumentalapp.com and
providing a local route to fetch the current values.

## Configuration
* `NODE_ENV` - one of `development` or `production` (default: `development`)
* `LOG_LEVEL` - one of `trace`, `debug`, `info`, `warn`, `error`, `fatal` (default: `info`)
* `PORT` - the port to run the application on (default: `8000`)
* `I_API_KEY` - The API key to use for the instrumentalapp.com monitoring service

## Run Locally
`I_API_KEY=12345abcd npm start`

## Run In Docker
### Build Image
Images for amd64 and arm architecture are supported. The build commands will only succeed in the target environment.
Use the `TAG` env to specify a custom tag, defaults to `development`.

For amd64: `TAG=custom ./build.sh` creates damage-report:custom

For arm: `TAG=custom ./build-arm.sh` creates damage-report:custom-arm

### Run Container (amd64)
Interactively: `I_API_KEY=12345abcd ./start.sh`

Background: `I_API_KEY=12345abcd ./service.sh`

### Run Container (arm)
Interactively: `I_API_KEY=12345abcd TAG=development-arm ./start.sh`

Background: `I_API_KEY=12345abcd TAG=development-arm ./service.sh`

## Posting Data
Post data as `application/json`JSON to the `/command` API route.

```json
{
  "name": "ClimateData.updateData",
  "payload": {
    "locationName": "kitchen",
    "temperature": "22.1",
    "humidity": "38"
  }
}
```

## Getting Data
### Instrumental (instrumentalapp.com)
Data is pushed to instrumentalapp.com metrics, prefixed with environment:
* [env].damageReport.[locationName].temperature
* [env].damageReport.[locationName].humidity

Examples:
* development.damageReport.kitchen.temperature
* production.damageReport.livingRoom.humidity

### Current Values
Current values can be fetched from the `/dashboard` API route.

Example results:
```json
{
  "kitchen": {
    "temperature": "22.1",
    "humidity": "38"
  },
  "livingRoom": {
    "temperature": "23.5",
    "humidity": "42"
  }
}
```