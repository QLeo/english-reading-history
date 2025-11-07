export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  level: string;
  readingTime: string;
  content: string;
  englishContent: string;
  koreanContent: string;
  questions: string;
  vocabulary: string;
}

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  level: string;
  readingTime: string;
}

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}
