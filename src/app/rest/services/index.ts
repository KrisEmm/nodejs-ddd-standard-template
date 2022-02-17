import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';

export const container = new ContainerBuilder();
const loader = new YamlFileLoader(container);

const env = process.env.NODE_ENV || 'dev';

loader.load(`${__dirname}/application.${env}.yaml`);
