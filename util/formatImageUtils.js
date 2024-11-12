const MINIO_URL = process.env.NEXT_PUBLIC_MINIO_URL;

const formatImageUrl = (url) => {
    // replace localhost with minio url
    return url.replace('http://localhost:9000', MINIO_URL);
}

export { formatImageUrl };