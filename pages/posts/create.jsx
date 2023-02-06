import {useEffect, useState} from "react";
import usePostCreate from "../../hooks/posts/create";
import {useRouter} from "next/router";

export default function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [save, setSave] = useState(false);

  const router = useRouter();

  const response = usePostCreate(save, title, content);

  const handleTitle = ({target}) => setTitle(target.value);
  const handleContent = ({target}) => setContent(target.value);

  useEffect(() => {
    if (save) {
      response
        .then(({post}) => {
          const posts = JSON.parse(localStorage.getItem('posts')) ?? [];

          posts.push({
            id: post.id,
            title: post.title,
            content: post.content,
          });

          localStorage.setItem('posts', JSON.stringify(posts));

          router.push('/');
        })
        .catch(error => setError(error))
        .finally(() => setSave(false));
    }
  }, [save]);

  return (
    <div>
      <h1>
        Create Post
      </h1>

      <input type="text" name="title" value={title} onChange={handleTitle}/>
      <input type="text" name="content" value={content} onChange={handleContent}/>

      <button type="button" onClick={() => setSave(true)}>
        Create Post
      </button>

      {error && (
        <p>
          {error.message}
        </p>
      )}
    </div>
  )
}