import {useState} from "react";

export default function useFavourite(id) {
  if(typeof window !== 'undefined') {
    let favourites = JSON.parse(localStorage.getItem("favourites")) ?? [];

    let isFavourite = favourites.find((favourite) => favourite === id);

    const [favourite, setFavourite] = useState(isFavourite);

    const updateFavourite = () => {
      if (isFavourite) {
        const favouriteIndex = favourites.indexOf(id);

        if (favouriteIndex > -1) {
          favourites.splice(favouriteIndex, 1);
        }

        localStorage.setItem("favourites", JSON.stringify(favourites));
        setFavourite(false);
      } else {
        favourites.push(id);
        localStorage.setItem("favourites", JSON.stringify(favourites));
        setFavourite(true)
      }
    }

    return [
      favourite,
      updateFavourite,
    ]
  }

  return [
    false,
    () => {},
  ]
}