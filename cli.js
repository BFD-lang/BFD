// nitropress/cli.js
import { runDev } from "./core/dev.js";
// 今後: import { runBuild } from "./core/build.js";
// 今後: import { runCheck } from "./core/check.js";
// 今後: import { runInit } from "./core/init.js";

const [, , command, filePath] = process.argv;

switch (command) {
  case "dev":
    if (!filePath) {
      console.error("❌ Usage: bun run nitro dev <file.nitro>");
      process.exit(1);
    }
    await runDev(filePath);
    break;

  // 他のコマンドもここに追加予定
  // case "build":
  //   await runBuild(filePath);
  //   break;

  default:
    console.log(`❓ Unknown command: ${command}`);
    console.log("Usage:");
    console.log("  bun run nitro dev <file.nitro>");
    // 今後: build / check / initも追記
    process.exit(1);
}
