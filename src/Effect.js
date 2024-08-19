class Effect {
  dataExample = {
    hover: false,
    threshold: 1,
    transitionSeconds: 0.5,
    top: false,
    delaySeconds: 0.025,
    isActiveInMiddle: false,
    isList: false,
  };

  constructor(element, data) {
    this.data = data === undefined ? this.dataExample : data;
    this.element = element;
    this.onIntersection = this.onIntersection.bind(this);
    this.middleAction = this.middleAction.bind(this);
  }

  verifyData() {
    if (this.data.hover === undefined) {
      this.data.hover = false;
    }
    if (this.data.threshold === undefined) {
      this.data.threshold = 1;
    }
    if (this.data.transitionSeconds === undefined) {
      throw new Error("undefined transitionSeconds");
    }
    if (this.data.top === undefined) {
      this.data.top = false;
    }
    if (this.data.delaySeconds === undefined) {
      throw new Error("undefined delaySeconds");
    }
    if (this.data.isActiveInMiddle === undefined) {
      this.data.isActiveInMiddle = false;
    }
    if (this.data.isList === undefined) {
      this.data.isList = false;
    }
  }


  hoverEffect() {
    this.start();
  }

  observeInScroll() {
    this.start()
    const observer = new IntersectionObserver(this.onIntersection);
    observer.observe(this.element);
  }

  start() {
    this.verifyData(this.data);
    if (!this.element.classList.contains("hover-effect")) {
        return false;
    }
    this.config(this.element);
    this.createSettingElement(this.element)
    this.decomposeText(this.element);
  }


  createSettingElement(e) {
    const text = e.textContent
    e.textContent = null
    const div = document.createElement('div')
    const span = document.createElement('span')
    div.classList.add("hover-effect-child")
    span.textContent = text
    div.appendChild(span)
    e.appendChild(div)
  }

  config(e) {
    if (this.data.hover) {
      e.classList.add("hover");
    }

    if (this.data.top) {
      e.classList.add("top");
    } else {
      e.classList.add("bottom");
    }
  }

  onIntersection(entries) {
    if (this.data.hover) return false;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (this.data.isActiveInMiddle) {
          this.addMiddleEvent();
        } else {
          this.addActive(this.element);
        }
      } else {
        if (this.data.isActiveInMiddle) {
          this.removeMiddleEvent();
        } else {
          this.removeActive(this.element);
        }
      }
    });
  }

  middleAction() {
    if (this.isInWayToActive(this.element)) {
      this.addActive(this.element);
    } else {
      this.removeActive(this.element);
    }
  }

  addMiddleEvent() {
    window.addEventListener("scroll", this.middleAction);
  }

  removeMiddleEvent() {
    window.removeEventListener("scroll", this.middleAction);
  }

  addActive(e) {
    if (e.classList.contains("active")) {
      return false;
    }
    e.classList.add("active");
  }

  removeActive(e) {
    if (e.classList.contains("active")) {
      e.classList.remove("active");
    }
  }

  isInWayToActive(e) {
    let elementRect = e.getBoundingClientRect();
    let middleOfScreen = window.innerHeight / 2;
    if (this.data.isList) {
      middleOfScreen = window.innerHeight / 3;
    }
    return elementRect.top - elementRect.height < middleOfScreen;
  }

  decomposeText(e) {
    let elementChildren = e.querySelectorAll(".hover-effect-child");
    this.cloneItems(elementChildren);
    elementChildren = e.querySelectorAll(".hover-effect-child");
    this.splitTextByLetters(elementChildren);
  }

  splitTextByLetters(es) {
    console.log(es)
    es.forEach((e) => {
      const letters = e.children[0].textContent.split("");
      e.innerHTML = "";
      letters.forEach((el, k) => {
        if (el === " ") {
          e.innerHTML += " ";
        } else {
          e.innerHTML += `<span class="hover-effect-span" style="transition-delay: ${
            this.data.delaySeconds * k
          }s; transition-duration: ${
            this.data.transitionSeconds
          }s !important;">${el}</span>`;
        }
      });
    });
  }

  cloneItems(es) {
    es.forEach((e) => {
      const clone = e.cloneNode(true);
      e.parentNode.append(clone);
    });
  }
}

//Application

const text = document.querySelector("h1");

const effectOption = {
  hover: true,
  threshold: 1,
  transitionSeconds: 0.3,
  top: true,
  delaySeconds: 0.015,
};

const effect = new Effect(text, effectOption)
effect.hoverEffect()