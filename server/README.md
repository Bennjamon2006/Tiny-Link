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

Claro, aquí tienes la tabla actualizada con los componentes que has integrado recientemente, incluyendo el sistema de eventos y los decoradores de DI:

---

### Componentes clave

| Componente        | Responsabilidad                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `Entity`          | Representa entidades del dominio; maneja hooks `presave`, generación de `id` y timestamps.                                            |
| `Mapper`          | Convierte entre `Entity` y objetos de persistencia (`PersistenceUser`) o exposición (`ExposedUser`).                                  |
| `Validator`       | Validaciones de negocio; subclases pueden funcionar como singletons con método estático `validate`.                                   |
| `Middleware`      | Clases abstractas que pueden modificar `Request` o retornar un `Response`. Se integran con Express mediante `splitMiddlewares`.       |
| `Controller`      | Expone endpoints HTTP, recibe `Request` y devuelve `Response`.                                                                        |
| `Service`         | Contiene lógica de negocio, no conoce HTTP ni MongoDB.                                                                                |
| `Repository`      | Acceso a datos; transforma objetos de persistencia a entidades del dominio y viceversa.                                               |
| `DataSource`      | Abstracción de la capa de persistencia; `MongoDataSource` maneja operaciones MongoDB de forma genérica.                               |
| `Domain`          | Agrupa dependencias, controladores, servicios y event watchers en módulos independientes y autocontenidos.                            |
| `Decoradores DI`  | `@Injectable`, `@Inject`, `@Domain`, `@Controller`, `@Get`, `@Post` para resolver dependencias, registrar rutas y configurar módulos. |
| `Custom Response` | Clases como `Ok`, `Created`, etc., encapsulan `status`, `body` y `headers` para estandarizar respuestas HTTP.                         |

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

Perfecto, aquí tienes el apartado agregado a tu documentación:

---

### Sistema de Eventos

El sistema de eventos permite la comunicación desacoplada entre distintos dominios y módulos de la aplicación, siguiendo un enfoque inspirado en Event-Driven Architecture (EDA).

| Componente            | Responsabilidad                                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `Event`               | Clase base para todos los eventos; cada evento puede transportar un `payload` con la información relevante.        |
| `EventBus`            | Centraliza la emisión de eventos y el registro de listeners; ofrece métodos `emit` y `emitSync`.                   |
| `EventWatcher`        | Clases que escuchan eventos; se registran automáticamente mediante el decorador `@EventWatcher`.                   |
| `@OnEvent()`          | Decorador para métodos dentro de un `EventWatcher`; vincula el método a un tipo específico de `Event`.             |
| `ListenerData`        | Metadata interna que almacena la relación entre evento y método escuchador.                                        |
| `loadEventWatchers()` | Función que recorre todos los dominios, registra instancias de `EventWatcher` en el `EventBus` y enlaza listeners. |

**Flujo básico de eventos:**

1. Un dominio o servicio emite un evento usando `EventBus.emit(event)`.
2. El `EventBus` identifica todos los listeners registrados para el tipo de evento.
3. Cada `EventWatcher` correspondiente ejecuta su método asociado al evento, pasando el `payload` recibido.
4. Esto permite que diferentes dominios reaccionen a cambios sin depender directamente unos de otros.

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

Este mecanismo permite **extender la funcionalidad de la aplicación** sin modificar los módulos emisores, cumpliendo con los principios de **Open-Closed** y manteniendo un diseño **SOLID** y altamente testeable.

---

## Decoradores

- `@Domain()` → Define un módulo con dependencias y controladores.
- `@Controller()` → Define un controlador y su ruta base.
- `@Get()`, `@Post()`, etc. → Define rutas dentro de un controlador.
- `@Inject()` → Inyección de dependencias en constructor.
- `@Injectable()` → Marca clases para inyección automática.
- `@EventWatcher()` → Marca clases para la escucha de eventos
- `@OnEvent` → Define un método específico para escuchar cierto tipo de evento. (El tipo de evento se infiere en el tipo de dato del **único** parámetro)

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
