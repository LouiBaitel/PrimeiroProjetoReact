export const loadPosts = async () =>{
    //----------- Populando posts atraves de API ------------
    // Utilizado a Fetch API: https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API
    // Utilizado o JSONPlaceholder para dados: https://jsonplaceholder.typicode.com
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');

    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

    const postsJSON = await posts.json();
    const photosJSON = await photos.json();

    const postsAndPhotos = postsJSON.map((posts, index) => {
      return { ...posts, cover: photosJSON[index].url}
    });

    return postsAndPhotos;
}