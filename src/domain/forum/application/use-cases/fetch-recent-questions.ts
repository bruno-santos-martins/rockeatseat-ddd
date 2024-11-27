import { Question } from '../../enterprise/entities/question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionsRepository } from '../repositories/questions-repository';
import { Either, left, right } from '@/core/either';
import { NotAllowedError } from './errors/resource-allowed-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface FetchRecentQuestionsUseCaseRequest {
  page: number
}

type FetchRecentQuestionsUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
{ question: Question[]}
>;

export class FetchRecentQuestionsUseCase {
  constructor(
    private questionsRepository: QuestionsRepository
  ){}

  async execute({ page }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {

    const question = await this.questionsRepository.findManyRecent({page});
    
    if (!question) {
      return left(new ResourceNotFoundError());
    }
    return right({ 
      question 
    });
  }
}