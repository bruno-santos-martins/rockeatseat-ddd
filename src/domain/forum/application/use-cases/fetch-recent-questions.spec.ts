import { Question } from './../../enterprise/entities/question';
import { expect } from 'vitest'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { GetQuestionBySlugUseCase } from './get-question-by-slug';
import { Slug } from '../../enterprise/entities/value-objects/slug';
import { makeQuestion } from 'test/factories/make-questions';
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut : FetchRecentQuestionsUseCase

describe(`Fetch Recent Questions`, () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to fetch recent questions', async() => {   
    
    await inMemoryQuestionsRepository.create(makeQuestion({
      title: 'dado2',
      createdAt: new Date(2023, 0, 20)
    }));
    await inMemoryQuestionsRepository.create(makeQuestion({
      title: 'dado1',
      createdAt: new Date(2023, 0, 18)
    }));
    await inMemoryQuestionsRepository.create(makeQuestion({
      title: 'dado3',
      createdAt: new Date(2023, 0, 23)
    }));
    
    const  question  = await sut.execute({
      page: 1
    })
    
    expect((question.value as { question: Question[]} ).question).toEqual([
      expect.objectContaining({ createdAt: new Date(2023, 0, 23)}),
      expect.objectContaining({ createdAt: new Date(2023, 0, 20)}),
      expect.objectContaining({ createdAt: new Date(2023, 0, 18)})  
    ])
      
  });

  it('should be able to fetch paginated recent questions', async() => {   
    for (let i = 1; i <= 22; i++ ) {
      await inMemoryQuestionsRepository.create(makeQuestion({
        title: 'dado2',
        createdAt: new Date(2023, 0, i)
      }));
    }
 
    const  question  = await sut.execute({
      page: 2
    })
    
    expect((question.value as { question: Question[] }).question).toHaveLength(2);
    
  });
});