import Link from 'next/link';
import {useEffect, useState} from "react";
import useGetFavourites from "../hooks/posts/get-favourites";

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const [favouritesArray, setFavouritesArray] = useState([]);

  const favourites = useGetFavourites();

  useEffect(() => {
    setFavouritesArray(favourites);
  }, []);

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem('posts')) ?? [];

    setPosts(posts);
  }, []);

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/auth/login">
              Login
            </Link>
          </li>

          <li>
            <Link href="/posts/create">Create Post</Link>
          </li>

          <li>
            <Link href="/notes">Notes</Link>
          </li>
        </ul>
      </nav>

      {
        posts.length > 0 && (
          <ul>
            { posts.map((post, index) => (
              <li key={index}>
                <ul>
                  <li>
                    <Link href={`/posts/${post.id}`}>
                      {post.title}
                    </Link>
                  </li>

                  <li>
                    {post.content}
                  </li>
                </ul>
              </li>
            )) }
          </ul>
        )
      }

      {
        favouritesArray.length > 0 && (
          <ul>
            { favouritesArray.map((favourite, index) => (
              <li key={index}>
                <Link href={`/posts/${favourite}`}>
                  {favourite}
                </Link>
              </li>
            )) }
          </ul>
        )
      }
    </div>
  );
}