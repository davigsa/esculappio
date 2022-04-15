up:
	docker-compose --env-file .env up -d

down: 
	docker-compose down

build:
	docker-compose build

migration:
	yarn typeorm migration:create -n $(n)

migration-run:
	yarn typeorm migration:run

migration-revert:
	yarn typeorm migration:revert