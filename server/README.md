## Arquitectura

Este proyecto implementa una arquitectura limpia basada en **Domain-Driven Design**, pero adaptada para ser ligera y flexible.

### Flujo principal

```

HTTP Request
↓
Express Middlewares
↓
parseRequest → Request
↓
Custom Middlewares
↓
Controller
↓
Service
↓
Repository
↓
DataSource (MongoDB)
↓
Mapper → Entity

```

### Componentes clave

| Componente        | Responsabilidad                                                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `Entity`          | Representa entidades del dominio; maneja hooks `presave`, generación de `id` y timestamps.                                     |
| `Mapper`          | Convierte entre `Entity` y objetos de persistencia (`PersistenceUser`) o exposición (`ExposedUser`).                           |
| `Validator`       | Validaciones de negocio, con posibilidad de usar subclases como singletons estáticos.                                          |
| `Middleware`      | Clases abstractas que pueden modificar `Request` o retornar un `Response`. Integradas con Express mediante `splitMiddlewares`. |
| `Controller`      | Expone endpoints HTTP, recibe `Request` y devuelve `Response`.                                                                 |
| `Service`         | Contiene lógica de negocio, no sabe nada de HTTP ni MongoDB.                                                                   |
| `Repository`      | Acceso a datos, transforma `PersistenceUser` a `User`.                                                                         |
| `DataSource`      | Abstracción de la capa de persistencia. Aquí MongoDataSource maneja todas las operaciones MongoDB.                             |
| `Domain`          | Agrupa dependencias, controladores y servicios en módulos independientes.                                                      |
| `Custom Response` | Clases como `Ok`, `Created`, etc., encapsulan `status`, `body` y `headers`.                                                    |

---

## Middlewares

- **Express Middlewares:** normales, se ejecutan primero.
- **Custom Middlewares:** extienden `Middleware`, ejecutan lógica de negocio, validaciones o transformaciones, y pueden devolver un `Response` directamente.
- **Pipeline:** `ExpressMiddlewares → parseRequest → CustomMiddlewares → Controller`.

Ejemplo de uso:

```ts
@Post("/", BodyValidator.use(UserToCreateValidator))
public async createUser(req: Request): Promise<Response> {
  const data: UserToCreate = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  };

  const created = await this.usersService.create(data);

  return new Created(created);
}
```

---

## DTOs

- `PersistenceUser` → para persistencia en MongoDB.
- `ExposedUser` → datos que se exponen a la API.
- `UserToCreate` → datos requeridos para creación.
- `UserToUpdate` → datos permitidos para actualización.

---

## MongoDB Integration

- `MongoConnectionFactory` → Singleton de conexión a MongoDB.
- `MongoDataSource<T>` → Clase abstracta con métodos `getAll`, `getOne`, `getById`, `create`, `update`, `delete`.
- `MongoUserDataSource` → Implementación específica para la colección `users`.

---

## Decoradores

- `@Domain()` → Define un módulo con dependencias y controladores.
- `@Controller()` → Define un controlador y su ruta base.
- `@Get()`, `@Post()`, etc. → Define rutas dentro de un controlador.
- `@Inject()` → Inyección de dependencias en constructor.
- `@Injectable()` → Marca clases para inyección automática.

---

## Resumen de Endpoints (Users)

| Método | Ruta      | Middlewares                                | Response  |
| ------ | --------- | ------------------------------------------ | --------- |
| GET    | `/users/` | Custom middlewares si aplica               | `Ok`      |
| POST   | `/users/` | `BodyValidator.use(UserToCreateValidator)` | `Created` |

---

## Filosofía de diseño

- Las **Entities** son internas, nunca salen al controlador ni al datasource directamente.
- Los **DTOs y Mappers** garantizan separación entre persistencia, negocio y exposición.
- Los **Middlewares** pueden devolver una `Response` para abortar el flujo.
- La arquitectura es **modular**: agregar un dominio solo requiere añadirlo al arreglo `domains`.

---

## Futuro

- Implementar **EventBus** para eventos de dominio.
- Agregar más validadores y middlewares reutilizables.
- Posible abstracción de DataSource para otros tipos de bases de datos.
- Sistema de logging más completo y métricas.

---

## Ejecución

```bash
# Compilar TypeScript
tsc

# Ejecutar servidor
node dist/server/index.js
```

Logs al iniciar:

```
[Shared] [info]: Connected to MongoDB
[Server] [info]: Registered route [GET] /users/:id
[Server] [info]: Registered route [POST] /users/
[Server] [info]: Server is running at http://localhost:3000
```

---
