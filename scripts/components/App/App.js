import { Table } from '../Table/Table.js';

export class App {
  constructor({ element }) {
    this._el = element;
     
    this._render();

    this._initTable();

  } 

  _initTable() {
    this._table = new Table({
      element: document.querySelector('[data-element="table"]')
    })
  }
    
     _render() {
        this._el.innerHTML = `
            <div class="row">
                <div class="col s12">
                    <h1>Tiny Crypto Market</h1>
                </div>
            </div>
            <div class="row">
              <div data-element="table" class="col s12"></div>
            </div>
        `;
    }
}
