import { useState, useEffect } from "react";
import {
  Meta,
  Links,
  Outlet,
  Scripts,
  LiveReload,
  useRouteError,
  isRouteErrorResponse,
  Link,
} from "@remix-run/react";
import styles from "~/styles/index.css";
import Header from "~/components/header";
import Footer from "~/components/footer";

export function meta({ data }) {
  return [
    { charset: "utf-8" },
    { title: "GuitarLA - Remix" },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
  ];
}

// Se reomienda uilizar esta función para el uso hojas de estilos
export function links() {
  return [
    // Normalize
    {
      rel: "stylesheet",
      href: "https://necolas.github.io/normalize.css/8.0.1/normalize.css",
    },
    // Fuente de Google Fonts
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      // Es necesario pasarlo como string
      crossOrigin: "true",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Krub:wght@400;700&family=Lato:wght@400;700;900&family=Outfit:wght@400;700;900&display=swap",
    },
    // CSS Local
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

export default function App() {
  // El código de "typeof window !== undefined" quiere decir que si el código es del servidor, entonces no haga nada (null)
  // Pero si es del navegador, entonces agrega el localStorage
  const carritoLS =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("carrito")) ?? []
      : null;
  const [carrito, setCarrito] = useState(carritoLS);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarCarrito = (guitarra) => {
    // "some" itera sobre los elementos que hay en el carrito
    // "guitarraState" es lo que está en memoria
    // "guitarra" viene desde guitarraUrl
    // Retorna un true en caso de que algún elemento del arreglo cumpla con la condición
    if (carrito.some((guitarraState) => guitarraState.id === guitarra.id)) {
      // Iterar sobre el arreglo e identificar el elemento duplicado
      const carritoActualizado = carrito.map((guitarraState) => {
        if (guitarraState.id === guitarra.id) {
          // Reescribir la cantidad
          guitarraState.cantidad = guitarra.cantidad;
        }
        return guitarraState;
      });
      // Añadir al carrito el objeto modificado a partir de "carrito"
      setCarrito(carritoActualizado);
    } else {
      // Registro Nuevo, agregar al carrito
      // Se toma una copia de lo que hay en "carrito" y se le agrega el objeto "guitarra" con los datos
      setCarrito([...carrito, guitarra]);
    }
  };

  const actualizarCantidad = (guitarra) => {
    const carritoActualizado = carrito.map((guitarraState) => {
      if (guitarraState.id === guitarra.id) {
        guitarraState.cantidad = guitarra.cantidad;
      }
      return guitarraState;
    });
    setCarrito(carritoActualizado);
  };

  const eliminarGuitarra = (id) => {
    const carritoActualizado = carrito.filter(
      (guitarraState) => guitarraState.id !== id
    );
    setCarrito(carritoActualizado);
  };

  return (
    <Document>
      <Outlet
        context={{
          agregarCarrito,
          carrito,
          actualizarCantidad,
          eliminarGuitarra,
        }}
      />
    </Document>
  );
}

// "Document" viene siendo el Layout principal (Se recomienda nombrarlo como "Document")
function Document({ children }) {
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        {/* Mejor performance */}
        <Scripts />
        {/* Obtener una recarga automatica al hacer cambios */}
        <LiveReload />
      </body>
    </html>
  );
}

// Manejo de errores
export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Document>
        <div>
          <p className="error">
            {error.status} {error.statusText}
          </p>
          <Link className="error-enlace" to="/">
            Tal vez quieras volver a la página principal
          </Link>
        </div>
      </Document>
    );
  } else {
    return (
      <Document>
        <div>
          <p className="error">Error Desconocido</p>
          <Link className="error-enlace" to="/">
            Tal vez quieras volver a la página principal
          </Link>
        </div>
      </Document>
    );
  }
}
