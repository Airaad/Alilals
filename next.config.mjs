/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {},
    async redirects() {
        return [
            {
                source: '/career',
                destination: 'http://www.ziraat.in',
                permanent: true, 
            },
        ];
    },
};

export default nextConfig;
