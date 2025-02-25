import { Question } from './../../enterprise/entities/question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { QuestionComment } from '../../enterprise/entities/question-comment';

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe(`Fetch Questions Comments`, () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository);
  });

  it('should be able to fetch questions Comments', async() => {   
    
    await inMemoryQuestionCommentsRepository.create(makeQuestionComment({
      questionId: new UniqueEntityID('question-1')
    }));

    await inMemoryQuestionCommentsRepository.create(makeQuestionComment({
      questionId: new UniqueEntityID('question-1')
    }));

    await inMemoryQuestionCommentsRepository.create(makeQuestionComment({
      questionId: new UniqueEntityID('question-1')
    }));
    
    const questionComments = await sut.execute({
      questionId: 'question-1',
      page: 1
    })
    
    expect((questionComments.value as { questionComments: QuestionComment[] }).questionComments).toHaveLength(3);
  });

  it('should be able to fetch paginated questions Comments', async() => {   
    for (let i = 1; i <= 22; i++ ) {
      await inMemoryQuestionCommentsRepository.create(makeQuestionComment({
        questionId: new UniqueEntityID(`question-1`)
      }));
    }
 
    const  questionComments  = await sut.execute({
      questionId: 'question-1',
      page: 2
    })
    
    expect((questionComments.value as { questionComments: QuestionComment[] }).questionComments).toHaveLength(2);
    
  });
});