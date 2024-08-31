import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = [];

  async findById(id: string) {
    const question = this.items.find((item: Question) => item.id.toString() === id);
    
    if (!question) {
      return null
    }
    
    return question;
  }

  async delete(question: Question) {

    const itemIdex = this.items.findIndex((item) => item.id === question.id)
   
    this.items.splice(itemIdex, 1);

  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => item.slug.value === slug)

    if (!question) {
      return null
    }

    return question
  }

  async create(question: Question) {
    this.items.push(question);
  }

}