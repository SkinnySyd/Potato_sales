# Potato Sales App

## Description

hello world

## Table of Contents

- [Requirements](#requirements)
- [Testing the App](#testing-the-app)
  - [Quick Start](#quick-start)
  - [Custom Configuration](#custom-configuration)
## Requirements

To test the Potato Sales App, you'll need:

- Docker installed on your machine.

## Testing the App

### Quick Start

To quickly test the Potato Sales App, run the following command:

```bash
docker run -p 4002:80 skinnysyddocker/potato-sales:latest
```
This command will start the container on port 4002.

### Custom Configuration

If you prefer customizing the container's name and port, use the following command:

```bash
docker run --name $CONTAINER_NAME -p $HOST_PORT:80 skinnysyddocker/potato-sales:latest
```

Replace $CONTAINER_NAME with your desired container name and $HOST_PORT with the port number you want to run the container on.


