Buen dia,

Para ejecutar esta api, primero debe ejecutar npm install para instalar todas las dependencias del proyecto. Posterior a ello ejecutar el comando npm run dev para correr el servidor. 

En la ruta /api/docs se encuentra toda la documentacion para los endpoints. 

Para ejecutar el dockerfile, primero debe ejecutar el comando: docker build -t technical-test .

Seguido de docker stack deploy -c docker-compose.yml technical-test.

Es requerido tener una base de datos local con las tablas creadas. 

Video de la ejecución del reto: https://www.youtube.com/watch?v=a03kJaUlXew

