FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

COPY ["GlowFlow.sln", "./"]
COPY ["GlowFlow.Core/GlowFlow.Core.csproj", "GlowFlow.Core/"]
COPY ["GlowFlow.Application/GlowFlow.Application.csproj", "GlowFlow.Application/"]
COPY ["GlowFlow.API/GlowFlow.API.csproj", "GlowFlow.API/"]

RUN dotnet restore "GlowFlow.sln"
COPY . .
WORKDIR "/src/GlowFlow.API"
RUN dotnet build "GlowFlow.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "GlowFlow.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "GlowFlow.API.dll"]
