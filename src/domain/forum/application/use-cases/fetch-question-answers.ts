import { AnswersRepository } from './../repositories/answers-repository';
import { Answer } from '../../enterprise/entities/answer';

interface FetchQuestionsAnswersUseCaseRequest {
  page: number
  questionId: string
}

interface FetchQuestionsAnswersUseCaseResponse {
  answers: Answer[]
}

export class FetchQuestionsAnswersUseCase {
  constructor(
    private answersRepository: AnswersRepository
  ){}

  async execute({ questionId, page }: FetchQuestionsAnswersUseCaseRequest): Promise<FetchQuestionsAnswersUseCaseResponse> {

    const answers = await this.answersRepository.findManyQuestionId(questionId, {page});
    
    if (!answers) {
      throw new Error('Question not Found');
    }
    return { 
      answers 
    };
  }
}