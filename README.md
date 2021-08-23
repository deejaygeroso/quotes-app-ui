# Quotes App UI

A simple application for saving your favorite quotes.
![App Screenshot](https://github.com/deejaygeroso/quotes-app-ui/blob/ui-update/public/assets/images/screenshot.png)

### Required Setup

Create file `.env` file then add variable:

```
# Use ENV=prod for production
ENV=dev
PORT=8000
```

### Running docker in daemon

Note: `docker` && `docker-compose` should be installed on your machine.
Also, set `ENV=prod` from `.env` file.

```
docker-compose up --build -d
```

### Build nginx dockerfile manually

```
docker build -t client-nginx . --file config/nginx/Dockerfile
```

### Running application in development

```
npm run dev
```

### Running application for production using npm

```
npm run build && npm run start
```
