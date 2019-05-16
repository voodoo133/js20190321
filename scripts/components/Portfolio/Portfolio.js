export class Portfolio {
  constructor({ element, balance }) {
      this._el = element;
      this._portfolioWorth = 0;
      this._balance = balance;
      this._render();

      let elems = document.querySelectorAll('.collapsible');
      M.Collapsible.init(elems);
  }

  _render() {
      this._el.innerHTML = `
            <ul class="collapsible portfolio">
              <li>
                <p class="collapsible-header">
                    Current balance: ${this._balance}.
                    Portfolio Worth: ${this._portfolioWorth}
                </p>
                <div class="collapsible-body">
                  Nothing here yet!
                </div>
              </li>
            </ul>
      `
  }
}
