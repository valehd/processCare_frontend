export function generateHeaderHtml(): string {

    return `
    <header class="app-header">

        <div class="header-content">

            <img
                src="/logo.png"
                alt="ProcessCare logo"
                class="header-logo"
            />

            <div>

                <h1>ProcessCare</h1>

                <p class="header-subtitle">
                    Neonatal Healthcare Process Management
                </p>

            </div>

        </div>

        <div class="header-actions">

            <button
                id="btn-register-newborn"
                class="btn">

                + Register Newborn

            </button>

        </div>

    </header>
    `;
}