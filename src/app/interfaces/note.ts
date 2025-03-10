export interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
  subjects: Subject[];
}
