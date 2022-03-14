## Description

1. The main objective - is to create backend for gallery.
2. Practise with node.js and ts

## Folder Structure:

```
.
├── src
│    │── configs
│    │     │── config.ts
│    │     └── config_interface.ts
│    ├── database
│    │     │── local_database.ts
│    │     └── database_interface.ts
│    ├── framework
│    │     │── application.ts                      -| main file of custom framework 
│    │     │── framework_interfaces.ts
│    │     │── router.ts
│    │     │── static_controller.ts
│    │     └── static_service.ts
│    ├── gallery
│    │     │── gallery_controller.ts
│    │     │── gallery_interface.ts
│    │     └── gallery_service.ts
│    ├── response
│    │     │── response_interface.ts
│    │     └── response_service.ts
│    ├── token
│    │     └── token_service.ts
│    └── user
│          │── user_controller.ts
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
├── .eslintignore         -| ignore files for eslint
├── .eslintrc.json        -| lint configs
├── .gitignore            -| ignore files for git
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
    # or
yarn install
```

2. Copy static

```
npm run copy:static
    # or
yarn copy:static
```

3. Start dev mode

```
npm run dev
    # or
yarn dev
```

## Other commands:

* format code with prettier

```
npm run format
    # or
yarn format
```

* lint and fix with eslint

```
npm run lint
    # or
yarn lint
```

* full list of commands available in package.json

## Issues

If you find any [issue](https://github.com/stansful/module2_part2_node/issues), please submit it.

## Stay in touch

* Author - [Gak Filipp](https://t.me/stansful)