module.exports = (fileArray) => {
    let processedURL = [];
    fileArray.forEach((fileName) => {
    	fileName.properties.url = process.env.AWS_BUCKET_BASE_URL + fileName.properties.url;
        processedURL.push(fileName.properties);
    });
    return processedURL;
};
