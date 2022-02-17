import cypress from 'cypress';
import { ApplicationsManager } from 'krisemm/tests/utils/ApplicationsManager';
import cypressConfig from '../../cypress.json';

async function run() {
  ApplicationsManager.start();
  await runCypress();

  ApplicationsManager.stop();
  process.exit(0);
}

function runCypress() {
  return cypress.run({
    reporter: 'junit',
    browser: 'chrome',
    headless: true,
    config: {
      ...cypressConfig,
      supportFile: false
    }
  });
}

run().then();
