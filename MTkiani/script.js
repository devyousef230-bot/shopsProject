// منوی موبایل
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

// با انتخاب لینک، منوی موبایل بسته شود
mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// فیلتر و جست‌وجوی دوره‌ها
const filterButtons = document.querySelectorAll('.filter-btn');
const courseCards = document.querySelectorAll('.course-card');
const courseSearch = document.getElementById('courseSearch');
const emptyState = document.getElementById('emptyState');

let activeCategory = 'all';

function updateCourses() {
  const searchTerm = courseSearch.value.trim().toLowerCase();
  let visibleCount = 0;

  courseCards.forEach((card) => {
    const matchesCategory =
      activeCategory === 'all' || card.dataset.category === activeCategory;
    const matchesSearch = card.dataset.title.toLowerCase().includes(searchTerm);
    const shouldShow = matchesCategory && matchesSearch;

    card.hidden = !shouldShow;
    if (shouldShow) visibleCount++;
  });

  emptyState.hidden = visibleCount !== 0;
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    activeCategory = button.dataset.filter;
    updateCourses();
  });
});

courseSearch.addEventListener('input', updateCourses);

// کلیک روی دسته‌بندی‌های ابتدای صفحه، فیلتر دوره‌ها را تنظیم می‌کند
document.querySelectorAll('[data-category-link]').forEach((link) => {
  link.addEventListener('click', () => {
    const category = link.dataset.categoryLink;
    const targetButton = document.querySelector(
      `.filter-btn[data-filter="${category}"]`
    );

    if (targetButton) targetButton.click();
  });
});
