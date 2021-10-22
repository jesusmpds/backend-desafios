const autocannon = require ('autocannon')
const { PassThrough } = require("stream");

const run = (url) => {
  const buffers = [];
  const outputStream = new PassThrough();

  const inst = autocannon({
    url,
    connections: 100,
    duration: 20,
  });

  autocannon.track(inst, { outputStream });
  
  outputStream.on('data', data => buffers.push(data))
  inst.on('done', () => {
      process.stdout.write(Buffer.concat(buffers))
  })
};

run("http://localhost:8080/info")
run("http://localhost:8080/info-console")
