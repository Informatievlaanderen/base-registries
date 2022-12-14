# Basisregister site

# Base Registries [![Build Status](https://github.com/Informatievlaanderen/base-registries/workflows/CI/badge.svg)](https://github.com/Informatievlaanderen/base-registries/actions)

## Prerequisites

NVM: ([Windows][1], [unix, macOS, windows WSL](2))

Node: **v18.12.1** *(do this with nvm)*

NPM: **v8.19.2** *(nvm handles this too)*

``` bash
nvm install 18.12.1
```

[1]:(https://github.com/coreybutler/nvm-windows)
[2]:(https://github.com/nvm-sh/nvm/tree/master.1#installing-and-updating)

## For windows users that use git bash instead wsl

``` shell
# Update npm shell 
# Git bash (32 bit installation)
npm config set script-shell "C:\\Program Files (x86)\\git\\bin\\bash.exe"

# Git bash (64 bit installation)
npm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe"

# In case you want to revert this. You can execute 
npm config delete script-shell
````

## Common mistakes and solutions

``` bash
npm WARN old lockfile 
npm WARN old lockfile The package-lock.json file was created with an old version of npm,
npm WARN old lockfile so supplemental metadata must be fetched from the registry.
npm WARN old lockfile 
npm WARN old lockfile This is a one-time fix-up, please be patient...
npm WARN old lockfile 
```

When seeing this output than it means you're not using the correct node version.
`package-lock.json` file will version bump itself (`"lockfileVersion": ...`).
Instead of that what we is to do these steps.

1. Delete `node_modules` directory.
2. Revert `package-lock.json` changes.
3. Exec `nvm use`
4. Exec `npm i`


## Project setup

Before executing below commands, replace the variable `${NPM_TOKEN}` in `#YOUR_PROJECT_PATH/base-registries/site/.npmrc` with the NPM auth token necessary to install all NPM packages.

``` bash
cd #YOUR_PROJECT_PATH/base-registries/site
nvm use
npm i
```

### Compiles and hot-reloads for development
``` bash
# env dev
npm run serve

# OR

# env test
npm run serve-tst

# OR

# env staging
npm run serve-stg

# OR

# env production
npm run serve-prd
```

### Compiles and minifies for production
``` bash
# env production
npm run build
```
If it fails with javascript heap out of memory try with
```bash
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```


### Lints and fixes files
``` bash
npm run lint
```

### Project Configurations

| Environment Variable | Description |
|----------------------|-------------|
| API_VERSION | Basisregistry [public-api][3] version |
| SITE_VERSION | Version of this base-registry site |
| API_ENDPOINT | Basisregistry [public-api][3] endpoint |
| BRANCH_CONTENT | Git branch name of [markdown content](https://github.com/Informatievlaanderen/base-registries-content) [`main`, `tst`, `stg`, `prd`]

| Build args | Description |
|----------------------|-------------|
| NPM_TOKEN | Only required when using `./Dockerfile` |


[3]:https://github.com/Informatievlaanderen/public-api

### Page contents

If a view's options are marked with `hasMarkdown` to `true`, then its contents are determined by the `Markdown` files in https://github.com/Informatievlaanderen/base-registries-content.

### Docker Compose

``` bash
    #run all env at once
    docker-compose up --build --remove-orphans

    #port 8081 -> dev
    #port 8082 -> tst
    #port 8083 -> stg
    #port 8084 -> prd
```
OR create own docker compose file
``` yaml
version: '3.9'
services:
  dev:
    build:
      context: .
      dockerfile: ./Dockerfile
      args:
        NPM_TOKEN: #NPM_TOKEN
    environment:
      API_VERSION: 9.9.9-dev
      SITE_VERSION: 0.0.0-dev
      API_ENDPOINT: https://api.basisregisters.vlaanderen.be
      REPLACE_ALIAS_ZONE_NAME: basisregisters.vlaanderen.be
      REPLACE_ALIAS_BRANCH_CONTENT: main
    ports:
      - "8081:80"
```

OR

``` bash
# build without compose
docker build -t test:0.0.1-dev --build-arg NPM_TOKEN=$NPM_TOKEN -f ./Dockerfile ./
docker run test:0.0.1-dev -p 8080:80 -e API_VERSION='9.9.9-dev' -e SITE_VERSION='0.0.0-dev' -e API_ENDPOINT='https://api.basisregisters.vlaanderen.be' -e REPLACE_ALIAS_ZONE_NAME='basisregisters.vlaanderen.be' -e REPLACE_ALIAS_BRANCH_CONTENT='main'
```

## License

[European Union Public Licence (EUPL)](https://joinup.ec.europa.eu/news/understanding-eupl-v12)

The new version 1.2 of the European Union Public Licence (EUPL) is published in the 23 EU languages in the EU Official Journal: [Commission Implementing Decision (EU) 2017/863 of 18 May 2017 updating the open source software licence EUPL to further facilitate the sharing and reuse of software developed by public administrations](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=uriserv:OJ.L_.2017.128.01.0059.01.ENG&toc=OJ:L:2017:128:FULL) ([OJ 19/05/2017 L128 p. 59–64](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=uriserv:OJ.L_.2017.128.01.0059.01.ENG&toc=OJ:L:2017:128:FULL)).

## Credits

### Languages & Frameworks

* [.NET Core](https://github.com/Microsoft/dotnet/blob/master/LICENSE) - [MIT](https://choosealicense.com/licenses/mit/)
* [.NET Core Runtime](https://github.com/dotnet/coreclr/blob/master/LICENSE.TXT) - _CoreCLR is the runtime for .NET Core. It includes the garbage collector, JIT compiler, primitive data types and low-level classes._ - [MIT](https://choosealicense.com/licenses/mit/)
* [.NET Core APIs](https://github.com/dotnet/corefx/blob/master/LICENSE.TXT) - _CoreFX is the foundational class libraries for .NET Core. It includes types for collections, file systems, console, JSON, XML, async and many others._ - [MIT](https://choosealicense.com/licenses/mit/)
* [.NET Core SDK](https://github.com/dotnet/sdk/blob/master/LICENSE.TXT) - _Core functionality needed to create .NET Core projects, that is shared between Visual Studio and CLI._ - [MIT](https://choosealicense.com/licenses/mit/)
* [.NET Core Docker](https://github.com/dotnet/dotnet-docker/blob/master/LICENSE) - _Base Docker images for working with .NET Core and the .NET Core Tools._ - [MIT](https://choosealicense.com/licenses/mit/)
* [.NET Standard definition](https://github.com/dotnet/standard/blob/master/LICENSE.TXT) - _The principles and definition of the .NET Standard._ - [MIT](https://choosealicense.com/licenses/mit/)
* [Roslyn and C#](https://github.com/dotnet/roslyn/blob/master/License.txt) - _The Roslyn .NET compiler provides C# and Visual Basic languages with rich code analysis APIs._ - [Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/)
* [F#](https://github.com/fsharp/fsharp/blob/master/LICENSE) - _The F# Compiler, Core Library & Tools_ - [MIT](https://choosealicense.com/licenses/mit/)
* [F# and .NET Core](https://github.com/dotnet/netcorecli-fsc/blob/master/LICENSE) - _F# and .NET Core SDK working together._ - [MIT](https://choosealicense.com/licenses/mit/)
* [Vue.js](https://github.com/vuejs/vue/blob/dev/LICENSE) - _Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web._ - [MIT](https://choosealicense.com/licenses/mit/)

### Libraries

* [Paket](https://fsprojects.github.io/Paket/license.html) - _A dependency manager for .NET with support for NuGet packages and Git repositories._ - [MIT](https://choosealicense.com/licenses/mit/)
* [FAKE](https://github.com/fsharp/FAKE/blob/release/next/License.txt) - _"FAKE - F# Make" is a cross platform build automation system._ - [MIT](https://choosealicense.com/licenses/mit/)

### Tooling

* [npm](https://github.com/npm/cli/blob/latest/LICENSE) - _A package manager for JavaScript._ - [Artistic License 2.0](https://choosealicense.com/licenses/artistic-2.0/)
* [semantic-release](https://github.com/semantic-release/semantic-release/blob/master/LICENSE) - _Fully automated version management and package publishing._ - [MIT](https://choosealicense.com/licenses/mit/)
* [semantic-release/changelog](https://github.com/semantic-release/changelog/blob/master/LICENSE) - _Semantic-release plugin to create or update a changelog file._ - [MIT](https://choosealicense.com/licenses/mit/)
* [semantic-release/commit-analyzer](https://github.com/semantic-release/commit-analyzer/blob/master/LICENSE) - _Semantic-release plugin to analyze commits with conventional-changelog._ - [MIT](https://choosealicense.com/licenses/mit/)
* [semantic-release/exec](https://github.com/semantic-release/exec/blob/master/LICENSE) - _Semantic-release plugin to execute custom shell commands._ - [MIT](https://choosealicense.com/licenses/mit/)
* [semantic-release/git](https://github.com/semantic-release/git/blob/master/LICENSE) - _Semantic-release plugin to commit release assets to the project's git repository._ - [MIT](https://choosealicense.com/licenses/mit/)
* [semantic-release/npm](https://github.com/semantic-release/npm/blob/master/LICENSE) - _Semantic-release plugin to publish a npm package._ - [MIT](https://choosealicense.com/licenses/mit/)
* [semantic-release/github](https://github.com/semantic-release/github/blob/master/LICENSE) - _Semantic-release plugin to publish a GitHub release._ - [MIT](https://choosealicense.com/licenses/mit/)
* [semantic-release/release-notes-generator](https://github.com/semantic-release/release-notes-generator/blob/master/LICENSE) - _Semantic-release plugin to generate changelog content with conventional-changelog._ - [MIT](https://choosealicense.com/licenses/mit/)
* [commitlint](https://github.com/marionebl/commitlint/blob/master/license.md) - _Lint commit messages._ - [MIT](https://choosealicense.com/licenses/mit/)
* [commitizen/cz-cli](https://github.com/commitizen/cz-cli/blob/master/LICENSE) - _The commitizen command line utility._ - [MIT](https://choosealicense.com/licenses/mit/)
* [commitizen/cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog/blob/master/LICENSE) _A commitizen adapter for the angular preset of conventional-changelog._ - [MIT](https://choosealicense.com/licenses/mit/)

### Flemish Government Libraries

* [Be.Vlaanderen.Basisregisters.Build.Pipeline](https://github.com/informatievlaanderen/build-pipeline/blob/master/LICENSE) - _Contains generic files for all Basisregisters Vlaanderen pipelines._ - [MIT](https://choosealicense.com/licenses/mit/)
