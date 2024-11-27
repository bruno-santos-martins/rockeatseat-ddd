import { Answer } from './../../enterprise/entities/answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AnswersRepository } from '../repositories/answers-repository';
import { Either, left, right } from '@/core/either';
import { NotAllowedError } from './errors/resource-allowed-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface DeleteAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class DeleteAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository
  ){}

  async execute({ answerId, authorId}: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }
    
    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError());
    }

    await this.answersRepository.delete(answer);
    
    return right({});
  }
}