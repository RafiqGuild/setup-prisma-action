const core = require('@actions/core');
const { SecretsManager } = require('aws-sdk')
const fs = require('fs');

// most @actions toolkit packages have async methods
async function run() {
  try {
    const secretsManager = new SecretsManager();
    const data = await secretsManager.getSecretValue({ SecretId: "/academic-foundations/academic-partner-service/rds-credentials" }).promise();
    const secret = JSON.parse(data.SecretString)
    const dbString = `postgres://${secret.username}:${secret.password}@${secret.host}:${secret.port}/${secret.dbname}?schema=public`;
    fs.writeFileSync('.env', `DATABASE_URL="${dbString}"\n`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
