import { expect } from 'vitest'

import { Slug } from '../../enterprise/entities/value-objects/slug';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

import { EditAnswerUseCase } from './edit-answer';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-asnwers-repository';
import { makeAnswer } from 'test/factories/make-answer';


let inMemoryAnswersRepository: InMemoryAnswersRepository
let editAnswer: EditAnswerUseCase

describe(`Edit Answer`, () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    editAnswer = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it('should be able to edit a answer', async() => {   
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('answer-1'))
    
    await inMemoryAnswersRepository.create(
     newAnswer
    )

    await editAnswer.execute({
      answerId: newAnswer.id.toValue(),
      authorId: 'author-1',
      content: 'Conteudo teste',
    })
    
    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Conteudo teste',
    })

  });

  it('should not be able to edit a answer from another user', async() => {   
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('answer-1'))
    
    await inMemoryAnswersRepository.create(
     newAnswer
    )
    
    expect(() => {
      return editAnswer.execute({
        answerId: 'answer-1',
        authorId: 'author-2',
        content: 'pergunta 2',
      })
    }).rejects.toBeInstanceOf(Error)
    
  });

});