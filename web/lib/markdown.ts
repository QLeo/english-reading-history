import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import type { HeadingItem } from './types';

export async function parseMarkdown(content: string) {
  const result = await remark()
    .use(gfm)
    .use(html, { sanitize: false })
    .process(content);

  return result.toString();
}

export function parseFrontMatter(fileContent: string) {
  return matter(fileContent);
}

export function separateEnglishKorean(content: string) {
  const sections = content.split('---');

  // Find Korean Translation section
  const koreanSectionIndex = sections.findIndex(section =>
    section.includes('# Korean Translation') || section.includes('# 한국어 번역')
  );

  // Find Questions section
  const questionsSectionIndex = sections.findIndex(section =>
    section.includes('# Comprehension Questions')
  );

  // Find Vocabulary section
  const vocabularySectionIndex = sections.findIndex(section =>
    section.includes('# Useful Expressions') || section.includes('# Vocabulary')
  );

  let englishContent = '';
  let koreanContent = '';
  let questions = '';
  let vocabulary = '';

  // Extract English content (from start to Korean section or Questions section)
  if (questionsSectionIndex > 0) {
    englishContent = sections.slice(0, questionsSectionIndex).join('---');
  } else if (koreanSectionIndex > 0) {
    englishContent = sections.slice(0, koreanSectionIndex).join('---');
  } else {
    englishContent = content;
  }

  // Extract Questions
  if (questionsSectionIndex > 0) {
    const endIndex = koreanSectionIndex > questionsSectionIndex ? koreanSectionIndex : vocabularySectionIndex;
    if (endIndex > questionsSectionIndex) {
      questions = sections.slice(questionsSectionIndex, endIndex).join('---');
    } else {
      questions = sections.slice(questionsSectionIndex, questionsSectionIndex + 1).join('---');
    }
  }

  // Extract Korean content
  if (koreanSectionIndex > 0) {
    const endIndex = vocabularySectionIndex > koreanSectionIndex ? vocabularySectionIndex : sections.length;
    koreanContent = sections.slice(koreanSectionIndex, endIndex).join('---');
  }

  // Extract Vocabulary
  if (vocabularySectionIndex > 0) {
    vocabulary = sections.slice(vocabularySectionIndex).join('---');
  }

  return {
    englishContent: englishContent.trim(),
    koreanContent: koreanContent.trim(),
    questions: questions.trim(),
    vocabulary: vocabulary.trim()
  };
}

export function extractHeadings(content: string): HeadingItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: HeadingItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    headings.push({ id, text, level });
  }

  return headings;
}

export function addHeadingIds(htmlContent: string): string {
  return htmlContent.replace(
    /<h([1-6])>(.+?)<\/h\1>/g,
    (match, level, text) => {
      const id = text.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      return `<h${level} id="${id}">${text}</h${level}>`;
    }
  );
}
