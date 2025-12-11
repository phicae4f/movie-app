
export const getGenreImage = (genre: string): string => {
    const genreImages: { [key: string]: string } = {
        'history': '/img/desktop/history-img.jpg',
        'horror': '/img/desktop/default-img.jpg',
        'scifi': '/img/desktop/default-img.jpg',
        'sci-fi': '/img/desktop/default-img.jpg',
        'stand-up': '/img/desktop/comedy-img.jpg',
        'fantasy': '/img/desktop/fantasy-img.jpg',
        'drama': '/img/desktop/drama-img.jpg',
        'mystery': '/img/desktop/detective-img.jpg',
        'family': '/img/desktop/family-img.jpg',
        'comedy': '/img/desktop/comedy-img.jpg',
        'romance': '/img/desktop/default-img.jpg',
        'music': '/img/desktop/default-img.jpg',
        'crime': '/img/desktop/default-img.jpg',
        'tv-movie': '/img/desktop/default-img.jpg',
        'documentary': '/img/desktop/default-img.jpg',
        'action': '/img/desktop/default-img.jpg',
        'thriller': '/img/desktop/thriller-img.jpg',
        'western': '/img/desktop/default-img.jpg',
        'animation': '/img/desktop/default-img.jpg',
        'war': '/img/desktop/default-img.jpg',
        'adventure': '/img/desktop/adventure-img.jpg'
    };
    
    return genreImages[genre.toLowerCase()] || '/img/desktop/default-img.jpg';
}