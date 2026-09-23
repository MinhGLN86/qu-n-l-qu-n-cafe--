const navItems = document.querySelectorAll('.nav-item');
const views = document.querySelectorAll('.view');
const breadcrumb = document.getElementById('breadcrumb-current');
const viewNames = { overview: 'Tổng quan', orders: 'Đơn hàng', menu: 'Thực đơn', inventory: 'Kho hàng', staff: 'Nhân sự', reports: 'Báo cáo' };

function showView(viewName) {
  navItems.forEach((item) => item.classList.toggle('active', item.dataset.view === viewName));
  views.forEach((view) => view.classList.toggle('active-view', view.id === `view-${viewName}`));
  breadcrumb.textContent = viewNames[viewName];
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navItems.forEach((item) => item.addEventListener('click', () => showView(item.dataset.view)));
document.querySelectorAll('[data-view-link]').forEach((link) => link.addEventListener('click', () => showView(link.dataset.viewLink)));

const toast = document.getElementById('toast');
function createOrder() {
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 3600);
}
document.getElementById('new-order-button').addEventListener('click', createOrder);
document.getElementById('new-order-button-alt').addEventListener('click', createOrder);

const orderRows = [...document.querySelectorAll('#orders-table tbody tr')];
document.querySelectorAll('.filter').forEach((filter) => {
  filter.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach((item) => item.classList.remove('active'));
    filter.classList.add('active');
    const selected = filter.dataset.filter;
    orderRows.forEach((row) => { row.hidden = selected !== 'all' && row.dataset.status !== selected; });
  });
});

document.getElementById('order-search').addEventListener('input', (event) => {
  const query = event.target.value.toLowerCase().trim();
  orderRows.forEach((row) => { row.hidden = !row.textContent.toLowerCase().includes(query); });
});