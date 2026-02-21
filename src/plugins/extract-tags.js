// src/plugins/extract-tags.js
// 智能标签提取工具 - 自动从文章内容中提取关键词作为标签
import fs from 'node:fs';
import path from 'node:path';

// 常见的停用词（不作为标签）
const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were',
  'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might',
  'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
  'my', 'your', 'his', 'its', 'our', 'their', 'mine', 'yours', 'hers', 'ours', 'theirs',
  // 中文停用词
  '的', '了', '在', '是', '我', '有', '和', '就', '不', '人', '都', '一', '一个', '上', '也', '很', '到', '说', '要', '去',
  '你', '会', '着', '没有', '看', '好', '自己', '这', '那', '里', '个', '中', '为', '年', '大', '来', '还', '小', '以',
  '可', '下', '而', '过', '天', '然', '后', '之', '些', '现', '实', '等', '及', '如', '于', '并', '所', '作', '把', '给'
]);

// 技术相关关键词权重提升
const TECH_KEYWORDS = new Set([
  'ai', 'llm', 'gpt', 'claude', 'gemini', 'qwen', 'glm', 'minimax', 'kimi',
  'coding', 'programming', 'development', 'software', 'web', 'frontend', 'backend',
  'astro', 'react', 'vue', 'javascript', 'typescript', 'python', 'java', 'go',
  'cloud', 'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'git', 'github',
  'api', 'database', 'sql', 'nosql', 'mongodb', 'postgresql', 'mysql',
  'design', 'ux', 'ui', 'css', 'html', 'tailwind', 'bootstrap',
  'security', 'performance', 'optimization', 'testing', 'debugging',
  // 中文技术关键词
  '人工智能', '大模型', '编程', '开发', '软件', '前端', '后端', '云计算', '数据库', '设计', '性能', '优化'
]);

export function extractTagsFromContent(content, existingTags = []) {
  // 如果已经有标签，优先使用现有的
  if (existingTags && existingTags.length > 0) {
    return existingTags;
  }

  // 提取 frontmatter 之外的内容
  const contentWithoutFrontmatter = content.split('---').length > 2 
    ? content.split('---').slice(2).join('---')
    : content;

  // 提取所有单词和中文词汇
  const text = contentWithoutFrontmatter
    .replace(/[^a-zA-Z0-9\u4e00-\u9fff\s]/g, ' ') // 保留字母、数字、中文字符
    .replace(/\s+/g, ' ') // 将所有空白字符（包括换行）替换为空格
    .toLowerCase();

  // 分词：英文按空格分，中文按字符分（简化处理）
  const words = [];
  let currentWord = '';
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === ' ') {
      if (currentWord.length > 0) {
        words.push(currentWord);
        currentWord = '';
      }
    } else if (/[\u4e00-\u9fff]/.test(char)) {
      // 中文字符单独作为一个词
      if (currentWord.length > 0) {
        words.push(currentWord);
        currentWord = '';
      }
      words.push(char);
    } else {
      // 英文字符继续拼接
      currentWord += char;
    }
  }
  
  if (currentWord.length > 0) {
    words.push(currentWord);
  }

  // 过滤有效词汇
  const validWords = words.filter(word => {
    if (word.length < 2) return false;
    if (STOP_WORDS.has(word)) return false;
    if (/\d/.test(word) && !/^[a-z]+$/.test(word)) return false; // 跳过纯数字，但保留像'gpt4'这样的
    return true;
  });

  // 统计词频
  const wordCount = new Map();
  for (const word of validWords) {
    wordCount.set(word, (wordCount.get(word) || 0) + 1);
  }

  // 转换为数组并排序
  const sortedWords = Array.from(wordCount.entries())
    .map(([word, count]) => ({
      word,
      count,
      score: count * (TECH_KEYWORDS.has(word) ? 3 : 1) // 技术关键词权重更高
    }))
    .sort((a, b) => b.score - a.score);

  // 取前5个最高分的词作为标签
  const topTags = sortedWords.slice(0, 5).map(item => item.word);

  return topTags;
}

export function processAllFilesForTags() {
  const projectRoot = path.resolve(process.cwd());
  const contentDir = path.join(projectRoot, 'src/content/docs');
  const tagsData = {};

  console.log('[Smart Tags] Scanning content for automatic tag extraction...');

  function getAllFiles(dir, files = []) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        getAllFiles(fullPath, files);
      } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
        files.push(fullPath);
      }
    }
    return files;
  }

  const files = getAllFiles(contentDir);
  
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const relativePath = path.relative(contentDir, file);
    const slug = relativePath.replace(/\.mdx?$/, '').replace(/\\/g, '/');
    
    // 解析 frontmatter
    let frontmatter = {};
    try {
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (frontmatterMatch) {
        const frontmatterStr = frontmatterMatch[1];
        // 简单解析 YAML（只处理 tags 字段）
        const tagsMatch = frontmatterStr.match(/tags:\s*\[(.*?)\]/s) || 
                         frontmatterStr.match(/tags:\s*\n(\s*-.*\n*)+/);
        
        if (tagsMatch) {
          let tags = [];
          if (tagsMatch[1].includes('-')) {
            // 处理 YAML 列表格式
            tags = tagsMatch[1]
              .split('\n')
              .map(line => line.trim().replace(/^-/, '').trim())
              .filter(tag => tag.length > 0);
          } else {
            // 处理内联数组格式
            tags = tagsMatch[1]
              .split(',')
              .map(tag => tag.trim().replace(/['"]/g, ''))
              .filter(tag => tag.length > 0);
          }
          frontmatter.tags = tags;
        }
      }
    } catch (error) {
      console.warn(`[Smart Tags] Failed to parse frontmatter in ${file}:`, error.message);
    }

    // 提取或生成标签
    const extractedTags = extractTagsFromContent(content, frontmatter.tags);
    
    tagsData[slug] = {
      title: frontmatter.title || slug,
      tags: extractedTags,
      hasManualTags: !!frontmatter.tags?.length
    };
  }

  // 写入标签数据文件
  const outputPath = path.join(projectRoot, 'public/tags.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(tagsData, null, 2));
  
  console.log(`[Smart Tags] Generated ${outputPath} with ${Object.keys(tagsData).length} pages`);
  
  return tagsData;
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  processAllFilesForTags();
}