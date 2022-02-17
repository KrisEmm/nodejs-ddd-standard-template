import cypress from 'cypress';
import { ApplicationsManager } from 'krisemm/tests/utils/ApplicationsManager';
import cypressConfig from '../../cypress.json';

async function open() {
  ApplicationsManager.start();
  await runCypress();

  ApplicationsManager.stop();
  process.exit(0);
}

async function runCypress() {
  return cypress.open({
    config: {
      ...cypressConfig,
      supportFile: false
    }
  });
}

open();
