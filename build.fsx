#r "paket:
version 7.0.2
framework: net6.0
source https://api.nuget.org/v3/index.json
nuget Be.Vlaanderen.Basisregisters.Build.Pipeline 6.0.5 //"

#load "packages/Be.Vlaanderen.Basisregisters.Build.Pipeline/Content/build-generic.fsx"

open System
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
let npmtoken = (Environment.GetEnvironmentVariable "NPM_TOKEN")
let buildNumber = Environment.environVarOrDefault "CI_BUILD_NUMBER" "0.0.0"

let containerizeWithCustomBuildArgs dockerRepository project containerName buildargs dockerfile =
  let result1 =
    $"build . --no-cache --tag {dockerRegistry}/{dockerRepository}/{containerName}:{buildNumber} {buildargs} -f {dockerfile}".Split [|' '|]
    |> CreateProcess.fromRawCommand "docker"
    |> CreateProcess.withWorkingDirectory (buildDir @@ project @@ "linux")
    |> CreateProcess.withTimeout (TimeSpan.FromMinutes 20.)
    |> Proc.run

  if result1.ExitCode <> 0 then failwith "Failed result from Docker Build"

  let result2 =
    [ "tag"; sprintf "%s/%s/%s:%s" dockerRegistry dockerRepository containerName buildNumber; sprintf "%s/%s/%s:latest" dockerRegistry dockerRepository containerName]
    |> CreateProcess.fromRawCommand "docker"
    |> CreateProcess.withTimeout (TimeSpan.FromMinutes 5.)
    |> Proc.run

  if result2.ExitCode <> 0 then failwith "Failed result from Docker Tag"

Target.create  "BuildContainer" (fun _ ->
  let filterAllFiles = (fun _ -> true)
  Shell.copyDir (buildDir @@ "BaseRegistries" @@ "linux") "site" filterAllFiles
  containerizeWithCustomBuildArgs dockerRepository "BaseRegistries" "site" $"--build-arg build_number={buildNumber} --build-arg NPM_TOKEN={npmtoken}" "Dockerfile"
)

Target.create  "PreBuildContainer" (fun _ ->
  let filterAllFiles = (fun _ -> true)
  Shell.copyDir (buildDir @@ "BaseRegistries" @@ "linux") "site" filterAllFiles
  containerizeWithCustomBuildArgs dockerRepository "BaseRegistries" "site" $"--build-arg build_number={buildNumber}" "prebuild.Dockerfile"
)

"NpmInstall"
==> "BuildContainer"

Target.runOrDefault "BuildContainer"
