FROM --platform=$BUILDPLATFORM rust AS wasm-builder
WORKDIR /backend
RUN rustup target add wasm32-wasi
COPY vm/Cargo.toml ./
COPY vm/Cargo.lock ./
COPY vm/ ./
# build the wasm binary
RUN cargo build --target wasm32-wasi --release

FROM --platform=$BUILDPLATFORM node:17.7-alpine3.14 AS client-builder
WORKDIR /ui
# cache packages in layer
COPY ui/package.json /ui/package.json
COPY ui/package-lock.json /ui/package-lock.json
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm ci
# install
COPY ui /ui
RUN npm run build

FROM scratch
LABEL org.opencontainers.image.title="Wasm extension" \
    org.opencontainers.image.description="My awesome Wasm extension" \
    org.opencontainers.image.vendor="Docker Inc." \
    com.docker.desktop.extension.api.version="0.3.0" \
    com.docker.extension.screenshots="" \
    com.docker.extension.detailed-description="" \
    com.docker.extension.publisher-url="" \
    com.docker.extension.additional-urls="" \
    com.docker.extension.changelog=""

COPY --from=wasm-builder /backend/target/wasm32-wasi/release/extension-server.wasm /service.wasm
COPY docker-compose.yaml .
COPY metadata.json .
COPY docker.svg .
COPY --from=client-builder /ui/build ui
EXPOSE 1234
ENTRYPOINT [ "service.wasm" ]
