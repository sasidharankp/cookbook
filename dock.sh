source .env 

# DOCKER_TAG=$(git rev-parse --abbrev-ref HEAD)

echo $DOCKER_USERNAME/$DOCKER_REPOSITORY:$DOCKER_TAG

docker build -t $DOCKER_USERNAME/$DOCKER_REPOSITORY:$tag
docker run --env-file .env -p 80:5000 -it $DOCKER_USERNAME/$DOCKER_REPOSITORY:$tag