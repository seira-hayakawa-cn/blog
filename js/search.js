$(function() {
  var search_result_loaded = false;
  $('.navbar-site-icon').on('click', function() {
    console.log(GLOBAL_CONFIG.search_path);
    $('#search-mask').fadeIn();
    $('#search-dialog').fadeIn();
    if (!search_result_loaded) {
      searchFunc(GLOBAL_CONFIG.search_path);
      search_result_loaded = true;
    }
    document.addEventListener('keydown', function f(event) {
      if (event.code === 'Escape') {
        closeSearch();
        document.removeEventListener('keydown', f);
      }
    });
  });

  let closeSearch = function() {
    $('#search-mask').fadeOut();
    $('#search-dialog').fadeOut();
  };

  $('#search-mask').on('click', closeSearch);
  $('.search-close-button').on('click', closeSearch);
});

var searchFunc = function(path) {
  $.ajax({
    url: path,
    dataType: 'xml',
    success: function(xmlResponse) {
      var datas = $("entry", xmlResponse).map(function() {
        return {
            title: $("title", this).text(),
            content: $("content", this).text(),
            url: $("url", this).text()
        };
      }).get();
      var $input = document.getElementById('local-search-box-input');
      if (!$input) {
        return;
      }
      var $resultContent = document.getElementById('search-result-list');
      $input.addEventListener('input', function() {
        var str = '';
        var keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);
        $resultContent.innerHTML = "";
        if (this.value.trim().length <= 0) {
          return;
        }
        var count = 0;
        datas.forEach(function(data) {
          var isMatch = true;
          var content_index = [];
          if (!data.title || data.title.trim() === '') {
              data.title = "Untitled";
          }
          var data_title = data.title.trim().toLowerCase();
          var data_content = data.content.trim().replace(/<[^>]+>/g, "").toLowerCase();
          var data_url = data.url;
          var index_title = -1;
          var index_content = -1;
          var first_occur = -1;
          // only match artiles with not empty contents
          if (data_content !== '') {
              keywords.forEach(function (keyword, i) {
                index_title = data_title.indexOf(keyword);
                index_content = data_content.indexOf(keyword);
                if (index_title < 0 && index_content < 0) {
                  isMatch = false;
                } else {
                  if (index_content < 0) {
                    index_content = 0;
                  }
                  if (i == 0) {
                    first_occur = index_content;
                  }
                  // content_index.push({index_content:index_content, keyword_len:keyword_len});
                }
              });
          } else {
              isMatch = false;
          }
          // show search results
          if (isMatch) {
            str += `<a href="${data_url}" class="search-result-item">
              <div class="search-result-item-title">
                ${data_title}
              </div>`;
            var content = data.content.trim().replace(/<[^>]+>/g, "");
            if (first_occur >= 0) {
              // cut out 100 characters
              var start = first_occur - 20;
              var end = first_occur + 80;
              if (start < 0) {
                  start = 0;
              }
              if (start == 0) {
                  end = 100;
              }
              if (end > content.length) {
                  end = content.length;
              }
              var match_content = content.substring(start, end);
              // highlight all keywords
              keywords.forEach(function (keyword) {
                  var regS = new RegExp(keyword, "gi");
                  match_content = match_content.replace(regS, `<em class="search-keyword">${keyword}</em>`);
              });
              str += `<p class="search-result-item-content">${match_content}...</p>`;
            }
            str += '</a>';
            count += 1;
          }
        });
        $resultContent.innerHTML = str;
      });

    },
  });
};