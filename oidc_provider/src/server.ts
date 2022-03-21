import fastify from 'fastify';
import middie from 'middie';

const app = fastify({ logger: true });

app.register(middie);

const start = async () => {
  try {
    await app.listen(3000);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
