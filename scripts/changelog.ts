import simpleGit from "simple-git";
import fs from "fs-extra";
import path from "node:path";
import chalk from "chalk";
import packageJson from "../package.json";

const git = simpleGit();

function getReleaseVersion(message: string) {
  const splitted = message.split(" ");
  return splitted[splitted.length - 1];
}

async function getChangelog() {
  const logs = await git.log({ maxCount: 100 });
  const messages = logs.all.map((commit) => commit.message);
  const currentRelease = messages.findIndex(
    (message) =>
      message.includes("[release]") && message.includes(packageJson.version)
  );
  const lastRelease = messages.findIndex(
    (message) =>
      message.includes("[release]") &&
      !message.includes(packageJson.version) &&
      !message.includes("beta") &&
      !message.includes("alpha")
  );

  process.stdout.write(
    chalk.cyan(
      `Current release: ${getReleaseVersion(messages[currentRelease])}\n\n`
    )
  );

  const changeLogs = messages
    .slice(0, lastRelease)
    .filter(
      (message) =>
        /\[@rtdui/.test(message) && !message.includes("[@rtdui/demos]")
    )
    .map((message) => message.replace("[", "- `[").replace("]", "]`"))
    .join("\n");

  if (changeLogs) {
    fs.ensureFileSync(path.resolve("docs/src/assets/changelog.mdx"));

    const prevContent = fs.readFileSync(
      path.resolve("docs/src/assets/changelog.mdx"),
      "utf-8"
    );

    const newContent = `# Version ${getReleaseVersion(
      messages[currentRelease]
    )}\n
${changeLogs}\n
${prevContent}`;

    fs.writeFileSync(path.resolve("docs/src/assets/changelog.mdx"), newContent);
  }
  process.stdout.write(`${changeLogs || "No significant changes yet"}\n\n`);
}

getChangelog();
