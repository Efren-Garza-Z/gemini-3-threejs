/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/proxy/:path*',
                destination: 'https://educational-platforms-back-727266244738.us-central1.run.app/:path*',
            },
        ];
    },
};

export default nextConfig;