const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");
if (menuButton && navigation) {
  menuButton.hidden = false;
  document.documentElement.classList.add("js");
  const closeMenu = (restoreFocus = false) => {
    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
    if (restoreFocus) menuButton.focus();
  };
  menuButton.addEventListener("click", () => {
    const opening = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(opening));
    navigation.classList.toggle("is-open", opening);
  });
  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menuButton.getAttribute("aria-expanded") === "true"
    )
      closeMenu(true);
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".site-header")) closeMenu();
  });
  matchMedia("(min-width: 761px)").addEventListener("change", () =>
    closeMenu(),
  );
}

const filterBar = document.querySelector("[data-filters]");
if (filterBar) {
  filterBar.hidden = false;
  const cards = [...document.querySelectorAll("[data-category]")];
  const filterButtons = [...filterBar.querySelectorAll("[data-filter]")];
  const applyFilter = (filter) => {
    filterButtons.forEach((button) => {
      const selected = button.dataset.filter === filter;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    let visible = 0;
    cards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
      if (!card.hidden) visible++;
    });
    document.querySelector("[data-filter-status]").textContent =
      `Showing ${visible} ${filter === "all" ? "" : filter + " "}project entries.`;
  };
  filterButtons.forEach((button) =>
    button.addEventListener("click", () => applyFilter(button.dataset.filter)),
  );
  // Keep project deep links reachable after a filter hides their target.
  const revealHashTarget = () => {
    const target = document.getElementById(location.hash.slice(1));
    if (target?.matches("[data-category]") && target.hidden) {
      applyFilter("all");
      target.scrollIntoView({ block: "start" });
    }
  };
  window.addEventListener("hashchange", revealHashTarget);
  revealHashTarget();
}

const migration = document.querySelector("[data-migration-demo]");
if (migration) {
  const button = migration.querySelector("[data-migration-button]");
  const status = migration.querySelector("[data-migration-status]");
  const hostLabel = migration.querySelector("[data-host-label]");
  const successorLabel = migration.querySelector("[data-successor-label]");
  button.hidden = false;
  let step = 0;
  const states = [
    [
      "Clients mirror the host’s replicated state.",
      "Simulate host disconnect ↗",
      "HOST",
      "SUCCESSOR",
    ],
    [
      "Host A disconnected. B is the pre-agreed successor.",
      "Restore on successor ↗",
      "OFFLINE",
      "TAKING OVER",
    ],
    [
      "B restores the cached state. C reconnects to the new host.",
      "Reset demonstration ↺",
      "OFFLINE",
      "NEW HOST",
    ],
  ];
  button.addEventListener("click", () => {
    step = (step + 1) % states.length;
    migration.dataset.step = String(step);
    [
      status.textContent,
      button.textContent,
      hostLabel.textContent,
      successorLabel.textContent,
    ] = states[step];
  });
}
