#r "paket:
version 5.241.6
framework: netstandard20
source https://api.nuget.org/v3/index.json
nuget Be.Vlaanderen.Basisregisters.Build.Pipeline 4.1.0 //"

#load "packages/Be.Vlaanderen.Basisregisters.Build.Pipeline/Content/build-generic.fsx"

open Fake.Core
open Fake.Core.TargetOperators
open Fake.IO
open Fake.IO.FileSystemOperators
open ``Build-generic``

let product = "Basisregisters Vlaanderen"
let copyright = "Copyright (c) Vlaamse overheid"
let company = "Vlaamse overheid"

let dockerRepository = "basisregisters"
let assemblyVersionNumber = (sprintf "2.%s")

Target.create  "Clean_Site" (fun _ ->
  Shell.cleanDir buildDir
  // Shell.cleanDir ("site" @@ "dist")
)

Target.create  "Build_Site" (fun _ ->
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

Target.create  "BuildContainer" (fun _ ->
  Shell.copyDir (buildDir @@ "BaseRegistries" @@ "linux") "site" allFiles
  containerize dockerRepository "BaseRegistries" "site")

"NpmInstall"
==> "Clean_Site"
==> "BuildContainer"

Target.runOrDefault "BuildContainer"
