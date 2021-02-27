import Head from 'next/head';
import sanitizeHtml from 'sanitize-html';
// type should be website for the app & Profile for the portfolio.
/*
    Those must be exported from the API.
    profile:first_name - string - A name normally given to an individual by a parent or self-chosen.
    profile:last_name - string - A name inherited from a family or marriage and by which the individual is commonly known.
    profile:username - string - A short unique string to identify them.
    profile:gender - enum(male, female) - Their gender.
    og:locale should depend on the portfolio so it must be exposed by the API.
 */
export const CanonicalMetadata = ({ title, image, description, url, type }) => {
    return (
        <Head>
            <meta charset="utf-8" />
            <title>{title}</title>
            <meta name="title" content={title} />
            <link rel="shortlink" href={url} />
            <link rel="canonical" href={url} />
            <meta name="description" content={description} />
            <meta name="MobileOptimized" content="width" />
            <meta name="HandheldFriendly" content="true" />
            <meta property="og:title" content={title} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content={image} />
            <meta property="og:locale" content={image} />
        </Head>
    );
};

export const Schema = ({ description, title }) => {
    const ldObject = {
        '@context': 'https://schema.org',
        '@id': '#product',
        '@type': 'IndividualProduct',
        additionalType: 'https://onbranding.tech',
        description: description,
        category: 'online presence service',
        model: 'Portfolio or Personal Website',
        name: title,
    };
    return (
        <Head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(ldObject) }}
            />
        </Head>
    );
};
