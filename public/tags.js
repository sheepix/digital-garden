// src/static/tags.js
function loadTags() {
  fetch('/tags.json')
    .then(response => response.json())
    .then(tagsData => {
      const tagMap = {};
      
      // 聚合标签
      for (let slug in tagsData) {
        const pageData = tagsData[slug];
        for (let i = 0; i < pageData.tags.length; i++) {
          const tag = pageData.tags[i];
          if (!tagMap[tag]) {
            tagMap[tag] = [];
          }
          tagMap[tag].push({
            slug: slug,
            title: pageData.title || slug
          });
        }
      }
      
      // 转换为数组并排序
      const tagsArray = [];
      for (let tag in tagMap) {
        tagsArray.push({
          tag: tag,
          pages: tagMap[tag],
          count: tagMap[tag].length
        });
      }
      tagsArray.sort((a, b) => b.count - a.count);
      
      // 渲染HTML
      let html = '';
      for (let i = 0; i < tagsArray.length; i++) {
        const item = tagsArray[i];
        const slug = encodeURIComponent(item.tag).toLowerCase().replace(/%20/g, '-');
        html += '<div id="tag-' + slug + '" class="scroll-mt-24 border border-stone-200 dark:border-stone-700 rounded-lg p-6 hover:border-primary/50 transition-colors">';
        html += '<div class="flex items-center justify-between mb-4">';
        html += '<h2 class="text-xl font-semibold text-stone-900 dark:text-white">';
        html += '<a href="#tag-' + slug + '" aria-label="Tag: ' + item.tag + '" class="hover:text-primary transition-colors">#' + item.tag + '</a>';
        html += '</h2>';
        html += '<span class="px-2 py-1 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 text-sm rounded">';
        html += item.count + ' ' + (item.count === 1 ? 'page' : 'pages') + '</span>';
        html += '</div><div class="space-y-2">';
        
        for (let j = 0; j < Math.min(item.pages.length, 5); j++) {
          const page = item.pages[j];
          html += '<a href="/' + page.slug + '" class="block text-stone-600 dark:text-stone-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">• ' + page.title + '</a>';
        }
        
        if (item.pages.length > 5) {
          html += '<span class="text-stone-400 dark:text-stone-500 text-xs">+' + (item.pages.length - 5) + ' more...</span>';
        }
        
        html += '</div></div>';
      }
      
      document.getElementById('tags-container').innerHTML = html;
    })
    .catch(error => {
      console.error('Failed to load tags:', error);
      document.getElementById('tags-container').innerHTML = '<p class="text-stone-500 dark:text-stone-400">Failed to load tags</p>';
    });
}

// 页面加载完成后执行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadTags);
} else {
  loadTags();
}