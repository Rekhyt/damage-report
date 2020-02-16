docker run -it --rm \
  -e NODE_ENV=${NODE_ENV:-development} \
  -e LOG_LEVEL=${LOG_LEVEL:-info} \
  -e LOG_TO_CONSOLE=${LOG_TO_CONSOLE:-true} \
  -e LOG_TO_LOGGLY=${LOG_TO_LOGGLY:-false} \
  -e LOGGLY_SUBDOMAIN=${LOGGLY_SUBDOMAIN} \
  -e LOGGLY_TOKEN=${LOGGLY_TOKEN} \
  -e I_API_KEY=${I_API_KEY} \
  --name damage-report \
  -p ${PORT:-8000}:8000 \
  damage-report:${TAG:-development}