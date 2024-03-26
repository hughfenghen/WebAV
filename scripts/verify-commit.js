import pico from 'picocolors';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const msgPath = resolve('.git/COMMIT_EDITMSG');
const msg = readFileSync(msgPath, 'utf-8').trim();

const commitRE =
  /^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?: .+/;

if (!commitRE.test(msg)) {
  console.error(
    `\n  ${pico.white(pico.bgRed(' ERROR '))} ${pico.red(
      `invalid commit message format.`,
    )}\n\n` +
      pico.red(
        `  Proper commit message format is required for automated changelog generation. Examples:\n\n`,
      ) +
      `    ${pico.green(`feat(av-canvas): add 'video-sprite' feature`)}\n` +
      `    ${pico.green(
        `fix(event-tool): clear listeners on listener interface (close #00)`,
      )}\n\n` +
      pico.red(`  See .github/commit-convention.md for more details.\n`),
  );
  process.exit(1);
}
