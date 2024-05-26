import { FastifyRequest, FastifyReply } from 'fastify';
import { Conciliation, Customer, Transfer } from './shared/value-objects';
import { customerInfo, openAccount } from './services/custormers-service';
import { makeTransfer } from './services/transfers-service';
import { isAuthorized, isValidBalance } from './shared/fixtures';
import { conciliation } from './services/conciliation-service';

async function routes(fastify: any) {
  fastify.get('/health', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.code(200).send({ api: 'running...' });
  });

  fastify.post('/customer/account', async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body as Customer;
    try {
      const account = await openAccount(body);
      reply.log.info({ account: account }, 'account successfully opened...');
      return reply.code(200).send(account);
    } catch (error) {
      reply.log.error(error);
      return reply.code(500).send({ message: 'internal server error...' });
    }
  });

  fastify.post('/transfer', async (request: FastifyRequest, reply: FastifyReply) => {
    const transfer = request.body as Transfer;
    try {
      const customer = await customerInfo(transfer.origin_account);

      if (!(await isAuthorized(customer.type, transfer.password, customer.password))) {
        return reply.code(401).send({ message: 'authentication failure...' });
      }

      if (!isValidBalance(customer.wallet, transfer.value)) {
        return reply.code(400).send({ message: 'insufficient balance...' });
      }

      const voucher = await makeTransfer(transfer, customer.wallet);

      reply.log.info({ token: voucher.token }, 'transfer successfully sent...');
      return reply.code(200).send(voucher);
    } catch (error) {
      reply.log.error(error);
      return reply.code(500).send({ message: 'internal server error...' });
    }
  });

  fastify.put('/conciliation', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const transaction = request.body as Conciliation;
      await conciliation(transaction);
      reply.log.info({ token: transaction.token, value: transaction.value }, 'successful conciliation...');
      reply.code(204).send();
    } catch (error) {
      reply.log.error(error);
      return reply.code(500).send({ message: 'internal server error...' });
    }
  });
}

export default routes;
