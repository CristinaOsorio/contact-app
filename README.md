# Proyecto de Gestión de Contactos - Front-End

Este repositorio contiene el front-end para la aplicación de gestión de contactos. Está construido utilizando Angular y Tailwind CSS, y proporciona una interfaz para interactuar con la API del back-end, permitiendo la visualización, creación y edición de registros de contactos.

## Índice

-   [Características](#características)
-   [Tecnologías](#tecnologías)
-   [Instalación](#instalación)
-   [Uso](#uso)

## Características

-   **Visualización de Contactos**: Página principal que lista todos los registros de contactos.
-   **Creación de Contactos**: Vista para agregar nuevos registros de contactos.
-   **Edición de Contactos**: Vista para actualizar los datos de los registros existentes.
-   **Gestión de Relaciones**: Capacidad de gestionar números de teléfono, correos electrónicos y direcciones asociadas a los contactos.

## Tecnologías

-   **Angular**: Framework para construir la interfaz de usuario.
-   **Tailwind CSS**: Biblioteca de utilidades para estilos y diseño.
-   **TypeScript**: Lenguaje de programación utilizado en el desarrollo.
-   **RxJS**: Biblioteca para la gestión de eventos y programación reactiva.
-   **HttpClient**: Módulo de Angular para realizar solicitudes HTTP a la API.

## Instalación

1. **Clonar el repositorio:**

    ```bash
    git clone https://github.com/CristinaOsorio/contact-app
    ```

2. **Navegar al directorio del proyecto:**

    ```bash
    cd contact-app
    ```

3. **Instalar `nvm` (Node Version Manager) [Opcional]:**

    Si prefieres usar `nvm` para gestionar versiones de Node.js, sigue las instrucciones en la [documentación oficial de nvm](https://github.com/nvm-sh/nvm#installing-and-updating) para instalarlo.

    Luego, instala la versión recomendada de Node.js especificada en el archivo `.nvmrc`:

    ```bash
    nvm install
    ```

    Asegúrate de usar la versión correcta con:

    ```bash
    nvm use
    ```

    **Nota:** Si no utilizas `nvm`, asegúrate de tener la versión recomendada de Node.js instalada. La versión requerida está especificada en el archivo `.nvmrc`.

4. **Instalar las dependencias:**

    ```bash
    npm install
    ```

5. **Configurar la URL de la API:**

    Edita el archivo `src/environments/environment.ts` y configura la URL de la API:

    ```typescript
    export const environment = {
        apiUrl: 'http://localhost:3000/api',
    };
    ```

6. **Iniciar el servidor de desarrollo:**

    ```bash
    ng serve
    ```

    La aplicación estará disponible en `http://localhost:4200`.

## Uso

Una vez que el servidor esté en funcionamiento, puedes interactuar con la aplicación en la página principal en `http://localhost:4200/contacts`. Desde allí, puedes:

-   **Ver la lista de contactos**: La página principal muestra una lista de todos los contactos almacenados en la base de datos.
-   **Crear un nuevo contacto**: Utiliza la vista lateral para agregar un nuevo contacto a la base de datos.
-   **Editar un contacto existente**: Usa la vista lateral para actualizar los detalles de un contacto seleccionado.
-   **Eliminar un contacto**: Utiliza la opción de eliminación para eliminar un contacto seleccionado.
