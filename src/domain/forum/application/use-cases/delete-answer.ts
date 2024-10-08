import { Answer } from './../../enterprise/entities/answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AnswersRepository } from '../repositories/answers-repository';

interface DeleteAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

interface DeleteAnswerUseCaseResponse {
}

export class DeleteAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository
  ){}

  async execute({ answerId, authorId}: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error('Answer not found');
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed');
    }

    await this.answersRepository.delete(answer);
    
    return {};
  }
}