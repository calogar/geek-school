#### docker-compose up
Builds and lauches all the services.

#### docker build .
Uses the Dockerfile to build an image.

#### docker run --publish 3000:3000 --detach --name school shcool
Runs the previouslt built image "school".

#### docker run --name mysql56 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=school -p 3307:3306 mysql:5.6
Launch a mysql for testing without Docker Compose.