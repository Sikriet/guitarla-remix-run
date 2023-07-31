import imagen from "../../public/img/nosotros.jpg";
import styles from "~/styles/nosotros.css";
import { useOutletContext } from "@remix-run/react";

export function meta() {
  return [
    { title: "GuitarLA - Sobre Nosotros" },
    { description: "Venta de guitarras, Blog de música" },
  ];
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
    {
      rel: 'preload',
      href: imagen,
      as: 'image'
    },
  ];
}

function Nosotros() {

  const data = useOutletContext();

  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>
      <div className="contenido">
        <img src={imagen} alt="Imagen sobre nosotros" />

        <div>
          <p>
            Phasellus a vestibulum velit, in porta justo. Vestibulum finibus sem
            quis nunc rhoncus mollis. Nam ut lectus et tellus rutrum cursus.
            Etiam eu bibendum ipsum. Duis in dapibus lacus. Curabitur euismod
            orci tellus, mollis gravida ligula placerat vitae. Integer et
            consectetur elit, nec interdum nulla. Proin et lectus pharetra,
            porta velit sit amet, venenatis risus. Morbi bibendum diam eu diam
            ullamcorper, vel consectetur neque euismod. Pellentesque pulvinar
            scelerisque diam quis tempor. Aliquam tincidunt facilisis nulla, in
            molestie turpis dapibus eget. Nam ut ornare purus. Mauris quis nisl
            ut velit rhoncus auctor at in purus. Aliquam eu euismod tellus, ac
            ullamcorper tellus.
          </p>
          <p>
            Phasellus a vestibulum velit, in porta justo. Vestibulum finibus sem
            quis nunc rhoncus mollis. Nam ut lectus et tellus rutrum cursus.
            Etiam eu bibendum ipsum. Duis in dapibus lacus. Curabitur euismod
            orci tellus, mollis gravida ligula placerat vitae. Integer et
            consectetur elit, nec interdum nulla. Proin et lectus pharetra,
            porta velit sit amet, venenatis risus. Morbi bibendum diam eu diam
            ullamcorper, vel consectetur neque euismod. Pellentesque pulvinar
            scelerisque diam quis tempor. Aliquam tincidunt facilisis nulla, in
            molestie turpis dapibus eget. Nam ut ornare purus. Mauris quis nisl
            ut velit rhoncus auctor at in purus. Aliquam eu euismod tellus, ac
            ullamcorper tellus.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Nosotros;
