import { expect } from 'vitest'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { GetQuestionBySlugUseCase } from './get-question-by-slug';
import { Slug } from '../../enterprise/entities/value-objects/slug';
import { makeQuestion } from 'test/factories/make-questions';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let getQuestion: GetQuestionBySlugUseCase

describe(`Get Question By Slug`, () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    getQuestion = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to get a question by slug', async() => {   
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
      title: 'example-question',
    })
    
    await inMemoryQuestionsRepository.create(
     newQuestion
    )

    const { question } = await getQuestion.execute({
     slug: 'example-question',
    })
    
    expect(question.id).toBeTruthy()
    expect(question.title).toEqual('example-question')

  });
});