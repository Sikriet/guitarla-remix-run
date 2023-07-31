import { useLoaderData } from "@remix-run/react";
import ListadoPosts from "~/components/listado-posts";
import { getPosts } from "~/models/posts.server";

export function meta() {
  return [
    { title: "GuitarLA - Nuestro Blog" },
    { description: "GuitarLA, Blog de música y venta de guitarras" }
  ]
}

// Este componente es el que carga la información
export async function loader() {
  const posts = await getPosts();

  return posts.data;
}

// Este componente es el que cargará al momento de ir a "/blog"
function Blog() {

  const posts = useLoaderData();

  return (
      <ListadoPosts posts={posts} />
  )
}

export default Blog