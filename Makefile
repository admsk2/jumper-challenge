# Define script paths
COMMAND_SCRIPT := ./scripts/run.sh
COPY_ENV_SCRIPT := ./scripts/env.sh

# Target to run the build command in both backend and frontend
install:
	@echo "Running 'install' in backend and frontend..."
	@chmod +x $(COMMAND_SCRIPT)
	@chmod +x $(COPY_ENV_SCRIPT)
	@$(COMMAND_SCRIPT) install
	@$(COPY_ENV_SCRIPT)

# Target to run the build command in both backend and frontend
build:
	@echo "Running 'build' in backend and frontend..."
	@$(COMMAND_SCRIPT) build

# Target to run the start command in both backend and frontend
start:
	@echo "Running 'start' in backend and frontend..."
	@$(COMMAND_SCRIPT) start

# Target to run the dev command in both backend and frontend
dev:
	@echo "Running 'dev' in backend and frontend..."
	@$(COMMAND_SCRIPT) dev

.PHONY: install build start dev
