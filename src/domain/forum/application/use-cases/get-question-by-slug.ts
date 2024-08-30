import { Question } from './../../enterprise/entities/question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionsRepository } from '../repositories/questions-repository';

interface GetQuestionBySlugUseCaseRequest {
 slug: string
}

interface GetQuestionBySlugUseCaseResponse {
  question: Question
}

export class GetQuestionBySlugUseCase {
  constructor(
    private questionsRepository: QuestionsRepository
  ){}

  async execute({ slug }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {

    const question = await this.questionsRepository.findBySlug(slug);
    
    if (!question) {
      throw new Error('Question not Found');
    }
    return { 
      question 
    };
  }
}