export class CategoriesEntity {
  id: number;
  name: string;
  color: string;
  selected: boolean;

  constructor(data: { id?: number, name?: string, color?: string, selected?: boolean } = {}) {
    this.id = data.id ?? 0;
    this.name = data.name || '';
    this.color = data.color || '';
    this.selected = data.selected || false;
  }
}
