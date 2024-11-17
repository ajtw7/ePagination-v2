export const fetchResults = async ({ queryKey, pageParam = 1 }) => {
    const [_key, { searchTerm }] = queryKey;
    const limit = 6;
    const res = await fetch(
        `https://openlibrary.org/search.json?title=${searchTerm}&page=${pageParam}&limit=${limit}`
    );
    const data = await res.json();
    console.log('fetched:', data);
    return { results: data.docs, numFound: data.numFound };
};
