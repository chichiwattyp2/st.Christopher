class PageHeader extends HTMLElement {
  constructor() {
    super();

    const template = `
            <style>

                a {
                    display: grid;
                    grid-template-columns: auto auto;
                    justify-content: left;
                    align-content: center;
                    text-decoration: none;
                    height: 5em;
                    width: 12.5em;
                    padding-left: 1.875em;

                }

                img {
                    height: 2em;
                    padding: 0;
                    margin: 0;
                }

                p {
                    font-family: ClobberGroteskW01-Medium;
                    font-style: normal;
                    font-weight: bold;
                    line-height: 1.625em;
                    padding-left: 0.625em;
                    margin-left: 1em;
                    font-size: 1.25em;
                    color: black;
                }

                 .lead {
      font-family: ClobberGroteskW01-Medium;
      font-style: normal;
      font-weight: bold;
      font-size: 1.75em;
      line-height: 140%;
    }

    .buttons > button,
    .buttons > a {
        margin-left: 3.125em;
        cursor: pointer;
    }

    
    .primary-button,
    .passive-button {
      display: inline-block;
      font-family: ClobberGroteskW01-Medium;
      font-style: normal;
      font-weight: 600;
      font-size: 1em;
      line-height: 1.25em;
      height: 3.5em;
      border: none;
      border: 1.5px solid black;
      box-sizing: border-box;
      box-shadow: 10px 10px 0px black;
      border-radius: 10px;
      padding: 1em 1.25em;
      margin: 1.875em 0;
      text-decoration: none;
      color: black;
    }

    .primary-button:active,
    .passive-button:active {
      box-shadow: 5px 5px 0px #000000;
      transform: translateY(4px);
    }

    .primary-button {
      background: var(--primary-color);
    }

    .primary-button:hover {
      background: var(--primary-color-dark);
    }

    .passive-button {
      background: var(--passive-color);
    }

    .passive-button:hover {
      background: var(--passive-color-dark);
    }

    .buttons > .publish-disabled {
        cursor: default;
        opacity: 0.4;
    }
  </style>
            

           
<div class="buttons">
      <a href="/public/social.html" id="social" class="primary-button">Social
        </a>
   
 <a href="/public/index.html" id="explore" class="primary-button">Explore
        </a>
      

</div>
        `;

    let shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = template;
  }

  connectedCallback() {
    this.classList.add("page-header");
    this.shadowRoot.querySelector(".logo-img").src = `${this.getAttribute(
      "assetsUrl"
    )}/img/logo.png`;
  }
}

customElements.define("page-header", PageHeader);
