const mobileMenuButton = document.getElementById("mobile-menu-btn");
const menu = document.querySelector("header nav");

mobileMenuButton.addEventListener("click", () => {
    if (menu.classList.contains("showing")) {
        menu.style.right = "-300px";
        menu.style.opacity = "0";
    } else {
        menu.style.right = "0";
        menu.style.opacity = "100";
    }
    menu.classList.toggle("showing");
});
