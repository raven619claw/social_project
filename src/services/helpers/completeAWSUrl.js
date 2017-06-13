module.exports = (fileArray) => {
    let processedURL = [];
    fileArray.forEach((fileName) => {
        processedURL.push(process.env.AWS_BUCKET_BASE_URL + fileName);
    });
    return processedURL;
};
