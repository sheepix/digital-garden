function getTagSize(count, maxCount) {
  var minSize = 0.875;
  var maxSize = 1.25;
  var scale = (count / maxCount) * (maxSize - minSize) + minSize;
  return scale + 'rem';
}

function loadTagCloud() {
  fetch('/tags.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(tagsData) {
      var tagAggregation = {};
      for (var slug in tagsData) {
        var pageData = tagsData[slug];
        for (var i = 0; i < pageData.tags.length; i++) {
          var tag = pageData.tags[i];
          tagAggregation[tag] = (tagAggregation[tag] || 0) + 1;
        }
      }
      
      var maxCount = Math.max.apply(null, Object.values(tagAggregation));
      var sortedTags = [];
      for (var tag in tagAggregation) {
        sortedTags.push([tag, tagAggregation[tag]]);
      }
      sortedTags.sort(function(a, b) {
        return b[1] - a[1];
      });
      
      var html = '<div class="flex flex-wrap gap-2">';
      for (var i = 0; i < sortedTags.length; i++) {
        var tag = sortedTags[i][0];
        var count = sortedTags[i][1];
        var slug = encodeURIComponent(tag).toLowerCase().replace(/%20/g, '-');
        html += '<a href="/tags/#tag-' + slug + '" aria-label="' + tag + '" class="inline-block px-2 py-1 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-primary/10 hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none dark:focus-visible:ring-offset-stone-900 focus-visible:ring-offset-2" style="font-size: ' + getTagSize(count, maxCount) + '">#' + tag + '</a>';
      }
      html += '</div>';
      
      document.getElementById('tag-cloud-content').innerHTML = html;
    })
    .catch(function(error) {
      console.error('Failed to load tags:', error);
      document.getElementById('tag-cloud-content').innerHTML = '<p class="text-stone-500 dark:text-stone-400 text-sm">Failed to load tags</p>';
    });
}

document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    loadTagCloud();
  }
});