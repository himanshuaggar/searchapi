import { Client, Entity, Schema, Repository } from 'redis-om';

const client = new Client();

async function connect() {
    if (!client.isOpen()) {
        await client.open(process.env.REDIS_URL);
    }
}

class Answer extends Entity {}
let schema = new Schema(
  Answer,
  {
    // index: { type: 'string' },
    question: { type: 'text',  textSearch: true },
    answer: { type: 'text',textSearch: true },
    date: { type: 'string' },
    tag: { type: 'text', textSearch: true },
  },
  {
    dataStructure: 'JSON',
  }
);

export async function createAnswer(data) {
    await connect();
  
    const repository = client.fetchRepository(schema)
  
    const answer = repository.createEntity(data);
  
    const id = await repository.save(answer);

    return id;
}
export async function createIndex() {
    await connect();

    const repository = new Repository(schema, client);
    await repository.createIndex()
}

export async function searchAnswer(q) {
    await connect();
   console.log(q);
    const repository = new Repository(schema, client);
    
    const answers = await repository.search()
        .where('question').matches(q)
        .or('answer').matches(q)
        .or('tag').matches(q)
        .return.all();
  
    return answers;
  }