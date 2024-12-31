export class NotesEntity {
  id: number;
  title: string;
  content: string;
  archived: boolean;

  constructor(data: { id?: number, title?: string, content?: string, archived?: boolean } = {}) {
    this.id = data.id || 0;
    this.title = data.title || '';
    this.content = data.content || '';
    this.archived = data.archived || false;
  }
}
