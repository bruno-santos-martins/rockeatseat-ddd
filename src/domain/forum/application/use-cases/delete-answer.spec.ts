import { expect } from 'vitest'

import { Slug } from '../../enterprise/entities/value-objects/slug';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeAnswer } from 'test/factories/make-answer';
import { DeleteAnswerUseCase } from './delete-answer';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-asnwers-repository';


let inMemoryAnswersRepository: InMemoryAnswersRepository
let deleteAnswer: DeleteAnswerUseCase

describe(`Delete Answer`, () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    deleteAnswer = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  });

  it('should be able to delete a answer', async() => {   
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('answer-1'))
    
    await inMemoryAnswersRepository.create(
     newAnswer
    )

    await deleteAnswer.execute({
      answerId: 'answer-1',
      authorId: 'author-1'
    })
    
    expect(inMemoryAnswersRepository.items).toHaveLength(0)

  });

  it.only('should not be able to delete a answer from another user', async() => {   
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('answer-1'))
    
    await inMemoryAnswersRepository.create(
     newAnswer
    )
    
    const result = await deleteAnswer.execute({
      answerId: 'answer-1',
      authorId: 'author-1'
    })

    expect(result.isRight()).toBe(true);
    
  });

});