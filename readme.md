# SignalR MVP

A small server which posts messages to all connected clients via SignalR every 4 seconds.

## Running the example


**starting the front-end**

*using npm*

From the client folder:

```
npm i
ng serve
```

*using yarn*
```
yarn install
ng serve
```

**starting the server**

From the server folder:

```
dotnet run --project suite.web
```

## Other Information
You can safely ignore `suite.core` and `suite.app`