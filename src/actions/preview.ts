export default async () => new Promise(((resolve, reject) => {
  setTimeout(() => {
    resolve('Resolved');
  }, 250);
}));
