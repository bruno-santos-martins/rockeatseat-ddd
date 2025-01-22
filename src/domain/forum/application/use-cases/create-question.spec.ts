import { expect, test } from 'vitest'
import { CreateQuestionUseCase } from './create-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let createQuestion: CreateQuestionUseCase

describe(`Create Question`, () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    createQuestion = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('create a question', async() => {   
    const  question  = await createQuestion.execute({
      authorId: '1',
      title: 'Nova Pergunta',
      content: 'Conteudo da pergunta',
    })
  
    expect(question.isRight()).toBe(true)
  });
});