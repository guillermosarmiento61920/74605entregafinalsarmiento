# AdoptMe - Proyecto Backend III

Este es un proyecto para Curso de Backend III, desarrollado con Node, Express y MongoDB. Permite registrar usuarios, subir documentos, adoptar mascotas y mas. La API está documentada con Swagger y es testeada con Mocha, Chai y Supertest.

---

## Ejecutar en Docker

### 1. Crear la imagen

```bash
docker build -t adoptme-backend-sarmiento .
docker run -p 5000:5000 adoptme-backend-sarmiento
```

Imagen en DockerHub: https://hub.docker.com/repository/docker/guillermosarmiento61920/adoptme-backend-sarmiento/general
