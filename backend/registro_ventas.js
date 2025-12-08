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
// === AUTOCOMPLETE CLIENTES ===
const clientSearch = document.getElementById('clientSearch');
const clientResults = document.getElementById('clientResults');
const orderClient = document.getElementById('orderClient');

clientSearch.addEventListener('input', async () => {
  const q = clientSearch.value.trim();

  if (q.length < 2) {
    clientResults.classList.add("d-none");
    return;
  }

  const r = await fetch(API_BASE + '/clients?search=' + q, {
    headers: { "Authorization": "Bearer " + token }
  });
  const j = await r.json();

  clientResults.innerHTML = '';
  clientResults.classList.remove("d-none");

  j.clients.forEach(c => {
    const div = document.createElement('div');
    div.className = 'autocomplete-item';
    div.textContent = c.name + " — DNI: " + c.dni;
    div.addEventListener('click', () => {
      clientSearch.value = c.name;
      orderClient.value = c.id;
      clientResults.classList.add("d-none");
    });
    clientResults.appendChild(div);
  });
});

// === PRODUCTOS ===
function addOrderItemRow() {
  const container = document.createElement('div');
  container.className = 'mb-3 autocomplete-box';

  container.innerHTML = `
    <input class="form-control prodSearch" placeholder="Buscar producto..." autocomplete="off">
    <div class="autocomplete-results prodResults d-none"></div>
    <input type="hidden" class="item-id">
    <input class="form-control item-qty mt-2" type="number" value="1" min="1" style="max-width:130px">
    <button type="button" class="btn btn-danger btn-sm mt-2 btn-remove">Eliminar</button>
  `;

  document.getElementById('orderItems').appendChild(container);

  const search = container.querySelector('.prodSearch');
  const results = container.querySelector('.prodResults');
  const idInput = container.querySelector('.item-id');

  search.addEventListener('input', async () => {
    const q = search.value.trim();
    if (q.length < 2) {
      results.classList.add("d-none");
      return;
    }

    const r = await fetch(API_BASE + '/inventory?search=' + q, {
      headers: { "Authorization": "Bearer " + token }
    });
    const j = await r.json();

    results.innerHTML = '';
    results.classList.remove("d-none");

    j.inventory.forEach(p => {
      const div = document.createElement('div');
      div.className = 'autocomplete-item';
      div.textContent = `${p.name} — Stock: ${p.stock} — S/ ${p.price}`;
      div.addEventListener('click', () => {
        search.value = p.name;
        idInput.value = p.id;
        results.classList.add("d-none");
      });
      results.appendChild(div);
    });
  });

  container.querySelector('.btn-remove')
    .addEventListener('click', () => container.remove());
}

document.getElementById('addItemBtn').addEventListener('click', addOrderItemRow);
