import { expect, test } from 'vitest'
import { CreateQuestionUseCase } from './create-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { GetQuestionBySlugUseCase } from './get-question-by-slug';
import { Question } from '../../enterprise/entities/question';
import { Slug } from '../../enterprise/entities/value-objects/slug';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeQuestion } from 'test/factories/make-questions';
import { EditQuestionUseCase } from './edit-question';


let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let editQuestion: EditQuestionUseCase

describe(`Edit Question`, () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    editQuestion = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to edit a question', async() => {   
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
      title: 'example-question',
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('question-1'))
    
    await inMemoryQuestionsRepository.create(
     newQuestion
    )

    await editQuestion.execute({
      questionId: newQuestion.id.toValue(),
      authorId: 'author-1',
      title: 'Pergunta teste',
      content: 'Conteudo teste',
    })
    
    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Pergunta teste',
      content: 'Conteudo teste',
    })

  });

  it('should not be able to edit a question from another user', async() => {   
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
      title: 'example-question',
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('question-1'))
    
    await inMemoryQuestionsRepository.create(
     newQuestion
    )
    
    const result = await editQuestion.execute({
      questionId: 'question-1',
      authorId: 'author-2',
      content: 'pergunta 2',
      title:'title'
    });

   expect(result.isLeft()).toBe(true);
    
  });

});