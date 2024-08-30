import { expect, test } from 'vitest'
import { CreateQuestionUseCase } from './create-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { GetQuestionBySlugUseCase } from './get-question-by-slug';
import { Question } from '../../enterprise/entities/question';
import { Slug } from '../../enterprise/entities/value-objects/slug';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';


let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let getQuestion: GetQuestionBySlugUseCase

describe(`Get Question By Slug`, () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    getQuestion = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to get a question by slug', async() => {   
    const newQuestion = Question.create({
      title: 'example-question',
      slug: Slug.create('example-question'),
      authorId: new UniqueEntityID(),
      content: 'Example content'
    });
    
    await inMemoryQuestionsRepository.create(
     newQuestion
    )

    const { question } = await getQuestion.execute({
     slug: 'example-question'
    })
    
    expect(question.id).toBeTruthy()
    expect(question.title).toEqual('example-question')

  });
});