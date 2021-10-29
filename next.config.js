module.exports = {
    async rewrites() {
        return [
            // Proxy to server
            { source: '/:path*', destination: 'http://localhost:3001/:path*' }
        ];
    }
};