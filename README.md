# Michelangelo
Proyecto de Ingeniería de Software. Año 2026, periodo de semestre 2.

## Requisitos
- Base de datos PostgreSQL (accesible)
- Node.js


## Instalacion
### Clonar repo

```bash
git clone https://github.com/khalel2401/Michelangelo.git

cd Michelangelo
```
### Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edita `.env` con los datos de tu base de datos PostgreSQL:

```
DATABASE_URL="postgresql://usuario:password@localhost:5432/zooapi?schema=public"
PORT=3000
```

Inicia la base de datos de prisma y genera los datos de ejemplo

```bash
npx prisma migrate dev
npx prisma db seed
npm run dev
```

El servidor queda disponible en `http://localhost:3000`. Verifica que `GET http://localhost:3000/api/usuarios` devuelva datos.

### frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

Se abre en `http://localhost:5173`. Si cambiaste el puerto del backend, actualiza `API_URL` en `frontend/src/api/config.js`.