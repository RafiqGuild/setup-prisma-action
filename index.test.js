const { SecretsManager } = require('aws-sdk');
const fs = require('fs');

test('secrets', async () => {
  const secretsManager = new SecretsManager();
  const data = await secretsManager.getSecretValue({ SecretId: "/academic-foundations/academic-partner-service/rds-credentials" }).promise();
  const secret = JSON.parse(data.SecretString)
  const dbString = `postgres://${secret.username}:${secret.password}@${secret.host}:${secret.port}/${secret.dbname}?schema=public`;
  fs.writeFileSync('.env', `DATABASE_URL="${dbString}"\n`);
});
