class Effect {
    constructor() {
      this.element = null;
      this.data = {};
    }
  
    applyHoverEffect(element, { hover = true, transitionSeconds = 0.5, top = false, delaySeconds = 0.025 }) {
      this.element = element;
      this.data = { hover, transitionSeconds, top, delaySeconds };
      this.startHoverEffect();
    }
  
    applyScrollEffect(element, { isActiveInMiddle = false, isList = false, transitionSeconds = 0.5, top = false, delaySeconds = 0.025 }) {
      this.element = element;
      this.data = { isActiveInMiddle, isList, transitionSeconds, top, delaySeconds };
      this.startScrollEffect();
    }
  
    startHoverEffect() {
      this.verifyData();
      if (!this.element.classList.contains("hover-effect")) {
        return;
      }
      this.config(this.element);
      this.createSettingElement(this.element);
      this.decomposeText(this.element);
    }
  
    startScrollEffect() {
      this.verifyData();
      if (!this.element.classList.contains("hover-effect")) {
        return;
      }
      this.config(this.element);
      this.createSettingElement(this.element);
      this.decomposeText(this.element);
  
      const observer = new IntersectionObserver(this.onIntersection.bind(this));
      observer.observe(this.element);
    }
  
    verifyData() {
      if (this.data.transitionSeconds === undefined) {
        throw new Error("undefined transitionSeconds");
      }
      if (this.data.delaySeconds === undefined) {
        throw new Error("undefined delaySeconds");
      }
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
  
    createSettingElement(e) {
      const text = e.textContent;
      e.textContent = null;
      const div = document.createElement('div');
      const span = document.createElement('span');
      div.classList.add("hover-effect-child");
      span.textContent = text;
      div.appendChild(span);
      e.appendChild(div);
    }
  
    onIntersection(entries) {
      if (this.data.hover) return;
  
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
      window.addEventListener("scroll", this.middleAction.bind(this));
    }
  
    removeMiddleEvent() {
      window.removeEventListener("scroll", this.middleAction.bind(this));
    }
  
    addActive(e) {
      if (e.classList.contains("active")) return;
      e.classList.add("active");
    }
  
    removeActive(e) {
      if (e.classList.contains("active")) {
        e.classList.remove("active");
      }
    }
  
    isInWayToActive(e) {
      const elementRect = e.getBoundingClientRect();
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
  
  // Application
  
  const effect = new Effect();
  
  const text1 = document.querySelector("h1");
  const text2 = document.querySelector("h2");
  
  effect.applyHoverEffect(text1, {
    hover: true,
    transitionSeconds: 0.3,
    top: true,
    delaySeconds: 0.015,
  });
  
  effect.applyScrollEffect(text2, {
    isActiveInMiddle: true,
    isList: false,
    transitionSeconds: 0.9,
    top: true,
    delaySeconds: 0.035,
  });
  