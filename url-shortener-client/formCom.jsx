import React, { useState } from 'react';
import axios from 'axios';

const UrlShortener = () => {
    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('/api/shorten', { url });
        setShortUrl(response.data.short_url);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} required />
                <button type="submit">Shorten</button>
            </form>
            {shortUrl && <p>Shortened URL: {shortUrl}</p>}
        </div>
    );
};

export default UrlShortener;
