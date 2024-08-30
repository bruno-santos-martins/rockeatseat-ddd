import { InMemoryAnswersRepository } from './../../../../../test/repositories/in-memory-asnwers-repository';
import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './asnwer-question';
import { AnswersRepository } from '../repositories/answers-repository';


import { Answer } from '../../enterprise/entities/answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryAnswersRepository: InMemoryAnswersRepository
let answerQuestion: AnswerQuestionUseCase;

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    answerQuestion = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it('Create answer', async() => {
  
    const { answer } = await answerQuestion.execute({
      questionId: '1',
      instructorId: '1',
      content: 'nova resposta',
    })
  
    expect(answer.content).toEqual('nova resposta')
    expect(answer.questionId).toEqual(new UniqueEntityID('1'))
  });

});
