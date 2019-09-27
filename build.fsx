#load "packages/Be.Vlaanderen.Basisregisters.Build.Pipeline/Content/build-generic.fsx"

open Fake
open Fake.NpmHelper
open ``Build-generic``

// The buildserver passes in `BITBUCKET_BUILD_NUMBER` as an integer to version the results
// and `BUILD_DOCKER_REGISTRY` to point to a Docker registry to push the resulting Docker images.

// NpmInstall
// Run an `npm install` to setup Commitizen and Semantic Release.

// DotNetCli
// Checks if the requested .NET Core SDK and runtime version defined in global.json are available.
// We are pedantic about these being the exact versions to have identical builds everywhere.

// Clean
// Make sure we have a clean build directory to start with.

// Restore
// Restore dependencies for debian.8-x64 and win10-x64 using dotnet restore and Paket.

// Build
// Builds the solution in Release mode with the .NET Core SDK and runtime specified in global.json
// It builds it platform-neutral, debian.8-x64 and win10-x64 version.

// Test
// Runs `dotnet test` against the test projects.

// Publish
// Runs a `dotnet publish` for the debian.8-x64 and win10-x64 version as a self-contained application.
// It does this using the Release configuration.

// Pack
// Packs the solution using Paket in Release mode and places the result in the dist folder.
// This is usually used to build documentation NuGet packages.

// Containerize
// Executes a `docker build` to package the application as a docker image. It does not use a Docker cache.
// The result is tagged as latest and with the current version number.

// DockerLogin
// Executes `ci-docker-login.sh`, which does an aws ecr login to login to Amazon Elastic Container Registry.
// This uses the local aws settings, make sure they are working!

// Push
// Executes `docker push` to push the built images to the registry.

let product = "Basisregisters Vlaanderen"
let copyright = "Copyright (c) Vlaamse overheid"
let company = "Vlaamse overheid"

let dockerRepository = "base-registries"
let assemblyVersionNumber = (sprintf "2.%s")
let nugetVersionNumber = (sprintf "%s")

let containerize = containerize dockerRepository
let push = push dockerRepository

// Solution -----------------------------------------------------------------------

Target "Clean_Site" (fun _ ->
  CleanDir buildDir
  // CleanDir ("site" @@ "dist")
)

Target "Build_Site" (fun _ ->
  ()
  // Npm (fun p ->
  // { p with
  //     WorkingDirectory = ("deps" @@ "webuniversum")
  //     Command = Install Standard
  // })

  // Npm (fun p ->
  // { p with
  //     WorkingDirectory = ("deps" @@ "webuniversum")
  //     Command = (Run "util:bootstrap")
  // })

  // Npm (fun p ->
  // { p with
  //     Command = (Run "build")
  // })
)

Target "Containerize_Site" (fun _ ->
  CopyDir (buildDir @@ "BaseRegistries" @@ "linux") "site" allFiles
  containerize "BaseRegistries" "site")

Target "PushContainer_Site" (fun _ -> push "site")

// --------------------------------------------------------------------------------

Target "Build" DoNothing
Target "Containerize" DoNothing
Target "Push" DoNothing

"NpmInstall"         ==> "Build"
"Clean"              ==> "Build"
"Clean_Site"         ==> "Build"
"Build_Site"         ==> "Build"

"Build"              ==> "Containerize"
"Containerize_Site"  ==> "Containerize"

"Containerize"       ==> "Push"
"DockerLogin"        ==> "Push"
"PushContainer_Site" ==> "Push"

// By default we build & test
RunTargetOrDefault "Build"
