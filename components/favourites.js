import useFavourite from "../hooks/posts/favourite";
import {useEffect, useRef} from "react";

export default function Favourite({ id }) {
  const [favourite, setFavourite] = useFavourite(id);
  const dialog = useRef();

  useEffect(() => {
    if (favourite) {
      dialog.current.showModal();
    }

    return () => dialog.current.close();
  }, [favourite])

  return (
    <>
      <dialog ref={dialog}>
        Favourited!

        <button onClick={() => setFavourite()}>Unfavourite</button>
      </dialog>

      <u onClick={() => setFavourite()} style={{cursor: "pointer"}}>
        {favourite ? 'Unfavourite' : 'Favourite'}
      </u>
    </>
  )
}