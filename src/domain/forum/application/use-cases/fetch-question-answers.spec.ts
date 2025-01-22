import { expect } from 'vitest'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-asnwers-repository';
import { FetchQuestionsAnswersUseCase } from './fetch-question-answers';
import { makeAnswer } from 'test/factories/make-answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Answer } from '../../enterprise/entities/answer';

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut : FetchQuestionsAnswersUseCase

describe(`Fetch Questions Answers`, () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionsAnswersUseCase(inMemoryAnswersRepository);
  });

  it('should be able to fetch answers of questions', async() => {   
    
    await inMemoryAnswersRepository.create(makeAnswer({
      questionId: new UniqueEntityID('question-1')
    }));

    await inMemoryAnswersRepository.create(makeAnswer({
      questionId: new UniqueEntityID('question-1')
    }));

    await inMemoryAnswersRepository.create(makeAnswer({
      questionId: new UniqueEntityID('question-1')
    }));
    
    const answers  = await sut.execute({
      questionId: 'question-1',
      page: 1
    })
    
    //expect(answers).toHaveLength(3);
    
    expect((answers.value as { answers: Answer[] }).answers).toHaveLength(3);
    expect(answers.isRight()).toBe(true)
  });

  it('should be able to fetch paginated answers of question', async() => {   
    for (let i = 1; i <= 22; i++ ) {
      await inMemoryAnswersRepository.create(makeAnswer({
        questionId: new UniqueEntityID('question-1')
      }));
    }
 
    const  answers  = await sut.execute({
      questionId: 'question-1',
      page: 2
    })
    
    //console.log(answers.isRight());
    expect(answers.isRight()).toBe(true)
    //expect(answers.value.answers).toHaveLength(2);
   
  });
});