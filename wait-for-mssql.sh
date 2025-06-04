#!/bin/bash
# Espera a que SQL Server esté disponible en el puerto 1433

echo "⏳ Esperando a que SQL Server esté disponible..."

until nc -z $DB_HOST $DB_PORT; do
  sleep 2
done

echo "✅ SQL Server está listo. Iniciando backend..."

exec "$@"