import BaseComponent from '../BaseComponent/BaseComponent.js';

export class Search extends BaseComponent {
  constructor({ element, onInput }) {
    super();
    
    this._el = element;
    this._onInputCallback = onInput;

    this._render();
    
    this._el.addEventListener('input', e => {
      var t = e.target;
      
      if (t.matches('#search')) {
        this._onInputCallback(t.value);
      }
    });
  }
  
  _render () {
    this._el.innerHTML = `
      <input type="text" id="search"/>
    `;
  }
}