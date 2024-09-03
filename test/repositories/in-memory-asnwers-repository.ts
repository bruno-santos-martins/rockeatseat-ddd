import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {

  public items: Answer[] = [];

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