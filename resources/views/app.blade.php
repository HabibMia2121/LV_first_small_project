<!DOCTYPE html>
<html >
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>LV-Project</title>

        @vite('resources/css/app.css')
    </head>
    <body>
        <div id="app">
            <app-header class="mb-3"></app-header>
            <router-view></router-view>
        </div>




        @vite('resources/js/app.js')
    </body>
</html>
