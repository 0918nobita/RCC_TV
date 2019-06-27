# RCC TV

[![CircleCI](https://circleci.com/gh/0918nobita/RCC_TV.svg?style=svg)](https://circleci.com/gh/0918nobita/RCC_TV) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2F0918nobita%2FLTVOD.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2F0918nobita%2FLTVOD?ref=badge_shield)

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

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2F0918nobita%2FLTVOD.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2F0918nobita%2FLTVOD?ref=badge_large)
