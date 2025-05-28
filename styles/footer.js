class MyFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `    
            <footer>
                <div class="inner-footer">
                    <p>
                        &copy 2025 <b>M.E. Medhat</b>. All rights reserved.
                        <br>
                        Powered by <a href="https://jekyllrb.com/"><b>Jekyll</b> on <a href="https://github.com/"><b>Github</b </a>.
                    </p>
                    <div class="social-links"></div>
                </div>
            </footer>
    `
    }
}
customElements.define('my-footer',MyFooter)