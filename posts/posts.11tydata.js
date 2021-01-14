// const path = require('path');

// const getFileLastUpdatedAt = require('../js/utils/get-file-last-updated-at');
// const getReadableDate = require('../js/utils/get-readable-date');


module.exports = {
  permalink: "/posts/{{ page.date | date: '%Y/%m/%d' }}/{{ page.fileSlug }}/",
  ogType: "article",
  // eleventyComputed: {
  //   fileData: {
  //     lastModified: data => {
  //       const postPath = data.page.inputPath;
  //       const absoluteFilePath = path.join(__dirname, '..', postPath)
  //       const lastModifiedDateObj = getFileLastUpdatedAt(absoluteFilePath);
  //       const readableDate = getReadableDate(lastModifiedDateObj);
  //       return readableDate;
  //     }
  //   }
  // }
}
