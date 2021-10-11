up:
	docker-compose --env-file .env up -d

down: 
	docker-compose down

build:
	docker-compose build