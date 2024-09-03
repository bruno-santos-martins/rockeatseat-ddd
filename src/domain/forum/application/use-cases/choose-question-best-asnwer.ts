import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Answer } from "../../enterprise/entities/answer"
import { AnswersRepository } from "../repositories/answers-repository"

interface ChooseQuestionBestAnswerUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  answer: Answer
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository
  ){}

  async execute({ instructorId, questionId, content }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {

    let answer = Answer.create({
      content,
      authorId: new UniqueEntityID(questionId),
      questionId: new UniqueEntityID(instructorId),
    })
    
    answer = await this.answersRepository.create(answer)
    
    return { answer };
  }
}