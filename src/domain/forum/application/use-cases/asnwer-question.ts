import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Answer } from "../../enterprise/entities/answer"
import { AnswersRepository } from "../repositories/answers-repository"

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

interface AnswerQuestionUseCaseResponse {
  answer: Answer
}

export class AnswerQuestionUseCase {
  constructor(
    private answersRepository: AnswersRepository
  ){}

  async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {

    let answer = Answer.create({
      content,
      authorId: new UniqueEntityID(questionId),
      questionId: new UniqueEntityID(instructorId),
      rest: ""
    })
    
    answer = await this.answersRepository.create(answer)
    
    return { answer };
  }
}

