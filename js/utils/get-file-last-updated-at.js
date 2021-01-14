const fs = require('fs');

const getFileLastUpdatedAt = (path) => {
  const stats = fs.statSync(path);
  return stats.mtime;
}

module.exports = getFileLastUpdatedAt;
