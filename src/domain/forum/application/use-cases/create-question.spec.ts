import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './asnwer-question';
import { AnswersRepository } from '../repositories/answers-repository';


import { Answer } from '../../enterprise/entities/answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionsRepository } from '../repositories/questions-repository';
import { Question } from '../../enterprise/entities/question';
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
    const { question } = await createQuestion.execute({
      authorId: '1',
      title: 'Nova Pergunta',
      content: 'Conteudo da pergunta',
    })
    
    expect(question.content).toEqual('Conteudo da pergunta')
    expect(question.id).toBeTruthy()
  });
});