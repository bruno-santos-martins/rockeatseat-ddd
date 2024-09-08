import { Question } from '../../enterprise/entities/question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionsRepository } from '../repositories/questions-repository';

interface FetchRecentQuestionsUseCaseRequest {
  page: number
}

interface FetchRecentQuestionsUseCaseResponse {
  question: Question[]
}

export class FetchRecentQuestionsUseCase {
  constructor(
    private questionsRepository: QuestionsRepository
  ){}

  async execute({ page }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {

    const question = await this.questionsRepository.findManyRecent({page});
    
    if (!question) {
      throw new Error('Question not Found');
    }
    return { 
      question 
    };
  }
}