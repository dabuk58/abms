# build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore ABMS.sln
RUN dotnet publish WebApi/WebApi.csproj -c Release -o /app/out

# runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .
ENV ASPNETCORE_URLS=http://0.0.0.0:${PORT}
EXPOSE 10000
CMD ["dotnet", "WebApi.dll"]
