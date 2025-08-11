import React, { useState } from 'react';
import axios from 'axios';

const UrlShortener = () => {
    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/shorten', { url });
            setShortUrl(response.data.short_url);
        } catch (error) {
            console.error('Error shortening the URL:', error);
        }
    };

    return (
        <div>
            <h1>URL Shortener</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    placeholder="Enter your long URL"
                />
                <button type="submit">Shorten</button>
            </form>
            {shortUrl && (
                <div className="shortened-url">
                    <p>Shortened URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
                </div>
            )}
        </div>
    );
};

export default UrlShortener;
