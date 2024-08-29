// public/js/autenticacao.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('auth-form');
    const authSection = document.getElementById('auth-section');
    const adminSection = document.getElementById('admin-section');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const password = document.getElementById('admin-password').value;

        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password })
            });

            const result = await response.json();

            if (result.success) {
                authSection.style.display = 'none';
                adminSection.style.display = 'block';
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    });
});
