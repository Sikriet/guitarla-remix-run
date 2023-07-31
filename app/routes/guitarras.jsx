import { Outlet, useOutletContext } from "@remix-run/react";
import styles from "~/styles/guitarras.css";

// Los estilos cargarán tanto en guitarraUrl como en el index de guitarras
export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

// Componente Padre
function Tienda() {
  return (
    <main className="contenedor">
      <Outlet
        context={useOutletContext()}
      />
    </main>
  );
}

export default Tienda;
