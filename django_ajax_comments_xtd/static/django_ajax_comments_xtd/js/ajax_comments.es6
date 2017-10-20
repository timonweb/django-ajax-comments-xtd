class DjangoAjaxCommentsXtd {

  constructor(options) {
    const defaultOptions = {
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

  watch() {
    if (this.opts.listenToReplyClicks) {
      document.addEventListener('click', e => {
        if (e.target.classList.value.split(' ').indexOf(this.opts.replyLinkClass) > -1) {
          e.preventDefault();
          this.reply(e.target);
        }
      });
    }
    if (this.opts.submitFormWithAjax) {
      document.addEventListener('submit', e => {
        if (e.target.classList.contains(this.opts.commentFormClass)) {
          e.preventDefault();
          this.submit(e.target);
        }
      });
    }
  }

  reply(el) {
    let replyForm = el.parentNode.parentNode.querySelector('.' + this.opts.commentFormClass);
    if (!replyForm) {
      this.ajaxGet(
        el.href || el.getAttribute('data-href'),
        resp => {
          let parser = new DOMParser(),
              responsedDom = parser.parseFromString(resp.target.responseText, "text/html"),
              replyForm = responsedDom.querySelector('form');
          this.insertAfter(replyForm, el.parentNode);
        }
      );
    }
    else {
      this.remove(replyForm, el.parentNode.parentNode);
    }
  }

  submit(el) {
    let submittedForm = el,
        replyTo = submittedForm.getAttribute('data-reply-to');
    this.ajaxPost(submittedForm, resp => {
      if (submittedForm.id) {
        let parser = new DOMParser(),
          responseDom = parser.parseFromString(resp.target.responseText, "text/html"),
          responseForm = responseDom.getElementById(submittedForm.id),
          responseComment = responseDom.querySelector(this.opts.commentItemWrapperSelector);
        if (replyTo) {
          if (responseComment) {
            submittedForm.outerHTML = responseComment.outerHTML;
          }
          else {
            submittedForm.outerHTML = responseForm.outerHTML;
          }
        }
        else {
          submittedForm.outerHTML = responseForm.outerHTML;
          document.querySelector(this.opts.commentsWrapperSelector).innerHTML += responseComment.innerHTML;
        }
      }
      else {
        submittedForm.innerHTML = resp.target.responseText;
      }
    });
  }

  ajaxGet(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.setRequestHeader("X-Requested-With", 'XMLHttpRequest');
    xhr.onload = callback.bind(xhr);
    xhr.send();
  }

  ajaxPost(form, callback) {
    const url = form.action,
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

  insertAfter (el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
  }

  insertBefore (el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode);
  }

  remove (el, referenceNode) {
    referenceNode.removeChild(el);
  }

  getCookie (name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    return parts.length === 2 ? parts.pop().split(";").shift() : null;
  }

}

const django_ajax_comments_xtd = new DjangoAjaxCommentsXtd();
django_ajax_comments_xtd.watch();
