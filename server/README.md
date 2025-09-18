Perfecto, aquí tienes tu documentación actualizada para incluir el **uso de CQRS** junto con los otros componentes y sistemas que ya tenías:

---

## Arquitectura

Este proyecto implementa una arquitectura limpia basada en **Domain-Driven Design**, adaptada para ser ligera, modular y flexible.

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
Command / Query (CQRS)
↓
Service
↓
Repository
↓
DataSource (MongoDB)
↓
Mapper → Entity
```

---

### Componentes clave

| Componente        | Responsabilidad                                                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Entity`          | Representa entidades del dominio; maneja hooks `presave`, generación de `id` y timestamps.                                                       |
| `Mapper`          | Convierte entre `Entity` y objetos de persistencia (`PersistenceUser`) o exposición (`ExposedUser`).                                             |
| `Validator`       | Validaciones de negocio; subclases pueden funcionar como singletons con método estático `validate`.                                              |
| `Middleware`      | Clases abstractas que pueden modificar `Request` o retornar un `Response`. Se integran con Express mediante `splitMiddlewares`.                  |
| `Controller`      | Expone endpoints HTTP, recibe `Request` y devuelve `Response`.                                                                                   |
| `Service`         | Contiene lógica de negocio, no conoce HTTP ni MongoDB.                                                                                           |
| `Repository`      | Acceso a datos; transforma objetos de persistencia a entidades del dominio y viceversa.                                                          |
| `DataSource`      | Abstracción de la capa de persistencia; `MongoDataSource` maneja operaciones MongoDB de forma genérica.                                          |
| `Domain`          | Agrupa dependencias, controladores, servicios, event watchers, query handlers y command handlers en módulos independientes.                      |
| `CQRS`            | `QueryBus` y `CommandBus` despachan queries y commands a sus handlers; decoradores `@OnQuery` y `@OnCommand` registran handlers automáticamente. |
| `Decoradores DI`  | `@Injectable`, `@Inject`, `@Domain`, `@Controller`, `@Get`, `@Post` para resolver dependencias, registrar rutas y configurar módulos.            |
| `Event System`    | Permite comunicación desacoplada entre dominios; `EventBus`, `EventWatcher` y decoradores `@OnEvent` gestionan eventos.                          |
| `Custom Response` | Clases como `Ok`, `Created`, etc., encapsulan `status`, `body` y `headers` para estandarizar respuestas HTTP.                                    |

---

## Middlewares

- **Express Middlewares:** se ejecutan primero.
- **Custom Middlewares:** extienden `Middleware`, ejecutan lógica de negocio, validaciones o transformaciones, y pueden devolver un `Response` directamente.
- **Pipeline:** `ExpressMiddlewares → parseRequest → CustomMiddlewares → Controller → CQRS → Service`.

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

## CQRS (Command Query Responsibility Segregation)

El sistema CQRS separa operaciones de **lectura** y **escritura** para mayor claridad y desacoplamiento.

### Conceptos clave

- **Query**: Operaciones de lectura que devuelven datos, no modifican el estado.
- **Command**: Operaciones de escritura que modifican el estado; pueden devolver información relevante.
- **QueryBus / CommandBus**: Despachan queries y commands a sus handlers.
- **QueryHandler / CommandHandler**: Implementaciones de la lógica para cada query o command.
- **Decoradores**: `@OnQuery` y `@OnCommand` registran handlers automáticamente.

---

## Sistema de Eventos

Permite comunicación desacoplada entre dominios y módulos, siguiendo principios de **Event-Driven Architecture (EDA)**.

| Componente            | Responsabilidad                                                                             |
| --------------------- | ------------------------------------------------------------------------------------------- |
| `Event`               | Clase base para eventos; cada evento transporta un `payload` con información relevante.     |
| `EventBus`            | Centraliza emisión de eventos y registro de listeners (`emit` y `emitSync`).                |
| `EventWatcher`        | Escucha eventos y reacciona a ellos; se registra con `@EventWatcher`.                       |
| `@OnEvent()`          | Decorador para métodos dentro de un `EventWatcher`; vincula el método a un tipo de `Event`. |
| `ListenerData`        | Metadata que almacena la relación entre evento y método escuchador.                         |
| `loadEventWatchers()` | Registra todos los `EventWatcher` y enlaza sus métodos al `EventBus`.                       |

**Ejemplo:**

```ts
@EventWatcher()
export default class UsersEventWatcher {
  @OnEvent()
  public onUserCreated(event: UserCreatedEvent) {
    console.log(`User #${event.payload.id} created: ${event.payload.username}`);
  }
}
```

---

## Decoradores

- `@Domain()` → Define un módulo con dependencias y controladores.
- `@Controller()` → Define un controlador y su ruta base.
- `@Get()`, `@Post()`, etc. → Definen rutas dentro de un controlador.
- `@Inject()` → Inyección de dependencias en constructor.
- `@Injectable()` → Marca clases para inyección automática.
- `@EventWatcher()` → Marca clases para la escucha de eventos.
- `@OnEvent()` → Define un método específico para un tipo de evento.
- `@OnQuery()` → Define un método como query handler.
- `@OnCommand()` → Define un método como command handler.

---

## Resumen de Endpoints (Users)

| Método | Ruta           | Middlewares                                | Response          |
| ------ | -------------- | ------------------------------------------ | ----------------- |
| GET    | `/users/`      | Custom middlewares si aplica               | `Ok`              |
| POST   | `/users/`      | `BodyValidator.use(UserToCreateValidator)` | `Created`         |
| POST   | `/auth/login/` | Custom middlewares si aplica               | **En desarrollo** |

---

## Filosofía de diseño

- Las **Entities** son internas; nunca salen al controlador ni al datasource directamente.
- Los **DTOs y Mappers** garantizan separación entre persistencia, negocio y exposición.
- Los **Middlewares** pueden devolver una `Response` para abortar el flujo.
- La arquitectura es **modular**: agregar un dominio solo requiere añadirlo al arreglo `domains`.
- CQRS y eventos permiten desacoplamiento extremo y extensibilidad.

---

## Futuro

- Más validadores y middlewares reutilizables.
- Abstracción de DataSource para otros tipos de bases de datos.
- Sistema de logging más completo y métricas.
- Posible integración de eventos entre dominios externos.

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
2025-09-18T00:49:28.363Z (Shared) [info]: Connected to MongoDB
2025-09-18T00:49:28.370Z (Server) [info]: Registered route [GET] /users/:id
2025-09-18T00:49:28.370Z (Server) [info]: Registered route [POST] /users/
2025-09-18T00:49:28.371Z (Server) [info]: Registered route [POST] /auth/login
2025-09-18T00:49:28.372Z (Shared) [info]: Event watchers loaded
2025-09-18T00:49:28.373Z (Shared) [info]: Command handlers loaded
2025-09-18T00:49:28.373Z (Shared) [info]: Query handlers loaded
2025-09-18T00:49:28.381Z (Server) [info]: Server is running at http://localhost:3000
```

---

Si quieres, puedo hacer otra versión **con diagramas de flujo** mostrando cómo se mueve la información desde el HTTP request hasta la base de datos usando **CQRS y eventos**; eso suele hacer que el README quede mucho más visual.

¿Quieres que haga esa versión?
