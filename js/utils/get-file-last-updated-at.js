import fs from 'fs'

const getFileLastUpdatedAt = (path) => {
  const stats = fs.statSync(path);
  return stats.mtime;
}

export default getFileLastUpdatedAt;
