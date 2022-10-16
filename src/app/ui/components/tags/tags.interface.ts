export interface TagsConfig {
  key?: string;
  onAdd?(tags: Tag): any;
  onDelete?(tag: Tag): any;
  list?: Tag[];
}

export interface Tag {
  value?: string;
  mode?: 'closeable' | 'default';
}
