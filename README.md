# Centralturnos

la Aplicacion se encuentra en el branch APIyWEB

## Api

Para ejecutar la APi en la terminal del Visual Code o en una consola de node se debe ubicar en la raiz del proyecto de la API y escribi el comando 
npm run dev.
La api por default corren en http://localhost:3000

## WEB

Para ejecutar la web en la terminal del Visual Code o en una consola de node se debe ubicar en la raiz del proyecto de la WEB y escribir el comando
npm run start 
La web por default corren en http://localhost:4200/

## BD SQL SERVER

En la Carpeta SQL se encuentra un script con el armado de las tablas de la base de datos y algunos datos incluidos
* 1 Primero se debe crea en sql server la base llamda CentraldeTurnos y luego ejecutas el script que creara las tablas con algunos datos

## Tips

La aplicacion cuenta con una ruta para registrar medicos pero no se encuentra la vista del usuario Final
http://localhost:4200/registroMedico

Tambien para agregar las especialidades de los medicos se realizan directamente modificando la base de datos

Cuenta con un usuario final precargado
Usuario: joel@yopmail.com 
PASS: 1234546

Cuenta con un usaurio Medico precargado
Usuario: medico@yopmail.com 
PASS: 123456

