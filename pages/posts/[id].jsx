import Link from 'next/link';
import Favourite from "../../components/favourites";
import dynamic from "next/dynamic";

export default function Post({ post }) {
  const Favourite = dynamic(() => import("../../components/favourites"), {ssr: false});

  return (
    <div>
      <Link href="/">
        Home
      </Link>

      <br/>

      <Favourite id={post.id} />

      <h1>
        {post.title}
      </h1>

      <p>
        {post.content}
      </p>
    </div>
  )
}

export async function getStaticPaths() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post`);

  const {posts} = await response.json();

  const paths = posts.map(post => ({
    params: {
      id: post.id.toString(),
    },
  }));

  return {paths, fallback: false};
}

export async function getStaticProps({params}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/${params.id}`);

  const {post} = await response.json();

  return {
    props: {
      post
    },
  }
}