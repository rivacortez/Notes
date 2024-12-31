export class CategoriesEntity {
  id: number;
  name: string;
  color: string;

  constructor(data: { id?: number, name?: string, color?: string } = {}) {
    this.id = data.id ?? 0;
    this.name = data.name || '';
    this.color = data.color || '';
  }
}
