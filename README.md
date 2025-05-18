## Funcionalidades

### Gestión de Clientes
- Registrar, ver, editar y eliminar clientes (nombre, correo, teléfono)  
- Validación de correo único  
- Visualizar historial completo de reservas por cliente  

### Reservas de Mesas
- Crear, modificar y cancelar reservas seleccionando:  
  - Cliente registrado  
  - Fecha, hora y número de comensales  
  - Asignación de mesa disponible  
- Verificación en tiempo real para evitar doble reserva  
- Liberación automática de mesa al cancelar  

### Panel de Disponibilidad
- Vista de calendario con disponibilidad de mesas por fecha, hora y tamaño de grupo  
- Conteo de mesas disponibles por franja horaria  
- Alertas de “Sin disponibilidad” cuando esté completo  

### Administración de Reservas
- Listado de reservas del día con cliente, fecha, hora y número de comensales  
- Modificar hora, tamaño de grupo o mesa asignada  
- Cancelar reservas y actualizar disponibilidad al instante  

### Notificaciones por Email
- Envío automático de correo al crear o modificar reserva  
- Email con nombre del cliente, fecha, hora, comensales y número de mesa  

### Historial de Reservas
- Consulta de todas las reservas pasadas por cliente (confirmadas o canceladas)  
- Filtros por cliente o rango de fechas  

### Seguridad y Acceso
- Login seguro exclusivo para administradores  
- Solo administradores pueden gestionar clientes y reservas  

### Datos y Rendimiento
- Base de datos relacional:  
  - **Clientes** (id, nombre, correo, teléfono)  
  - **Mesas** (id, capacidad, estado)  
  - **Reservas** (id, cliente_id, mesa_id, fecha_hora, comensales, estado)  
- Consultas de disponibilidad en tiempo real  
- UI de escritorio responsiva y sin latencia  
