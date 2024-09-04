import { expect } from 'vitest'

import { Slug } from '../../enterprise/entities/value-objects/slug';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeAnswer } from 'test/factories/make-answer';
import { DeleteAnswerUseCase } from './delete-answer';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-asnwers-repository';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer';
import { makeQuestion } from 'test/factories/make-questions';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase

describe(`Choose Question Best Answer`, () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new ChooseQuestionBestAnswerUseCase(inMemoryQuestionsRepository, inMemoryAnswersRepository);
  });

  it('should be able to choose question best asnwer', async() => {   
    const  question = makeQuestion();
    const answer = makeAnswer({
      questionId: question.id
    })
    
    await inMemoryQuestionsRepository.create(question);
    await inMemoryAnswersRepository.create(
      answer
    )
   
    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString()
    })
    
    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(answer.id)

  });

  
  it('should not be able to choose another user question best answer', async() => {   
    const answer = makeAnswer({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('answer-1'))
    
    await inMemoryAnswersRepository.create(
      answer
    )
    
    expect(() => {
      return sut.execute({
        answerId: answer.id.toString(),
        authorId: 'author-2'
      })
    }).rejects.toBeInstanceOf(Error)
    
  });
  
});