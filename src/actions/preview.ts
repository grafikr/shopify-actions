
export default async () => {
  return new Promise(((resolve, reject) => {
    setTimeout(() => {
      resolve('Resolved');
    }, 250);
  }));
}
