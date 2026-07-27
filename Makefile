.DEFAULT_GOAL := prod

GREP ?= $(shell command -v ggrep 2> /dev/null || command -v grep 2> /dev/null)
AWK  ?= $(shell command -v gawk 2> /dev/null || command -v awk 2> /dev/null)

help: ## Show makefile targets and their descriptions
	@$(GREP) --no-filename -E '^[ a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		$(AWK) 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-28s\033[0m %s\n", $$1, $$2}' | sort

prod: ## Pull latest image and run in production mode (default)
	docker compose -f docker-compose.prod.yml pull && docker compose -f docker-compose.prod.yml up -d --force-recreate

prod-build: ## Build and run in production mode (local build)
	docker compose build && docker compose up -d --force-recreate

prodshell: ## Open a shell in the running prod container
	docker compose -f docker-compose.prod.yml exec web bash

prodlogs: ## Tail production container logs
	docker compose -f docker-compose.prod.yml logs -f

sync: ## Sync local metadata with GitHub and build .zip files + docs
	docker compose -f docker-compose.prod.yml exec web npm run sync

docs: ## Updates plugin repos so that fresh docs happen
	docker compose -f docker-compose.prod.yml exec web npm run docs

deploy: ## Deploy to AWS (pull and restart)
	@SHA=$$(git rev-parse HEAD); \
	echo "Waiting for GitHub Actions build of $$SHA to complete..."; \
	RUN_ID=""; \
	while [ -z "$$RUN_ID" ]; do \
		RUN_ID=$$(gh run list --commit $$SHA --limit 1 --json databaseId --jq '.[0].databaseId // empty'); \
		if [ -z "$$RUN_ID" ]; then echo "No run for $$SHA yet, waiting..."; sleep 5; fi; \
	done; \
	gh run watch $$RUN_ID --exit-status || { echo "Build for $$SHA failed; aborting deploy."; exit 1; }
	ssh lightsail "cd dev/plugins && git pull && make"

devup: ## Build and run in development mode
	cd dev && docker compose build && docker compose up -d --force-recreate && docker compose logs -f

devlogs: ## Tail development container logs
	cd dev && docker compose logs -f

devps: ## Stop development containers
	cd dev && docker compose ps

devdown: ## Stop development containers
	cd dev && docker compose down

devsync: ## Sync local metadata with GitHub and build .zip files
	cd dev && docker compose exec web npm run sync

