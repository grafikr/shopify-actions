import downloadNgrok from 'ngrok/download';

// eslint-disable-next-line import/prefer-default-export
export const updateNgrokBinary = () => new Promise(((resolve, reject) => {
  downloadNgrok((error) => {
    if (error) {
      reject(error);
    }

    resolve(true);
  });
}));
