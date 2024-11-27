import { Question } from './../../enterprise/entities/question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionsRepository } from '../repositories/questions-repository';
import { Either, left, right } from '@/core/either';
import { NotAllowedError } from './errors/resource-allowed-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface DeleteQuestionUseCaseRequest {
  questionId: string
  authorId: string
}

type DeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
{}
>;

export class DeleteQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository
  ){}

  async execute({ questionId, authorId}: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError());
    }

    await this.questionsRepository.delete(question);
    
    return right({});
  }
}