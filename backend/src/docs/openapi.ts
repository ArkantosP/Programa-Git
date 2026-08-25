export const openApiSpec = {
  openapi: '3.1.0',
  info: {
    title: 'MichiMochi API — Dedicated Backend',
    version: '1.0.0',
    description: `API REST centralizada para la plataforma MichiMochi (Web Desktop y Expo Mobile).
Provee servicios unificados de autenticación con JWT, integración con Firebase Admin SDK, catálogo de productos, cálculo de cobertura y gestión de pedidos.`,
    contact: {
      name: 'MichiMochi Development Team',
      email: 'dev@michimochi.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Servidor de Desarrollo Local',
    },
  ],
  tags: [
    {
      name: 'Auth',
      description: 'Endpoints de autenticación, registro, login con Google y gestión de sesión.',
    },
    {
      name: 'System',
      description: 'Verificación de estado y salud del servicio.',
    },
  ],
  paths: {
    '/health': {
      get: {
        tags: ['System'],
        summary: 'Health Check',
        description: 'Verifica el estado operacional del backend.',
        responses: {
          '200': {
            description: 'Servicio en línea y saludable.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'ok' },
                    service: { type: 'string', example: 'michimochi-backend' },
                    timestamp: { type: 'string', format: 'date-time' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Registro de nuevo usuario',
        description: 'Crea una cuenta en el sistema, registra el perfil en Firestore y devuelve una sesión JWT.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RegisterRequest',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Usuario registrado exitosamente con sesión iniciada.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AuthResponse',
                },
              },
            },
          },
          '400': {
            description: 'Error de validación de campos requeridos o formato incorrecto.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '409': {
            description: 'El correo electrónico ya se encuentra registrado.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Inicio de sesión con credenciales',
        description: 'Autentica a un usuario con correo y contraseña, emitiendo un JWT.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoginRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Autenticación exitosa.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AuthResponse',
                },
              },
            },
          },
          '400': {
            description: 'Campos requeridos no enviados.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '401': {
            description: 'Credenciales inválidas o cuenta inexistente.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/api/auth/google': {
      post: {
        tags: ['Auth'],
        summary: 'Inicio de sesión / Registro con Google',
        description: 'Verifica el ID Token emitido por el cliente OAuth de Google, sincroniza el perfil y retorna la sesión JWT.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/GoogleAuthRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Autenticación con Google exitosa.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AuthResponse',
                },
              },
            },
          },
          '401': {
            description: 'Token de Google inválido o expirado.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/api/auth/me': {
      get: {
        tags: ['Auth'],
        summary: 'Obtener perfil del usuario autenticado',
        description: 'Retorna los datos del usuario en sesión a partir del Bearer Token enviado en las cabeceras.',
        security: [
          {
            BearerAuth: [],
          },
        ],
        responses: {
          '200': {
            description: 'Datos del perfil recuperados.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    ok: { type: 'boolean', example: true },
                    data: {
                      type: 'object',
                      properties: {
                        user: { $ref: '#/components/schemas/UserProfile' },
                      },
                    },
                  },
                },
              },
            },
          },
          '401': {
            description: 'No autorizado / Token ausente o expirado.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Ingresa el token JWT obtenido al hacer login o registro. Ejemplo: `Bearer <token>`',
      },
    },
    schemas: {
      RegisterRequest: {
        type: 'object',
        required: ['fullName', 'email', 'password', 'acceptedTerms'],
        properties: {
          fullName: { type: 'string', example: 'Juan Pérez' },
          email: { type: 'string', format: 'email', example: 'juan.perez@example.com' },
          phone: { type: 'string', example: '3001234567' },
          address: { type: 'string', example: 'Calle 123 #45-67' },
          city: { type: 'string', example: 'Bogotá' },
          password: { type: 'string', format: 'password', example: 'Secr3t#2026' },
          acceptedTerms: { type: 'boolean', example: true },
        },
      },
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email', example: 'juan.perez@example.com' },
          password: { type: 'string', format: 'password', example: 'Secr3t#2026' },
        },
      },
      GoogleAuthRequest: {
        type: 'object',
        required: ['idToken'],
        properties: {
          idToken: { type: 'string', example: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjEy...' },
        },
      },
      UserProfile: {
        type: 'object',
        properties: {
          uid: { type: 'string', example: 'g8Xq9L2zK1...' },
          email: { type: 'string', format: 'email', example: 'juan.perez@example.com' },
          fullName: { type: 'string', example: 'Juan Pérez' },
          phone: { type: 'string', example: '3001234567' },
          address: { type: 'string', example: 'Calle 123 #45-67' },
          city: { type: 'string', example: 'Bogotá' },
          photoURL: { type: 'string', nullable: true, example: 'https://lh3.googleusercontent.com/...' },
          provider: { type: 'string', enum: ['password', 'google'], example: 'password' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      AuthResponse: {
        type: 'object',
        properties: {
          ok: { type: 'boolean', example: true },
          data: {
            type: 'object',
            properties: {
              user: { $ref: '#/components/schemas/UserProfile' },
              tokens: {
                type: 'object',
                properties: {
                  accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1Ni...' },
                  expiresIn: { type: 'string', example: '7d' },
                },
              },
            },
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          ok: { type: 'boolean', example: false },
          error: { type: 'string', example: 'Descripción detallada del error' },
          details: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: { type: 'string', example: 'email' },
                message: { type: 'string', example: 'Correo electrónico no válido' },
              },
            },
          },
        },
      },
    },
  },
};
