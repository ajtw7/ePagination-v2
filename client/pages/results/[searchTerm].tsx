// pages/results/[searchTerm].tsx
import React, { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useRouter } from 'next/router';
import { fetchResults } from '../../services/resultsService';
import Link from 'next/link';

const ResultsPage = () => {
    const router = useRouter();
    const { searchTerm } = router.query;
    const [page, setPage] = useState(1);

    const {
        data: results,
        error,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        status,
    } = useInfiniteQuery(
        ['results', { searchTerm }],
        fetchResults,
        {
            keepPreviousData: true,
            getNextPageParam: (lastPage, results) => {
                const allPages = results.flatMap((page) => page.results);
                if (lastPage.numFound > results.length) {
                    return allPages.length + 1;
                }
                return undefined;
            },
        }
    );

    if (status === 'loading') {
        return <div>Loading...</div>;
    } else if (status === 'error') {
        if (error instanceof Error) {
            return <div>Error: {error.message}</div>;
        } else {
            return <div>An unknown error occurred</div>;
        }
    } else if (status === 'success') {
        return (
            <div className="search-results-landing">
                <h1>Search Results for "{searchTerm}"</h1>
                <hr />
                <div className="search-results-container">
                    {results.pages.flatMap(page => page.results).map(result => {
                        const { cover_i, key, title, author_name, cover_edition_key } = result;
                        return (
                            <div className="search-results-return" key={cover_edition_key}>
                                {cover_edition_key && (
                                    <div className="individual-result" key={cover_edition_key}>
                                        <h4>{title}</h4>
                                        <h4>{author_name && author_name.join(', ')}</h4>
                                        <img
                                            id="book-image"
                                            alt="cover not found"
                                            src={`https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`}
                                        />
                                        <Link href={`/book-details/${key.slice(7)}/${cover_edition_key}`}>
                                            Details
                                        </Link>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    <div>
                        <button
                            onClick={() => setPage((old) => Math.max(old - 1, 0))}
                            disabled={page === 1}
                        >
                            Previous Page
                        </button>
                        <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
                            {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'Nothing more to load'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

export default ResultsPage;