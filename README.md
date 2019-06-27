# RCC TV

[![CircleCI](https://circleci.com/gh/0918nobita/RCC_TV.svg?style=svg)](https://circleci.com/gh/0918nobita/RCC_TV)

## 開発環境構築

yarn, Docker を事前にインストールしておく必要あり

```
make init
```

## クライアント / バックエンドのビルド

```
make build
```

## 各サーバの起動

```
make docker-compose-up
```

以下のサーバが起動する

- フロントエンド (webpack-dev-server) port: 1234
- バックエンド API 鯖 (モック, Node.js) port: 8080
- オブジェクトストレージ (モック, nginx) port: 3000
