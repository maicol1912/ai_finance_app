## Arquitectura

src/
├── modules/                    # Módulos de la aplicación
│   src/
├── modules/
│   ├── expense/
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   └── expense.entity.ts
│   │   │   ├── interfaces/
│   │   │   │   ├── repositories/
│   │   │   │   │   └── expense.repository.interface.ts
│   │   │   │   └── services/
│   │   │   │       └── expense.service.interface.ts    # única definición de interface de servicio
│   │   │   └── value-objects/
│   │   │       ├── amount.value-object.ts
│   │   │       └── category.value-object.ts
│   │   │
│   │   ├── application/
│   │   │   ├── commands/
│   │   │   │   ├── interfaces/
│   │   │   │   │   ├── create-expense.command.interface.ts
│   │   │   │   │   └── update-expense.command.interface.ts
│   │   │   │   ├── handlers/
│   │   │   │   │   ├── create-expense.handler.ts
│   │   │   │   │   └── update-expense.handler.ts
│   │   │   │   └── implementations/
│   │   │   │       ├── create-expense.command.ts
│   │   │   │       └── update-expense.command.ts
│   │   │   │
│   │   │   ├── queries/
│   │   │   │   ├── interfaces/
│   │   │   │   │   ├── get-expense.query.interface.ts
│   │   │   │   │   └── list-expenses.query.interface.ts
│   │   │   │   ├── handlers/
│   │   │   │   │   ├── get-expense.handler.ts
│   │   │   │   │   └── list-expenses.handler.ts
│   │   │   │   └── implementations/
│   │   │   │       ├── get-expense.query.ts
│   │   │   │       └── list-expenses.query.ts
│   │   │   │
│   │   │   ├── events/
│   │   │   │   ├── interfaces/
│   │   │   │   │   ├── expense-created.event.interface.ts
│   │   │   │   │   └── expense-updated.event.interface.ts
│   │   │   │   ├── handlers/
│   │   │   │   │   ├── expense-created.handler.ts
│   │   │   │   │   └── expense-updated.handler.ts
│   │   │   │   └── implementations/
│   │   │   │       ├── expense-created.event.ts
│   │   │   │       └── expense-updated.event.ts
│   │   │   │
│   │   │   └── services/
│   │   │       └── implementations/           # solo implementaciones aquí
│   │   │           └── expense.service.ts
│   │   │
│   │   ├── infrastructure/
│   │   │   ├── persistence/
│   │   │   │   ├── repositories/
│   │   │   │   │   └── expense.repository.ts
│   │   │   │   └── schemas/
│   │   │   │       └── expense.schema.ts
│   │   │   └── external/
│   │   │       └── services/
│   │   │           └── notification.service.ts
│   │   │
│   │   ├── api/
│   │   │   ├── http/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── expense.controller.ts
│   │   │   │   └── dtos/
│   │   │   │       ├── create-expense.dto.ts
│   │   │   │       └── update-expense.dto.ts
│   │   │   ├── graphql/
│   │   │   │   ├── resolvers/
│   │   │   │   │   └── expense.resolver.ts
│   │   │   │   └── types/
│   │   │   │       └── expense.type.ts
│   │   │   └── websocket/
│   │   │       └── gateways/
│   │   │           └── expense.gateway.ts
│   │   │
│   │   └── expense.module.ts
│   │
│   ├── user/                 # Módulo de usuarios
│   │   └── [misma estructura que expense]
│   │
│   ├── investment/           # Módulo de inversiones
│   │   └── [misma estructura que expense]
│   │
│   └── market/              # Módulo de mercados
│       └── [misma estructura que expense]
│
├── shared/                   # Código compartido entre módulos
│   ├── infrastructure/       # Infraestructura común
│   │   ├── database/        # Configuración de base de datos
│   │   ├── cache/          # Configuración de caché
│   │   └── queue/          # Configuración de colas
│   ├── interfaces/          # Interfaces comunes
│   │   └── http/           # Middlewares, interceptors, etc.
│   └── utils/              # Utilidades comunes
│
├── config/                  # Configuraciones
│   ├── app.config.ts       # Configuración de la aplicación
│   ├── database.config.ts  # Configuración de base de datos
│   └── swagger.config.ts   # Configuración de documentación
│
└── main.ts                 # Punto de entrada de la aplicación