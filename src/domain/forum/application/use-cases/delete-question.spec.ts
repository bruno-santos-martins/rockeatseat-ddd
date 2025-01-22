import { expect, test } from 'vitest'
import { CreateQuestionUseCase } from './create-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { GetQuestionBySlugUseCase } from './get-question-by-slug';
import { Question } from '../../enterprise/entities/question';
import { Slug } from '../../enterprise/entities/value-objects/slug';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeQuestion } from 'test/factories/make-questions';
import { DeleteQuestionUseCase } from './delete-question';


let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let deleteQuestion: DeleteQuestionUseCase

describe(`Delete Question`, () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    deleteQuestion = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to delete a question', async() => {   
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
      title: 'example-question',
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('question-1'))
    
    await inMemoryQuestionsRepository.create(
     newQuestion
    )

    await deleteQuestion.execute({
      questionId: 'question-1',
      authorId: 'author-1'
    })
    
    expect(inMemoryQuestionsRepository.items).toHaveLength(0)

  });

  it('should not be able to delete a question from another user', async() => {   
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
      title: 'example-question',
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('question-1'))
    
    await inMemoryQuestionsRepository.create(
     newQuestion
    )

    const result = await deleteQuestion.execute({
      questionId: 'question-1',
      authorId: 'author-2'
    });
    
    expect(result.isLeft()).toBe(true);
    
  });

});