# Notas:

Este es un pequeño servidor de express listo para ejecutarse y servir la carpeta public en la web.

Recuerden que deben de reconstruir los módulos de node con el comando

```
npm install
```

Además para ejecutarlo con nodemon y que éste no se recargue cada vez que detecte que data.json ha cambiado (debido a que internamente se está escribiendo en él) debes de ejecutar nodemon de la sigueinte manera

```
 nodemon server/server.js -e js,html
```

Esto le indica a nodemon que solo este pendiente de los cambios en js y html