import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        const fetchUrls = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/urls');
                setUrls(response.data);
            } catch (error) {
                console.error('Error fetching URLs:', error);
            }
        };
        fetchUrls();
    }, []);

    return (
        <div>
            <h1>Admin - Shortened URLs</h1>
            {urls.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Original URL</th>
                            <th>Short Code</th>
                            <th>Visits</th>
                        </tr>
                    </thead>
                    <tbody>
                        {urls.map((url) => (
                            <tr key={url.short_code}>
                                <td>{url.original_url}</td>
                                <td>{url.short_code}</td>
                                <td>{url.visits}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No URLs found.</p>
            )}
        </div>
    );
};

export default Admin;
