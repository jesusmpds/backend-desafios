let argvArray = []

process.argv.forEach((val, index) => {
    argvArray.push(val);
  });

const argvVariables = argvArray.slice(2,5)

exports.argvVariables = argvVariables;

exports.processInfo = {
    entryArgv: argvVariables,
    OS: process.platform,
    nodeVersion: process.version,
    memoryUsage: process.memoryUsage(),
    execPath: process.execPath,
    processId: process.pid,
    currentFolder:process.cwd()
}