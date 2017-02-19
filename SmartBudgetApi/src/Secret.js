export default (dbUser) => {
  const superSecret = process.env.SUPER_SECRET;
  const pathSecret = process.env.PATH_SECRET.split(',');
  return new Promise((resolve) =>
    resolve(pathSecret.reduce((acc, key) => acc.concat(dbUser[key]), [superSecret]).join('|'))
  );
};
