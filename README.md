# Wasm Docker Extension Example
An example Docker Desktop extension that uses Wasm for the backend instead of a Linux container.

![Screenshot of Wasm Extension](/docs/screenshot.png)

## How it works

The Rust code in `vm` gets compiled to a *.wasm binary in the `Dockerfile` build process. The build then sets the entry point of the image to that *.wasm binary. See [Docker+Wasm docs](https://docs.docker.com/desktop/wasm/).

The Wasm backend app is an Http server that runs on port 1234 to communicate with the frontend `ui` of the extension. **Note:** Docker Desktop extensions should normally communicate via named socket to avoid port conflicts and security risks that entails. However, there is currently no support for named sockets in Wasm/Wasi. This could [potentially change soon](https://github.com/WasmEdge/WasmEdge/issues/2138) in WasmEdge, the Wasm runtime we use.

## Installing

As of Docker Desktop v4.15.0, you must have the experimental containerd image store enabled.

![Screenshot of containerd image store setting](/docs/containerdstore.png)

Note that your firewall may prompt you to allow port 1234 for the extension.

Click [this link](docker-desktop://extensions/marketplace?extensionId=crigneydocker/wasm-extension&tag=latest) or run:

```
docker extension install crigneydocker/wasm-extension
```

## Building

```
make build-extension
make install-extension
```

Have fun building your own Wasm Docker Desktop extensions!
