import { Outlet } from "@remix-run/react";
import styles from '~/styles/blog.css';

// Gracias a esta función de "links" cargan los estilos en los componentes hijos
export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    }
  ]
}

// Este componente sirve como Layout (No para presentar hacer una consulta con un loader por ejemplo)
function Blog() {
  return (
    <main className="contenedor">
      {/* Outlet es para que se renderice el contendo de index y de postUrl */}
      <Outlet />
    </main>
  )
}

export default Blog