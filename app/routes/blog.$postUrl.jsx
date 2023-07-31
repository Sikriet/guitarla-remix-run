import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { getPost } from "~/models/posts.server";
import { formatearFecha } from "~/utils/helpers";

export function meta({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return [
      { title: "GuitarLA - Entrada no encontrada" },
      { description: "Guitarras, venta de guitarras, entrada no encontrada" },
    ];
  }

  return [
    { title: `GuitarLA - ${data.data[0].attributes.titulo}` },
    {
      description: `Guitarras, venta de guitarras, entrada ${data.data[0].attributes.titulo}`,
    },
  ];
}

// Este componente carga información
export async function loader({ params }) {
  const { postUrl } = params;
  const post = await getPost(postUrl);
  // Si no encuentra la guitarra lanza un error
  if (post.data.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Entrada no encontrada",
      data: {},
    });
  }

  return post;
}

function Post() {
  const post = useLoaderData();
  const { titulo, contenido, imagen, publishedAt } = post?.data[0]?.attributes;

  return (
    <article className="post mt-3">
      <img
        src={imagen?.data?.attributes?.url}
        alt={`Imagen blog ${titulo}`}
        className="imagen"
      />
      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">{formatearFecha(publishedAt)}</p>
        <p className="texto">{contenido}</p>
      </div>
    </article>
  );
}

export default Post;
