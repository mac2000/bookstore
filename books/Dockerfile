FROM mcr.microsoft.com/dotnet/sdk:7.0 as builder
WORKDIR /app

COPY *.csproj .
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o publish


FROM mcr.microsoft.com/dotnet/aspnet:7.0 as runner
WORKDIR /app
COPY --from=builder /app/publish .
ENTRYPOINT [ "dotnet", "books.dll"]
