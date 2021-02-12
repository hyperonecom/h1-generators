IMAGE_NAME?=h1-generators
IMAGE_TAG?=latest

.PHONY: build
build:
	wget -O openapi.json https://api.hyperone.com/v2/openapi.json
	docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .

.PHONY: start
start:
	docker run -v $$HOME/.h1/passport.json:/root/.h1/passport.json -v $$PWD:/src --workdir /src ${IMAGE_NAME}:${IMAGE_TAG} "${EXEC}"