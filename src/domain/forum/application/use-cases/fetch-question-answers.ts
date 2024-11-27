import { AnswersRepository } from './../repositories/answers-repository';
import { Answer } from '../../enterprise/entities/answer';
import { Either, left, right } from '@/core/either';
import { NotAllowedError } from './errors/resource-allowed-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface FetchQuestionsAnswersUseCaseRequest {
  page: number
  questionId: string
}

type FetchQuestionsAnswersUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
{ answers: Answer[]}
>;

export class FetchQuestionsAnswersUseCase {
  constructor(
    private answersRepository: AnswersRepository
  ){}

  async execute({ questionId, page }: FetchQuestionsAnswersUseCaseRequest): Promise<FetchQuestionsAnswersUseCaseResponse> {

    const answers = await this.answersRepository.findManyQuestionId(questionId, {page});
    
    if (!answers) {
      return left(new ResourceNotFoundError());
    }
    return right({ 
      answers 
    });
  }
}