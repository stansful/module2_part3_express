## Description

1. The main objective - is to create backend for gallery.
2. Practise with node.js and ts

## Folder Structure:

```
.
├── src
│    │── auth
│    │     │── auth_service.ts
│    │     └── auth_controller.ts
│    │── configs
│    │     │── config.ts
│    │     └── config_interface.ts
│    ├── database
│    │     │── local_database.ts
│    │     └── database_interface.ts
│    │── error
│    │     └── error_service.ts
│    │── exception
│    │     └── exception_service.ts
│    │── fs
│    │     └── fs_service.ts
│    ├── gallery
│    │     │── gallery_controller.ts
│    │     │── gallery_interface.ts
│    │     └── gallery_service.ts
│    ├── logger
│    │     └── logger_service.ts
│    ├── token
│    │     └── token_service.ts
│    └── user
│          │── user_interface.ts
│          └── user_service.ts
│
├── static                                  -| folder with static files
│    │── pictures
│    │     │── 1.jpeg
│    │     │── 2.jpeg
│    │     └── N.jpeg
│    └── frontend
│
├── logs
├── uploads
│
├── .eslintignore         -| ignore files for eslint
├── .eslintrc.json        -| lint configs
├── .prettierignore       -| ignore files for prettier
├── .prettierrc           -| prettier configs
├── package.json          -| project configs dependencies and etc
├── tsconfig.json         -| ts configs
└── README.md
```

## Getting started

1. Install dependencies

```
npm install 
```

2. Copy static

```
npm run copy:static
```

3. Start dev mode

```
npm run dev
```

## Other commands:

* format code with prettier

```
npm run format
```

* lint and fix with eslint

```
npm run lint
```

* full list of commands available in package.json

## Issues

If you find any [issue](https://github.com/stansful/module2_part3_express/issues), please submit it.

## Stay in touch

* Author - [Gak Filipp](https://t.me/stansful)