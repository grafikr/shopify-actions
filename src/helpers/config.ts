import fs from 'fs';
import YAML from 'yaml';

const config = YAML.parse(fs.readFileSync('./config.yml', 'utf8'));

export default config as {
  [key: string]: {
    password: string
    theme_id: string
    store: string
    directory?: string
    ignore_files?: string[]
  }
};
