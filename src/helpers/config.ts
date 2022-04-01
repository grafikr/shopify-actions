import fs from 'fs';
import YAML from 'yaml';

let config;
if (fs.existsSync('./config.yml')) {
  config = fs.readFileSync('./config.yml', 'utf8');
  config = YAML.parse(config);
} else {
  throw new Error('Failed to find file: config.yml');
}

export default config as {
  [key: string]: {
    password: string
    theme_id: string
    store: string
    directory?: string
    ignore_files?: string[]
  }
};
