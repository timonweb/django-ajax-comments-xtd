'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DjangoAjaxCommentsXtd = function () {
  function DjangoAjaxCommentsXtd(options) {
    _classCallCheck(this, DjangoAjaxCommentsXtd);

    var defaultOptions = {
      commentFormClass: 'comment-submit-form',
      commentItemWrapperSelector: '.comment-item-wrapper',
      commentsWrapperSelector: '#comments',
      replyLinkClass: 'reply-link',
      listenToReplyClicks: true,
      submitFormWithAjax: true,
      replyUrlAsAttr: true
    };
    this.opts = Object.assign(defaultOptions, options);
  }

  _createClass(DjangoAjaxCommentsXtd, [{
    key: 'watch',
    value: function watch() {
      var _this = this;

      if (this.opts.listenToReplyClicks) {
        document.addEventListener('click', function (e) {
          if (e.target.classList.value.split(' ').indexOf(_this.opts.replyLinkClass) > -1) {
            e.preventDefault();
            _this.reply(e.target);
          }
        });
      }
      if (this.opts.submitFormWithAjax) {
        document.addEventListener('submit', function (e) {
          if (e.target.classList.contains(_this.opts.commentFormClass)) {
            e.preventDefault();
            _this.submit(e.target);
          }
        });
      }
    }
  }, {
    key: 'reply',
    value: function reply(el) {
      var _this2 = this;

      var replyForm = el.parentNode.parentNode.querySelector('.' + this.opts.commentFormClass);
      if (!replyForm) {
        this.ajaxGet(el.href || el.getAttribute('data-href'), function (resp) {
          var parser = new DOMParser(),
              responsedDom = parser.parseFromString(resp.target.responseText, "text/html"),
              replyForm = responsedDom.querySelector('form');
          _this2.insertAfter(replyForm, el.parentNode);
        });
      } else {
        this.remove(replyForm, el.parentNode.parentNode);
      }
    }
  }, {
    key: 'submit',
    value: function submit(el) {
      var _this3 = this;

      var submittedForm = el,
          replyTo = submittedForm.getAttribute('data-reply-to');
      this.ajaxPost(submittedForm, function (resp) {
        if (submittedForm.id) {
          var parser = new DOMParser(),
              responseDom = parser.parseFromString(resp.target.responseText, "text/html"),
              responseForm = responseDom.getElementById(submittedForm.id),
              responseComment = responseDom.querySelector(_this3.opts.commentItemWrapperSelector);
          if (replyTo) {
            if (responseComment) {
              submittedForm.outerHTML = responseComment.outerHTML;
            } else {
              submittedForm.outerHTML = responseForm.outerHTML;
            }
          } else {
            submittedForm.outerHTML = responseForm.outerHTML;
            document.querySelector(_this3.opts.commentsWrapperSelector).innerHTML += responseComment.innerHTML;
          }
        } else {
          submittedForm.innerHTML = resp.target.responseText;
        }
      });
    }
  }, {
    key: 'ajaxGet',
    value: function ajaxGet(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.setRequestHeader("X-Requested-With", 'XMLHttpRequest');
      xhr.onload = callback.bind(xhr);
      xhr.send();
    }
  }, {
    key: 'ajaxPost',
    value: function ajaxPost(form, callback) {
      var url = form.action,
          xhr = new XMLHttpRequest(),
          csrftoken = this.getCookie('csrftoken'),
          formData = new FormData(form);

      xhr.open("POST", url);
      xhr.setRequestHeader("X-CSRFToken", csrftoken);
      xhr.setRequestHeader("X-Requested-With", 'XMLHttpRequest');

      //.bind ensures that this inside of the function is the XHR object.
      xhr.onload = callback.bind(xhr);

      //All preperations are clear, send the request!
      xhr.send(formData);
    }
  }, {
    key: 'insertAfter',
    value: function insertAfter(el, referenceNode) {
      referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
    }
  }, {
    key: 'insertBefore',
    value: function insertBefore(el, referenceNode) {
      referenceNode.parentNode.insertBefore(el, referenceNode);
    }
  }, {
    key: 'remove',
    value: function remove(el, referenceNode) {
      referenceNode.removeChild(el);
    }
  }, {
    key: 'getCookie',
    value: function getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      return parts.length === 2 ? parts.pop().split(";").shift() : null;
    }
  }]);

  return DjangoAjaxCommentsXtd;
}();

var django_ajax_comments_xtd = new DjangoAjaxCommentsXtd();
django_ajax_comments_xtd.watch();
//# sourceMappingURL=ajax_comments.js.map