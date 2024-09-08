import { PaginationParams } from "@/core/repositories/pagination-params";
import { Answer } from "../../enterprise/entities/answer";

export interface AnswersRepository {
  create(answer: Answer): Promise<Answer>
  findById(id: string): Promise<Answer | null>
  findManyQuestionId(questionId: string, params: PaginationParams): Promise<Answer[]>
  delete(answer: Answer): Promise<void>
  save(answer: Answer): Promise<void>
}