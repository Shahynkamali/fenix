# Fenix Technical Assignment

## Libraries User:
* Vue.js
* Tailwind CSS / Tailwind unit
* TypeScript

## Requirements

* Docker
* VScode
* Extension Remote Containers (ms-vscode-remote.remote-containers) installed on your VScode. Click [here](https://code.visualstudio.com/docs/remote/containers) for the documentation on remote containers.

## Opening the project

1. Ensure you have Docker running on your machine.
2. Open the project in Visual Studio Code and run it inside Remote Container (see Requirements). This will install all VScode extensions to support this project, syntax highlighting and auto linting.
3. Inside the container (use Visual Studio Code console) run ``` yarn ``` to install al the dependecies required in the project.

## Closing the project

As a reminder, once you are finished running this project and you have closed your remote container, you __SHOULD stop and remove__ your Docker Container (from bash or PowerShell):

```bash
~ docker stop <container_id>
```

```bash
~ docker rm <container_id>
```

## Without docker, follow the following steps below

## Requirements:
* Have Node installed on your local machine.
* NPM

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Troubleshooting

- Running VSCode using the Remote Container extension on Windows may cause Yarn to run into a memory error and cause a soft-lock in Docker due to the speed at which Docker attempts to process files. It has been discovered that running `yarn install` with the `--verbose` parameter helps throttle this speed and may fix this behavior.
