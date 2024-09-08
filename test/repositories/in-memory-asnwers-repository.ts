import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = [];

  async findManyQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.items
    .filter(item => item.questionId.toString() === questionId)
    .slice((page - 1) * 20, page * 20)
    return answers;
  }

  async create(answers: Answer) {
    this.items.push(answers);
    return answers;
  }

  async delete(answer: Answer) {
    const itemIdex = this.items.findIndex((item) => item.id === answer.id)
   
    this.items.splice(itemIdex, 1);
  }

  async findById(id: string) {
    const answer = this.items.find((item: Answer) => item.id.toString() === id);
    
    if (!answer) {
      return null
    }
    
    return answer;
  }
  
  async save(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)
   
    this.items[itemIndex] = answer;
  }

}