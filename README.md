# CN_CNPM_FE

# RUN YOUR APP WITH DOCKER

INSTALL DOCKER: [here](https://www.youtube.com/watch?v=Sh9n6IR6Knk)

```

docker build -t $IMAGE_NAME:$IMAGE_TAG .

# THEN

docker run --name $DOCKER_CONTAINER_NAME -d -p 8080:80 $IMAGE_NAME:$IMAGE_TAG

```
