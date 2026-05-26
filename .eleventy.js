module.exports = function (eleventyConfig) {
    eleventyConfig.addFilter("whereActive", (items = []) => {
        if (!Array.isArray(items)) return [];

        return items.filter((item) => item && item.active !== false);
    });

    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/img");
    eleventyConfig.addPassthroughCopy("src/downloads");
    eleventyConfig.addPassthroughCopy("src/fonts");
    eleventyConfig.addPassthroughCopy("src/projects");
    
    // PWA files
    eleventyConfig.addPassthroughCopy("src/site.webmanifest");
    eleventyConfig.addPassthroughCopy("src/sw.js");
    
    return {
        dir: {
            input: "src", // Source files
            output: "public", // Output files
        },
    };
};
