# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5000
EXPOSE 5001

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

COPY ["TTS.Source/src/API/TTS.Source.API/TTS.Source.API.csproj", "src/API/TTS.Source.API/"]
COPY ["TTS.Source/src/Core/TTS.Source.Application/TTS.Source.Application.csproj", "src/Core/TTS.Source.Application/"]
COPY ["TTS.Source/src/Core/TTS.Source.Domain/TTS.Source.Domain.csproj", "src/Core/TTS.Source.Domain/"]
COPY ["TTS.Source/src/Infrastructure/TTS.Source.Infrastructure.EmailService/TTS.Source.Infrastructure.EmailService.csproj", "src/Infrastructure/TTS.Source.Infrastructure.EmailService/"]
COPY ["TTS.Source/src/Infrastructure/TTS.Source.Persistance.RelationalDB/TTS.Source.Persistance.RelationalDB.csproj", "src/Infrastructure/TTS.Source.Persistance.RelationalDB/"]
RUN dotnet restore "src/API/TTS.Source.API/TTS.Source.API.csproj"

COPY . .

WORKDIR "/src/src/API/TTS.Source.API"
RUN dotnet build "TTS.Source.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "TTS.Source.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish 

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TTS.Source.API.dll"]


