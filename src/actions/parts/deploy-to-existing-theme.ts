import { deploy } from '../../helpers/themekit';

export default async (themeID: number) => {
  await deploy(themeID);
};
