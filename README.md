# Central de turnos

La aplicación esta basada en un sistema de gestión de turnos, donde el usuario podrá elegir la especialidad, médico, fecha y hora para ser atendido. A su vez, poseé la sección de médico, donde el mismo, gestionará los turnos para atender a sus pacientes.

## Api

Para ejecutar la APi en la terminal del Visual Code o en una consola de node se debe ubicar en la raiz del proyecto de la API y escribi el comando 
npm run dev.
La api por default corren en http://localhost:3000

## Web

Para ejecutar la web en la terminal del Visual Code o en una consola de node se debe ubicar en la raiz del proyecto de la Web y escribir el comando
npm run start.
La web por default corren en http://localhost:4200/

## BD SQL Server

En la carpeta SQL se encuentra un script con el armado de las tablas de la base de datos y algunos datos incluidos.
* 1 Primero se debe crea en sql server la base llamda CentraldeTurnos y luego ejecutas el script que creara las tablas con algunos datos.

## Tips

La aplicación cuenta con una ruta para registrar medicos pero no se encuentra la vista del usuario Final
http://localhost:4200/registroMedico

También para agregar las especialidades de los medicos se realizan directamente modificando la base de datos.

Cuenta con un usuario final precargado
Usuario: joel@yopmail.com 
PASS: 1234546

Cuenta con un usuario médico precargado
Usuario: medico@yopmail.com 
PASS: 123456

