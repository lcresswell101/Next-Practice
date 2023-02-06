export default function useGetFavourites() {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("favourites")) ?? [];
  }

  return [];
}