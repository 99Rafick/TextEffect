
class TextEffect {

  constructor() {
    this.element = null;
    this.data = {};
  }

  setEffectConfiguation() {
      this.checkParams();
      if(!this.element.classList.contains('hover-effect')) return;
      this.setEffectDirection(this.element);
      this.setInnerElement(this.element);
      this.decomposeText(this.element);
  }
  
  inHover(element, { hover = true, transitionSeconds = 0.5, top = false, delaySeconds = 0.025 }) {
    this.element = element;
    this.data = { hover, transitionSeconds, top, delaySeconds };
    this.setEffectConfiguation();
  }

  inScroll(element, { isActiveInMiddle = false, isList = false, transitionSeconds = 0.5, top = false, delaySeconds = 0.025 }) {
    this.element = element;
    this.data = { isActiveInMiddle, isList, transitionSeconds, top, delaySeconds };
    this.effectOnScroll();
  }

  effectOnScroll() {
    this.setEffectConfiguation();
    const observer = new IntersectionObserver(this.setActionOnIntersection.bind(this));
    observer.observe(this.element);
  }

  checkParams() {
    if (this.data.transitionSeconds === undefined) {
      throw new Error("undefined transitionSeconds");
    }
    if (this.data.delaySeconds === undefined) {
      throw new Error("undefined delaySeconds");
    }
  }

  setEffectDirection(e) {
      e.classList.toggle("hover", this.data.hover);
      e.classList.add(this.data.top ? "top" : "bottom");
  }
  
  setInnerElement(e) {
      const span = document.createElement('span');
      span.textContent = e.textContent;
      
      const div = document.createElement('div');
      div.classList.add("hover-effect-child");
      div.appendChild(span);
  
      e.textContent = '';
      e.appendChild(div);
  }
  
  setActionOnIntersection(entries) {
      if (this.data.hover) return;
  
      entries.forEach(({ isIntersecting }) => {
          const method = isIntersecting 
              ? (this.data.isActiveInMiddle ? 'addMiddleEvent' : 'addActive')
              : (this.data.isActiveInMiddle ? 'removeMiddleEvent' : 'removeActive');
  
          this[method](this.element);
      });
  }
  
  actionOnMiddle() {
      this[this.canActiveElementInSroll(this.element) ? 'addActive' : 'removeActive'](this.element);
  }
  
  addMiddleEvent() {
    window.addEventListener("scroll", this.actionOnMiddle.bind(this));
  }

  removeMiddleEvent() {
    window.removeEventListener("scroll", this.actionOnMiddle.bind(this));
  }

  toggleActive(e) {
      e.classList.toggle("active");
  }
  

  addActive(e) {
    if (!e.classList.contains("active")) e.classList.add("active");
  }

  removeActive(e) {
      if (e.classList.contains("active")) e.classList.remove("active");
  }

  canActiveElementInSroll(e) {
      const { top, height } = e.getBoundingClientRect();
      const middleOfScreen = window.innerHeight / (this.data.isList ? 3 : 2);
      return top - height < middleOfScreen;
  }
  

  decomposeText(element) {
      let children = element.querySelectorAll(".hover-effect-child");
      this.clone(children);
      this.splitElementsText(element.querySelectorAll(".hover-effect-child"));
  }
  

  splitElementsText(elements) {
      elements.forEach((element) => {
          const letters = element.children[0].textContent.split("");
          element.innerHTML = letters.map((char, index) => {
              if (char === " ") return " ";
              return `<span class="hover-effect-span" style="transition-delay:${this.data.delaySeconds * index}s;transition-duration:${this.data.transitionSeconds}s;">${char}</span>`;
          }).join("");
      });
  }
  
  clone(elements) {
      elements.forEach(element => {
          element.parentNode.append(element.cloneNode(true));
      });
  }

}



// Application

const effect = new TextEffect();

const text1 = document.querySelector("h1");
const text2 = document.querySelector("h2");

effect.inHover(text1, {
    hover: true,
    transitionSeconds: 0.3,
    top: true,
    delaySeconds: 0.015,
});

effect.inScroll(text2, {
    isActiveInMiddle: false,
    isList: false,
    transitionSeconds: 0.5,
    top: true,
    delaySeconds: 0.035,
});