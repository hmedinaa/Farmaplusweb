const API_BASE = 'http://localhost:4000/api';
const tbl = document.querySelector('#tblLogs tbody');

// Validar Token
const token = localStorage.getItem('token');
if (!token) {
    alert('Sesión expirada');
    window.location.href = 'login.html';
}

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
};

// Función para mostrar alertas
function showAlert(msg, type = 'info') {
    const alertsDiv = document.getElementById('alerts');
    alertsDiv.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show">
        ${msg} <button class="btn-close" data-bs-dismiss="alert"></button>
    </div>`;
}

// Cargar Logs
async function loadLogs() {
    try {
        const response = await fetch(`${API_BASE}/logs`, { headers });
        const data = await response.json();

        if (!data.ok) throw new Error(data.error || 'Error al cargar historial');

        tbl.innerHTML = ''; // Limpiar tabla

        if (data.logs.length === 0) {
            tbl.innerHTML = '<tr><td colspan="4" class="text-center text-muted">No hay registros aún</td></tr>';
            return;
        }

        data.logs.forEach(log => {
            const tr = document.createElement('tr');
            
            // Formatear fecha bonita
            const fecha = new Date(log.created_at).toLocaleString('es-PE');
            
            // Colores según tipo de acción (Opcional visual)
            let badgeClass = 'bg-secondary';
            if (log.action_type.includes('CREATE') || log.action_type.includes('VENTA')) badgeClass = 'bg-success';
            if (log.action_type.includes('DELETE')) badgeClass = 'bg-danger';
            if (log.action_type.includes('UPDATE')) badgeClass = 'bg-warning text-dark';

            tr.innerHTML = `
                <td><small>${fecha}</small></td>
                <td><strong>${log.user_name || 'Sistema'}</strong></td>
                <td><span class="badge ${badgeClass}">${log.action_type}</span></td>
                <td>${log.details}</td>
            `;
            tbl.appendChild(tr);
        });

    } catch (err) {
        console.error(err);
        showAlert(err.message, 'danger');
    }
}

// Cargar al iniciar
loadLogs();

// Función Logout (necesaria porque la llama el sidebar)
function logout() {
    localStorage.clear();
    location.href = "login.html";
}
