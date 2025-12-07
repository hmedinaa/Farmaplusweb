document.addEventListener("DOMContentLoaded", () => {

  const API_BASE = 'http://localhost:4000/api';
  const token = localStorage.getItem("token");

  if (!token) {
    alert("No hay token. Inicia sesión.");
    location.href = "login.html";
    return;
  }

  const tbl = document.querySelector('#tblOrders tbody');

  function showAlert(msg, type='info') {
    const a = document.createElement('div');
    a.className = `alert alert-${type} alert-dismissible mt-2`;
    a.innerHTML = msg + '<button class="btn-close" data-bs-dismiss="alert"></button>';
    document.getElementById('alerts').appendChild(a);
    setTimeout(()=>a.remove(),4000);
  }

  async function loadOrders() {
    try {
      const r = await fetch(API_BASE + '/orders', {
        headers: { "Authorization": "Bearer " + token }
      });

      const j = await r.json();
      if (!j.ok) return showAlert(j.error, 'danger');

      tbl.innerHTML = '';

      j.orders.forEach(o => {
        const productNames = o.items && o.items.length > 0
          ? o.items.map(item => `${item.quantity}x ${item.item_name}`).join(', ')
          : '-';

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${o.id}</td>
          <td>${o.client_name || 'Cliente no registrado'}</td>
          <td>${productNames}</td>
          <td>S/ ${parseFloat(o.total).toFixed(2)}</td>
          <td>${o.status}</td>
          <td>${new Date(o.created_at).toLocaleString()}</td>
          <td>
            <button class="btn btn-sm btn-primary btn-view" data-id="${o.id}">Ver</button>
            <button class="btn btn-sm btn-danger btn-del" data-id="${o.id}">Anular</button>
          </td>`;
        tbl.appendChild(tr);
      });

    } catch (err) { showAlert(err.message,'danger'); }
  }

  loadOrders();
});

function logout() {
  localStorage.clear();
  location.href = "login.html";
}
