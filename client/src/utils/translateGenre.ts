export const translateGenre = (genre: string): string => {
    const genreMap: { [key: string]: string } = {
        'history': 'Историческое',
        'horror': 'Ужасы',
        'scifi': 'Научная фантастика',
        'sci-fi': 'Научная фантастика',
        'stand-up': 'Стендап',
        'fantasy': 'Фантастика',
        'drama': 'Драма',
        'mystery': 'Детектив',
        'family': 'Семейное',
        'comedy': 'Комедия',
        'romance': 'Мелодрама',
        'music': 'Музыкальный',
        'crime': 'Криминал',
        'tv-movie': 'Телефильм',
        'documentary': 'Документальный',
        'action': 'Боевик',
        'thriller': 'Триллер',
        'western': 'Вестерн',
        'animation': 'Мультфильм',
        'war': 'Военный',
        'adventure': 'Приключения'
    };
    
    return genreMap[genre.toLowerCase()] || genre;
}
