import { Answer } from './../../enterprise/entities/answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AnswersRepository } from '../repositories/answers-repository';
import { Either, left, right } from '@/core/either';
import { NotAllowedError } from './errors/resource-allowed-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
{answer: Answer}
>;

export class EditAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository
  ){}

  async execute({ answerId, authorId, content }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError());
    }

    answer.content = content

    await this.answersRepository.save(answer);
    
    return right({ answer });
  }
}